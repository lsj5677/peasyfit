"use client";

import { montserrat } from "@/styles/fonts";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoCreate, IoCreateOutline } from "react-icons/io5";
import { RiUser5Line, RiUser5Fill } from "react-icons/ri";

type TMenuItems = {
  href: string;
  icon: React.ReactNode;
  clickedIcon?: React.ReactNode;
  title: string;
};

const menuItems = [
  {
    href: "/record",
    icon: <IoCreateOutline />,
    clickedIcon: <IoCreate />,
    title: "Record",
  },
  {
    href: "/user",
    icon: <RiUser5Line />,
    clickedIcon: <RiUser5Fill />,
    title: "My page",
  },
];

export default function Nav() {
  const pathName = usePathname();

  return (
    <div className="flex items-center justify-between bg-blue-200 p-4">
      <Link href="/" aria-label="Home">
        <h1 className={`text-2xl font-extralight ${montserrat.className}`}>
          <span className="font-semibold">PE</span>asy
          <span className="font-semibold">Fit</span>
        </h1>
      </Link>
      <nav>
        <ul className="flex items-center gap-5">
          {menuItems.map(({ href, icon, clickedIcon, title }: TMenuItems) => (
            <li key={href} className="text-4xl">
              <Link href={href} aria-label={title}>
                {pathName === href ? clickedIcon : icon}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
