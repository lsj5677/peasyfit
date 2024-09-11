import { readFile } from "fs/promises";
import path from "path";

export type TList = {
  name: string;
  description: string;
};

export const getAllExamList = async () => {
  const filePath = path.join(process.cwd(), "data/examList", "examList.json");
  return readFile(filePath, "utf-8")
    .then<TList[]>(JSON.parse)
    .then((list) => list.sort());
};
