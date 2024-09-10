"use client";

import { montserrat } from "@/styles/fonts";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoCreate, IoCreateOutline } from "react-icons/io5";
import { RiUser5Line, RiUser5Fill } from "react-icons/ri";
import Logo from "../ui/Logo";

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
  const { data: session } = useSession();

  return (
    <div className="bg-subOrange flex items-center justify-between p-4">
      <Link href="/" aria-label="Home">
        <Logo />
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
          {/* href 에서 조건 처리해주기 (session 없으면 login page로) */}
          {/* test */}
          {session ? (
            <button
              onClick={() => {
                signOut();
              }}
            >
              Sign out
            </button>
          ) : (
            <button
              onClick={() => {
                signIn();
              }}
            >
              Sign in
            </button>
          )}
        </ul>
      </nav>
    </div>
  );
}
