"use client";

import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoCreate, IoCreateOutline } from "react-icons/io5";
import Logo from "./ui/Logo";
import LinkButton from "./ui/LinkButton";
import ActionButton from "./ui/ActionButton";

export default function Nav() {
  const pathName = usePathname();
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div className={`flex items-center justify-between bg-subOrange p-4`}>
      <Link href="/" aria-label="Home">
        <Logo />
      </Link>
      <nav>
        <ul className="flex items-center gap-5">
          <li className="text-4xl">
            <Link href={"/list"} aria-label="List Form">
              {pathName === "/list" ? <IoCreate /> : <IoCreateOutline />}
            </Link>
          </li>
          {session && user ? (
            <li>
              <Link href={`/user/${user.id}`}>
                <LinkButton text="My Page" />
              </Link>
            </li>
          ) : (
            <ActionButton
              text="Sign In"
              onClick={() => {
                signIn();
              }}
            />
          )}
        </ul>
      </nav>
    </div>
  );
}
