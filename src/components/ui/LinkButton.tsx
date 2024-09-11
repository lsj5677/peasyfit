type Tbutton = {
  text: string;
};

export default function LinkButton({ text }: Tbutton) {
  return (
    <div className={`btn bg-mainPurple hover:bg-subPurple text-lg text-white`}>
      {text}
    </div>
  );
}
