"use client";
import AdminFilter from "@/app/_components/AdminFilter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useState } from "react";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { LuFileEdit } from "react-icons/lu";
import { MdOutlineCancel, MdOutlineNoteAdd } from "react-icons/md";
import { TbFileInfo } from "react-icons/tb";
import { VscSend } from "react-icons/vsc";

const filters = [
  {
    text: "คำร้องใหม่",
    icon: <MdOutlineNoteAdd className="text-blue-600 text-xl" />,
    color: "blue",
    value: 80,
  },
  {
    text: "คำร้องแก้ไข",
    icon: <LuFileEdit className="text-orange-600 text-xl" />,
    color: "orange",
    value: 11,
  },
  {
    text: "คำร้องขออนุมัติจัดส่ง",
    icon: <IoIosCheckmarkCircleOutline className="text-green-600 text-xl" />,
    color: "green",
    value: 22,
  },
  {
    text: "คำร้องจัดส่งแล้ว",
    icon: <VscSend className="text-yellow-600 text-xl" />,
    color: "yellow",
    value: 2254,
  },
  {
    text: "คำร้องที่ไม่อนุมัติ",
    icon: <MdOutlineCancel className="text-red-600 text-xl" />,
    color: "red",
    value: 290,
  },
  {
    text: "คำร้องหมดอายุ",
    icon: <TbFileInfo className="text-purple-600 text-xl" />,
    color: "purple",
    value: 10,
  },
];

const Page = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>("คำร้องใหม่");
  return (
    <div className="flex flex-col h-full gap-6 text-slate-700">
      <p>คำร้องขอใหม่</p>
      <div className="grid grid-cols-6 gap-4">
        {filters.map((filter) => (
          <AdminFilter
            {...filter}
            onClick={() => setSelectedFilter(filter.text)}
            isSelected={filter.text === selectedFilter}
          />
        ))}
      </div>
      <div className="flex gap-8">
        <Input type="search" placeholder="ค้นหา" className="bg-white" />
        <Input
          type="search"
          placeholder="เลือกวันที่เริ่มต้น"
          className="bg-white"
        />
        <Input
          type="search"
          placeholder="เลือกวันที่เริ่มสิ้นสุด"
          className="bg-white"
        />
        <Button>ดาวน์โหลด</Button>
      </div>

      <div className="bg-slate-50 h-full w-full rounded-xl flex flex-col justify-between">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>เลขที่ร้องขอ</TableHead>
              <TableHead>วันที่</TableHead>
              <TableHead>ประเภทคำร้อง</TableHead>
              <TableHead>ชื่อ-นามสกุล</TableHead>
              <TableHead>จังหวัด</TableHead>
              <TableHead>สถานะ</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>00001</TableCell>
              <TableCell>22/02/67</TableCell>
              <TableCell>ขอมีบัตรครั้งแรก</TableCell>
              <TableCell>กนกกร อินทรประสาท</TableCell>
              <TableCell>กรุงเทพมหานคร</TableCell>
              <TableCell>คำร้องใหม่</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>00002</TableCell>
              <TableCell>02/03/67</TableCell>
              <TableCell>บัตรหมดอายุ</TableCell>
              <TableCell>ธรรมิกา พันธ์ภูผา</TableCell>
              <TableCell>พระนครศรีอยุธยา</TableCell>
              <TableCell>คำร้องใหม่</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>00003</TableCell>
              <TableCell>12/03/67</TableCell>
              <TableCell>ขอเปลี่ยนบัตร</TableCell>
              <TableCell>ศศิพร อุดมเอก</TableCell>
              <TableCell>อุบลราชธานี</TableCell>
              <TableCell>คำร้องใหม่</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>00004</TableCell>
              <TableCell>13/04/67</TableCell>
              <TableCell>ขอเปลี่ยนบัตร</TableCell>
              <TableCell>ก้องยศ ปราสาทงาม</TableCell>
              <TableCell>เชียงใหม่</TableCell>
              <TableCell>คำร้องใหม่</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Pagination className="items-end justify-end">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default Page;
