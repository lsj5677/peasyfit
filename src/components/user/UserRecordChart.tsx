"use client";

import { useMemo } from "react";
import { TUserRecordAll } from "./UserRecordGrid";
import { parseDate } from "@/utils/parseDate";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
  Filler,
} from "chart.js";

// plugin 등록
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
  Legend,
  Tooltip,
);

type TUserRecordChart = {
  filteredRecords: TUserRecordAll[];
};

export default function UserRecordChart({ filteredRecords }: TUserRecordChart) {
  const groupedRecordsByKey = useMemo(() => {
    return filteredRecords.reduce(
      (acc, { records: data }) => {
        data.forEach(({ record, createdAt }) => {
          Object.entries(record).forEach(([key, value]) => {
            if (!acc[key]) {
              acc[key] = [];
            }
            // 동일한 key에 대해 value와 createdAt 저장
            acc[key].push({ value, createdAt: createdAt || "알 수 없는 날짜" });
          });
        });
        return acc;
      },
      {} as Record<string, { value: string | number; createdAt: string }[]>,
    );
  }, [filteredRecords]);

  const chartsData = useMemo(() => {
    return Object.entries(groupedRecordsByKey).map(([key, values]) => {
      const labels = values.map(({ createdAt }) => parseDate(createdAt)); // 날짜 레이블
      const data = values.map(({ value }) => value); // 값 데이터

      return {
        key, // 종목 이름
        labels, // 각 차트의 레이블 (날짜)
        data, // 각 차트의 데이터 (기록 값)
      };
    });
  }, [groupedRecordsByKey]);

  return (
    <section>
      {chartsData.map(({ key, labels, data }) => (
        <div key={key} className="my-10">
          <h3 className="text-lg font-semibold">{key} 기록 변화</h3>
          <Line
            data={{
              labels, // x축: 날짜
              datasets: [
                {
                  label: key, // 차트 이름 (종목 이름)
                  data, // y축: 기록 값
                  borderColor: "rgba(75, 192, 192, 1)", // 라인 색상
                  backgroundColor: "rgba(75, 192, 192, 0.2)", // 라인 배경 색상
                  fill: false, // 배경을 채울지 여부
                  tension: 0.4, // 곡선의 부드러움
                },
              ],
            }}
            options={{
              responsive: true,
              scales: {
                y: {
                  beginAtZero: true, // y축 값이 0부터 시작
                },
              },
            }}
          />
        </div>
      ))}
    </section>
  );
}
