import { montserrat } from "@/styles/fonts";

type TLogo = {
  size?: "md" | "lg" | "xl";
  className?: string;
};
export default function Logo({ size = "lg", className }: TLogo) {
  return (
    <h1
      className={`text-subPurple ${
        size === "xl"
          ? "text-4xl"
          : size === "lg"
            ? "text-2xl"
            : size === "md"
              ? "text-lg"
              : "text-md"
      } font-light ${montserrat.className} ${className}`}
    >
      <span className="text-mainPurple font-bold">PE</span>asy
      <span className="text-mainPurple font-bold">Fit</span>
    </h1>
  );
}
