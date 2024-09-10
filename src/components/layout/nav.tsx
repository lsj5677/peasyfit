import { montserrat } from "@/styles/fonts";
import Link from "next/link";
import { FaRegUserCircle, FaUserCircle } from "react-icons/fa";
import { IoMdAddCircle, IoMdAddCircleOutline } from "react-icons/io";

const menuItem = [
  {
    href: "/",
    icon: <IoMdAddCircleOutline />,
    clickedIcon: <IoMdAddCircle />,
    title: "Record",
  },
  {
    href: "/",
    icon: <FaRegUserCircle />,
    clickedIcon: <FaUserCircle />,
    title: "My page",
  },
];

export default function Nav() {
  return (
    <div>
      <Link href="/" aria-label="Home">
        <h1 className={`text-2xl font-extralight ${montserrat.className}`}>
          <span className="font-semibold">PE</span>asy
          <span className="font-semibold">Fit</span>
        </h1>
      </Link>
    </div>
  );
}
