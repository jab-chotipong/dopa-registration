"use client";
import { FaUserCircle } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { userAPI } from "../_lib/apis/user";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

type HeaderProps = {
  isAdmin?: boolean;
  setMenuOpen?: () => void;
};

const Header = ({ ...props }: HeaderProps) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  const { setMenuOpen } = props;
  const [name, setName] = useState<string | null>(null);

  const getUser = async () => {
    let res = await userAPI.getMe(token!);
    const { firstNameTh, lastNameTh } = res.data.data;
    if (firstNameTh && lastNameTh) setName(firstNameTh + " " + lastNameTh);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="w-full z-10 bg-slate-100 h-[7vh] flex items-center justify-center sticky top-0">
      <div className="flex justify-between items-center max-w-7xl w-full h-full px-6 py-1">
        <div
          className={`${
            !props.isAdmin ? "hidden md:flex" : "flex"
          }  gap-4 items-center justify-center`}
        >
          <img src="/dopa-icon.png" className="w-12 h-12" alt="DOPA Icon" />
          <p className="text-primary text-xl">กรมการปกครอง</p>
        </div>
        {!props.isAdmin && (
          <div className="md:hidden">
            <RxHamburgerMenu className="h-8 w-8" onClick={setMenuOpen} />
          </div>
        )}
        <div className="flex justify-center items-center gap-4">
          <FaUserCircle className="w-6 h-6" />
          {name != null && <p>{name}</p>}
        </div>
      </div>
    </div>
  );
};

export default Header;
