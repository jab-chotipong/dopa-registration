import React from "react";
import { FiUser } from "react-icons/fi";
import { FiFilePlus } from "react-icons/fi";
import { IoPaperPlaneOutline } from "react-icons/io5";
import NavList from "./NavList";
import { PiSignOut } from "react-icons/pi";
import { usePathname } from "next/navigation";

const userNavLists = [
  {
    text: "ข้อมูลส่วนตัว",
    icon: <FiUser />,
    link: { href: "/user/detail" },
  },
  {
    text: "คำร้องขอมีบัตร",
    icon: <FiFilePlus />,
    link: { href: "/user/form/request" },
  },
  {
    text: "ตรวจสอบสถานะ",
    icon: <IoPaperPlaneOutline />,
    link: { href: "/user/status" },
  },
];

const UserSideNav = () => {
  const pathname = usePathname();

  return (
    <div
      className={`h-[94vh] p-2 hidden bg-white md:flex md:w-56 flex-col justify-between sticky top-[6vh]`}
    >
      <div>
        {userNavLists.map((list, i) => (
          <NavList key={i} link={list.link} icon={list.icon} text={list.text} />
        ))}
      </div>
      <NavList
        link={{ href: "/login" }}
        icon={<PiSignOut />}
        text="ออกจากระบบ"
      />
    </div>
  );
};

export const MobileUserNav = ({ ...props }) => {
  const { isOpen, setIsOpen } = props;
  return (
    <div
      className={`${
        isOpen ? "block" : "hidden"
      } w-screen h-screen z-10 bg-black bg-opacity-30 fixed top-0 left-0`}
      onClick={(e) => {
        setIsOpen(false);
      }}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="w-52 fixed z-20 left-0 top-0 bg-white h-screen py-4 px-2 flex flex-col gap-4"
      >
        <div className="flex gap-2 items-center justify-start">
          <img src="/dopa-icon.png" className="w-8 h-8" alt="DOPA Icon" />
          <p className="text-primary text-lg">กรมการปกครอง</p>
        </div>
        <div className="flex flex-col justify-between h-full">
          <div onClick={() => setIsOpen(false)}>
            {userNavLists.map((list, i) => (
              <NavList
                key={i}
                link={list.link}
                icon={list.icon}
                text={list.text}
              />
            ))}
          </div>
          <NavList
            link={{ href: "/login" }}
            icon={<PiSignOut />}
            text="ออกจากระบบ"
          />
        </div>
      </div>
    </div>
  );
};

export default UserSideNav;
