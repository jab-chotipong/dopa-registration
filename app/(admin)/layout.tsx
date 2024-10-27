"use client";
import Header from "@/app/_components/Header";
import { useEffect, useState } from "react";
import AdminSideNav from "../_components/side-nav/AdminSideNav";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-gray-200 flex max-w-7xl w-full h-full flex-col items-center">
      <Header isAdmin={true} />
      <div className="flex justify-center max-w-7xl w-full">
        <AdminSideNav />
        <div className="p-6 w-full">{children}</div>
      </div>
    </div>
  );
}
