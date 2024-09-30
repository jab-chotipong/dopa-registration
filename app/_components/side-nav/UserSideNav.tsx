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
    link: { href: "/user/form" },
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
    <div className="h-[94vh] p-2 bg-white w-56 flex flex-col justify-between sticky top-[6vh]">
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

export default UserSideNav;
