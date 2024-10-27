"use client";
import Header from "@/app/_components/Header";
import UserSideNav, {
  MobileUserNav,
} from "@/app/_components/side-nav/UserSideNav";
import { useEffect, useState } from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <div className="bg-gray-200 flex max-w-7xl w-full h-full flex-col items-center">
      <Header setMenuOpen={() => setIsMenuOpen(!isMenuOpen)} />
      <div className="flex justify-center max-w-7xl w-full">
        <UserSideNav />
        <MobileUserNav isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
        <div className="md:p-6 w-full">{children}</div>
      </div>
    </div>
  );
}
