import List from "@/components/examList/List";
import { getAllExamList } from "../service/list";

export default async function ListPage() {
  const list = await getAllExamList();

  return <List list={list} />;
}
