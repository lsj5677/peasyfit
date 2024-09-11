type Tbutton = {
  text: string;
  className?: string;
};

export default function LinkButton({ text, className }: Tbutton) {
  return (
    <div
      className={`btn bg-mainPurple hover:bg-subPurple h-[2.8rem] min-h-[2.8rem] py-1 text-white ${className}`}
    >
      {text}
    </div>
  );
}
