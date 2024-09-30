"use client";
import Header from "@/app/_components/Header";
import UserSideNav from "@/app/_components/side-nav/UserSideNav";
import { useEffect, useState } from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [render, setRender] = useState<boolean>(false);

  useEffect(() => {
    setRender(true);
  }, []);

  return (
    <div className="bg-gray-200 flex max-w-7xl w-full h-screen flex-col items-center overflow-auto">
      <Header />
      <div className="flex justify-center max-w-7xl w-full">
        <UserSideNav />
        <div className="p-6 w-full">{children}</div>
      </div>
    </div>
  );
}
