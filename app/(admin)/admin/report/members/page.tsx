"use client";
import AdminFilter from "@/app/_components/AdminFilter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import {
  BsEnvelope,
  BsEnvelopeCheck,
  BsEnvelopeDash,
  BsEnvelopeExclamation,
} from "react-icons/bs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const filters = [
  {
    text: "ทั้งหมด",
    icon: <BsEnvelope className="text-blue-600 text-xl" />,
    color: "blue",
    value: 2243,
  },
  {
    text: "ยังไม่มีสิทธิ์",
    icon: <BsEnvelopeDash className="text-orange-600 text-xl" />,
    color: "orange",
    value: 703,
  },
  {
    text: "บัตรยังไม่หมดอายุ",
    icon: <BsEnvelopeCheck className="text-green-600 text-xl" />,
    color: "green",
    value: 1230,
  },
  {
    text: "บัตรหมดอายุ",
    icon: <BsEnvelopeExclamation className="text-purple-600 text-xl" />,
    color: "purple",
    value: 310,
  },
];

const Page = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>("ทั้งหมด");
  return (
    <div className="flex flex-col w-full h-full gap-6 text-slate-700">
      <p>สมาชิก</p>
      <div className="grid grid-cols-4 gap-8">
        {filters.map((filter) => (
          <AdminFilter
            {...filter}
            onClick={() => setSelectedFilter(filter.text)}
            isSelected={selectedFilter == filter.text}
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
      <div className="bg-slate-50 h-full w-full px-2 rounded-xl flex flex-col justify-between">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>คำนำหน้าชื่อ</TableHead>
              <TableHead>ชื่อ-นามสกุล</TableHead>
              <TableHead>สถานะ</TableHead>
              <TableHead>วันที่หมดอายุ</TableHead>
              <TableHead>จังหวัด</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>นาย</TableCell>
              <TableCell>กนกกร อินทรประสาท</TableCell>
              <TableCell>คำร้องจัดส่งแล้ว</TableCell>
              <TableCell>22/02/67</TableCell>
              <TableCell>กรุงเทพมหานคร</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>นาง</TableCell>
              <TableCell>ธรรมิกา พันธ์ภูผา</TableCell>
              <TableCell>คำร้องจัดส่งแล้ว</TableCell>
              <TableCell>02/03/67</TableCell>
              <TableCell>พระนครศรีอยุธยา</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>นาง</TableCell>
              <TableCell>ศศิพร อุดมเอก</TableCell>
              <TableCell>คำร้องใหม่</TableCell>
              <TableCell>12/03/67</TableCell>
              <TableCell>อุบลราชธานี</TableCell>
            </TableRow>
          </TableBody>
          <TableBody />
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
