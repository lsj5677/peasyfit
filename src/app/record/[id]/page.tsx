import RecordForm from "@/components/form/RecordForm";

type Props = {
  params: { id: string };
};

export default async function RecordPage({ params: { id } }: Props) {
  return <RecordForm recordId={id} />;
}
