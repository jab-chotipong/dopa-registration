import React from "react";
import NavList from "./NavList";
import { PiSignOut } from "react-icons/pi";
import { LuDot, LuUserCheck } from "react-icons/lu";
import { FaRegEnvelope } from "react-icons/fa";
import { IoDocumentTextOutline } from "react-icons/io5";
import { usePathname } from "next/navigation";

const lists = [
  {
    main: "คำร้องขอมีบัตร",
    icon: <FaRegEnvelope />,
    sub: [
      {
        text: "คำร้องใหม่",
        link: {
          href: "/admin/form-request",
          query: { status: "submit", search: "", page: "1" },
        },
        type: "form-request",
      },
      {
        text: "คำร้องแก้ไข",
        link: {
          href: "/admin/form-request",
          query: { status: "re-submit", search: "", page: "1" },
        },
        type: "form-request",
      },
      {
        text: "คำร้องขออนุมัติจัดส่ง",
        link: {
          href: "/admin/form-request",
          query: { status: "waiting-print", search: "", page: "1" },
        },
        type: "form-request",
      },
      {
        text: "คำร้องจัดส่งแล้ว",
        link: {
          href: "/admin/form-request",
          query: { status: "deliveried", search: "", page: "1" },
        },
        type: "form-request",
      },
      {
        text: "คำร้องที่ไม่อนุมัติ",
        link: {
          href: "/admin/form-request",
          query: { status: "reject", search: "", page: "1" },
        },
        type: "form-request",
      },
      {
        text: "คำร้องหมดอายุ",
        link: {
          href: "/admin/form-request",
          query: { status: "expired", search: "", page: "1" },
        },
        type: "form-request",
      },
    ],
  },
  {
    main: "รายงาน",
    icon: <IoDocumentTextOutline />,
    sub: [
      {
        text: "คำร้องประจำเวลา",
        link: {
          href: "/admin/report/request",
          query: { status: "submit", search: "", page: "1" },
        },
        type: "request",
      },
      {
        text: "สมาชิก",
        link: {
          href: "/admin/report/members",
          query: { status: "", search: "", page: "1" },
        },
        type: "members",
      },
    ],
  },
  {
    main: "จัดการผู้ดูแลระบบ",
    icon: <LuUserCheck />,
    sub: [
      {
        text: "ผู้ดูแลระบบ",
        link: {
          href: "/admin/manage-user",
          query: { search: "", page: "1" },
        },
        type: "",
      },
    ],
  },
];

const AdminSideNav = () => {
  const pathname = usePathname();

  return (
    <div className="h-[93vh] text-slate-700 bg-white w-56 flex flex-col justify-between sticky top-[7vh]">
      <div>
        {lists.map((list, i) => (
          <div key={i}>
            <div className="p-3 bg-blue-100 flex gap-4 items-center">
              {list.icon}
              <p>{list.main}</p>
            </div>
            <div className="p-2">
              {list.sub.map((sub, i) => (
                <NavList
                  key={i}
                  icon={<LuDot />}
                  text={sub.text}
                  link={sub.link}
                  type={sub.type}
                />
              ))}
            </div>
          </div>
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

export default AdminSideNav;
