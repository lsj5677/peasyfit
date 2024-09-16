import { getAllExamList } from "../service/list";
import ListForm from "@/components/examList/ListForm";

export default async function ListPage() {
  const list = await getAllExamList();

  return <ListForm list={list} />;
}
