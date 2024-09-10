import { Montserrat, Nanum_Gothic, Open_Sans } from "next/font/google";

const open_sans = Open_Sans({ subsets: ["latin"] });
const nanum_gothic = Nanum_Gothic({
  weight: ["400", "700", "800"],
  style: ["normal"],
  subsets: ["latin"],
});
const montserrat = Montserrat({
  weight: ["200", "400", "600"],
  subsets: ["latin"],
});

export { open_sans, nanum_gothic, montserrat };
