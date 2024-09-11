type Tbutton = {
  text: string;
  onClick: () => void;
  wide?: boolean;
  disabled?: boolean;
};

export default function ActionButton({
  text,
  onClick,
  wide = false,
  disabled = false,
}: Tbutton) {
  return (
    <button
      className={`btn btn-${wide && "wide"} bg-mainPurple text-white ${disabled && "opacity-80"} hover:bg-subPurple text-lg`}
      onClick={() => onClick()}
    >
      {text}
    </button>
  );
}
