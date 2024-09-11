import { Montserrat, Nanum_Gothic, Open_Sans } from "next/font/google";

const open_sans = Open_Sans({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
});
const nanum_gothic = Nanum_Gothic({
  weight: ["400", "700", "800"],
  style: ["normal"],
  subsets: ["latin"],
});
const montserrat = Montserrat({
  weight: ["200", "300", "400", "600", "700", "900"],
  subsets: ["latin"],
});

export { open_sans, nanum_gothic, montserrat };
