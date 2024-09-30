import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import React from "react";
import { FiPlusCircle } from "react-icons/fi";

const Page = () => {
  return (
    <div className="flex flex-col h-full gap-4 text-slate-700">
      <p>ผู้ดูแลระบบ</p>
      <div className="flex items-center justify-between gap-8">
        <Input type="search" placeholder="ค้นหา" className="bg-white w-80" />
        <Button className="gap-2">
          <FiPlusCircle className="w-4 h-4 " />
          <p>เพิ่มผู้ดูแล</p>
        </Button>
      </div>
      <div className="bg-slate-50 h-full w-full px-2 rounded-xl flex flex-col justify-between">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>คำนำหน้าชื่อ</TableHead>
              <TableHead>ชื่อ-นามสกุล</TableHead>
              <TableHead>ตำแหน่ง</TableHead>
              <TableHead>สถานะ</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>นาย</TableCell>
              <TableCell>กนกกร อินทรประสาท</TableCell>
              <TableCell>แอดมิน</TableCell>
              <TableCell>Active</TableCell>
              <TableCell className="flex gap-4 items-center justify-center">
                <Button className="bg-blue-400">แก้ไข</Button>
                <Button variant="destructive" className="bg-red-400">
                  ลบรายชื่อ
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>นาง</TableCell>
              <TableCell>ธรรมิกา พันธ์ภูผา</TableCell>
              <TableCell>ผู้ช่วย</TableCell>
              <TableCell>Inactive</TableCell>
              <TableCell className="flex gap-4 items-center justify-center">
                <Button className="bg-blue-400">แก้ไข</Button>
                <Button variant="destructive" className="bg-red-400">
                  ลบรายชื่อ
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>นาง</TableCell>
              <TableCell>ศศิพร อุดมเอก</TableCell>
              <TableCell>แอดมิน</TableCell>
              <TableCell>Inactive</TableCell>
              <TableCell className="flex gap-4 items-center justify-center">
                <Button className="bg-blue-400">แก้ไข</Button>
                <Button variant="destructive" className="bg-red-400">
                  ลบรายชื่อ
                </Button>
              </TableCell>
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
