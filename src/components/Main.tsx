"use client";

import Logo from "./ui/Logo";
import ActionButton from "./ui/ActionButton";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import LinkButton from "./ui/LinkButton";
import introImage from "../../public/images/intro-bg.jpg";

export default function Main() {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <>
      <div className="w-full rotate-180">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#FDBF60"
            fillOpacity="1"
            d="M0,256L18.5,224C36.9,192,74,128,111,96C147.7,64,185,64,222,64C258.5,64,295,64,332,85.3C369.2,107,406,149,443,144C480,139,517,85,554,106.7C590.8,128,628,224,665,250.7C701.5,277,738,235,775,197.3C812.3,160,849,128,886,112C923.1,96,960,96,997,106.7C1033.8,117,1071,139,1108,122.7C1144.6,107,1182,53,1218,26.7C1255.4,0,1292,0,1329,26.7C1366.2,53,1403,107,1422,133.3L1440,160L1440,320L1421.5,320C1403.1,320,1366,320,1329,320C1292.3,320,1255,320,1218,320C1181.5,320,1145,320,1108,320C1070.8,320,1034,320,997,320C960,320,923,320,886,320C849.2,320,812,320,775,320C738.5,320,702,320,665,320C627.7,320,591,320,554,320C516.9,320,480,320,443,320C406.2,320,369,320,332,320C295.4,320,258,320,222,320C184.6,320,148,320,111,320C73.8,320,37,320,18,320L0,320Z"
          ></path>
        </svg>
      </div>
      <div className={`sub-wrap text-center text-2xl tracking-tight`}>
        <div className="leading-6">
          <p className="text-xl">
            혼자서 <span className="font-bold">체대 입시</span> 준비하기
          </p>
          <div className="my-1 flex items-end justify-center gap-2 md:mb-2">
            <Logo size="xl" /> <span>과 함께</span>
          </div>
          <p className="inline-block bg-subYellow text-3xl">
            <span className="font-bold">기록 관리</span>를 손쉽게!
          </p>
        </div>
        <div className="relative">
          <Image
            src={introImage}
            alt="intro background"
            width={500}
            className="mx-auto h-auto w-full max-w-[600px]"
          />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs text-neutral-400">
            Designed by freepik
          </span>
        </div>
        <div>
          {session && user ? (
            <Link href={`/user/${user.id}`}>
              <LinkButton
                text="오늘도 목표를 향해 기록하기"
                className="text-lg md:min-h-[3.5rem] md:px-8"
              />
            </Link>
          ) : (
            <ActionButton
              text="PEasyFit 사용해보기"
              onClick={() => signIn()}
              className="text-lg md:min-h-[3.5rem] md:px-8"
              wide
            />
          )}
        </div>
      </div>
    </>
  );
}
