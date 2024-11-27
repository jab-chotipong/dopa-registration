"use client";
import Spinner from "@/app/_components/Spinner";
import { formAPI } from "@/app/_lib/apis/form";
import { handleFormType, handleStatus } from "@/app/_lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useEffect, useState } from "react";
import { TbReportOff } from "react-icons/tb";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);

  const getForm = async () => {
    try {
      const res = await formAPI.getMyForm(token!);
      setForms(res.data.data);
    } catch (e) {}
    setLoading(false);
  };

  useEffect(() => {
    getForm();
  }, []);

  return (
    <div className="flex flex-col h-full gap-4 pt-4  md:w-full overflow-auto md:pt-0">
      <p className="pl-4">ตรวจสอบสถานะ</p>
      <div className="bg-slate-50 rounded-xl h-full border text-slate-700">
        {forms.length > 0 ? (
          <Table className="overflow-x-auto">
            <TableHeader>
              <TableRow>
                <TableHead>วันที่</TableHead>
                <TableHead>ประเภทคำร้อง</TableHead>
                <TableHead>ข้อมูลเพิ่มเติม</TableHead>
                <TableHead>สถานะ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {forms.map((f: any) => (
                <TableRow
                  key={f.id}
                  onClick={() => router.push(`/user/form/${f.id}`)}
                >
                  <TableCell className="align-top">
                    {dayjs(new Date(f.createdAt))
                      .locale("th")
                      .format("DD/MM/YYYY")}
                  </TableCell>
                  <TableCell className="align-top">
                    {handleFormType(f.formType)}
                  </TableCell>
                  <TableCell className="align-top">{f.remark}</TableCell>
                  <TableCell className="align-top">
                    {handleStatus(f.status)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : loading ? (
          <div className="w-full p-8 h-full flex items-center justify-center sm:items-start sm:justify-start">
            <Spinner />
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-4">
            <TbReportOff className="w-24 h-24" />
            <p>ไม่พบการขอใบอนุญาต</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
