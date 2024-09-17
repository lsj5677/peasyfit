import ListForm from "@/components/form/ListForm";
import { getAllExamList } from "../service/list";

export default async function ListPage() {
  const list = await getAllExamList();

  return <ListForm list={list} />;
}
