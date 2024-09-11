type Tbutton = {
  text: string;
  onClick: () => void;
  wide?: boolean;
  disabled?: boolean;
  className?: string;
};

export default function ActionButton({
  text,
  onClick,
  wide = false,
  disabled = false,
  className,
}: Tbutton) {
  return (
    <button
      className={`btn btn-${wide && "wide"} bg-mainPurple h-[2.8rem] min-h-[2.8rem] text-white ${disabled && "opacity-80"} hover:bg-subPurple ${className}`}
      onClick={() => onClick()}
    >
      {text}
    </button>
  );
}
