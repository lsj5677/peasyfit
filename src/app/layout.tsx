import type { Metadata } from "next";
import "./globals.css";
import { open_sans } from "@/styles/fonts";
import AuthContext from "@/context/AuthContext";
import SWRConfigContext from "@/context/SWRConfigContext";
import Nav from "@/components/layout/Nav";

export const metadata: Metadata = {
  title: "PEasyFit",
  description: "PEasyFit, 체대 입시생을 위한 스마트한 기록 관리 도구 ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`mx-auto w-full max-w-screen-md overflow-auto ${open_sans.className}`}
        suppressHydrationWarning={true}
      >
        <AuthContext>
          <header className="sticky top-0 z-10">
            <Nav />
          </header>
          <main className="min-h-[calc(100vh-77px)]">
            <SWRConfigContext>{children}</SWRConfigContext>
          </main>
        </AuthContext>
      </body>
    </html>
  );
}
