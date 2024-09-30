import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";

const Page = () => {
  return (
    <div className="flex flex-col h-full gap-4">
      <p className="pl-4">ตรวจสอบสถานะ</p>
      <div className="bg-slate-50 rounded-xl h-full border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>วันที่</TableHead>
              <TableHead>ประเภทคำร้อง</TableHead>
              <TableHead>ข้อมูลเพิ่มเติม</TableHead>
              <TableHead>สถานะ</TableHead>
              <TableHead>รายละเอียด</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>22/02/67</TableCell>
              <TableCell>ขอมีบัตรครั้งแรก</TableCell>
              <TableCell>-</TableCell>
              <TableCell>คำร้องขออนุมัติจัดส่ง</TableCell>
              <TableCell>-</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="align-top">21/02/67</TableCell>
              <TableCell className="align-top">บัตรหมดอายุ</TableCell>
              <TableCell className="align-top">ขาดรูปถ่าย</TableCell>
              <TableCell className="align-top">คำร้องจัดส่งแล้ว</TableCell>
              <TableCell className="w-72">
                The excel hideaway sukhumvit 50 1112/454 ชั้น5 ตึก c ซ.สุขุมวิท
                50(ซอยเริ่มเจริญ) แขวงพระโขนง Phra Khanong, Khlong Toei,
                Bangkok, 10110
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Page;
