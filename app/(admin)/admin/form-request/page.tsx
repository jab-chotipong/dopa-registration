"use client";
import AdminFilter from "@/app/_components/AdminFilter";
import { formAPI } from "@/app/_lib/apis/form";
import { handleFormType, handleStatus } from "@/app/_lib/utils";
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
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoIosCheckmarkCircleOutline, IoIosSearch } from "react-icons/io";
import { LuFileEdit } from "react-icons/lu";
import { MdOutlineCancel, MdOutlineNoteAdd } from "react-icons/md";
import { TbFileInfo } from "react-icons/tb";
import { VscSend } from "react-icons/vsc";

const Page = () => {
  const router = useRouter();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  const searchParams = useSearchParams();
  const [forms, setForms] = useState([]);

  const [statusCount, setStatusCount] = useState<any>({
    deliveriedCount: 0,
    expiredCount: 0,
    reSubmitCount: 0,
    rejectCount: 0,
    submitCount: 0,
    waitingPrintCount: 0,
  });
  const [filters, setFilters] = useState([
    {
      text: "คำร้องใหม่",
      status: "submit",
      icon: <MdOutlineNoteAdd className="text-blue-600 text-xl" />,
      color: "blue",
      count: "submitCount",
    },
    {
      text: "คำร้องแก้ไข",
      status: "re-submit",
      icon: <LuFileEdit className="text-orange-600 text-xl" />,
      color: "orange",
      count: "reSubmitCount",
    },
    {
      text: "คำร้องขออนุมัติจัดส่ง",
      status: "waiting-print",
      icon: <IoIosCheckmarkCircleOutline className="text-green-600 text-xl" />,
      color: "green",
      count: "waitingPrintCount",
    },
    {
      text: "คำร้องจัดส่งแล้ว",
      status: "deliveried",
      icon: <VscSend className="text-yellow-600 text-xl" />,
      color: "yellow",
      count: "deliveriedCount",
    },
    {
      text: "คำร้องที่ไม่อนุมัติ",
      status: "reject",
      icon: <MdOutlineCancel className="text-red-600 text-xl" />,
      color: "red",
      count: "rejectCount",
    },
    {
      text: "คำร้องหมดอายุ",
      status: "expired",
      icon: <TbFileInfo className="text-purple-600 text-xl" />,
      color: "purple",
      count: "expiredCount",
    },
  ]);
  const [page] = useState(searchParams.get("page") || "1");
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [totalPage, setTotalPage] = useState(0);

  const status = searchParams.get("status");

  const getForm = async (
    status: string | null,
    search: string | null,
    page: string | null
  ) => {
    const res = await formAPI.getAllForm(token!, {
      status,
      search,
      page,
      size: 7,
    });
    const { pagination, data, statusCount } = res.data.data;
    setForms(data);
    setStatusCount(statusCount);
    setTotalPage(pagination.totalPages);
  };

  const submitSearch = (e: React.SyntheticEvent) => {
    e.preventDefault();
    getForm(status, search, page);
  };

  const headerText = () => {
    switch (status) {
      case "submit":
        return "คำร้องใหม่";
      case "re-submit":
        return "คำร้องแก้ไข";
      case "waiting-print":
        return "คำร้องขออนุมัติจัดส่ง";
      case "deliveried":
        return "คำร้องจัดส่งแล้ว";
      case "reject":
        return "คำร้องที่ไม่อนุมัติ";
      case "expired":
        return "คำร้องหมดอายุ";
      default:
        return "";
    }
  };

  useEffect(() => {
    getForm(status, search, page);
  }, [status, page]);

  return (
    <div className="flex flex-col h-full w-full gap-6 text-slate-700">
      <p>{headerText()}</p>
      <div className="grid grid-cols-6 gap-4 w-full">
        {filters.map((filter, i) => (
          <AdminFilter
            key={i}
            {...filter}
            value={statusCount[filter.count]}
            onClick={() =>
              router.push(`/admin/form-request?status=${filter.status}`)
            }
            isSelected={filter.status === status}
          />
        ))}
      </div>
      <form onSubmit={submitSearch} className="flex gap-4">
        <Input
          type="string"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="ค้นหา"
          className="bg-white w-72"
        />
        <Button type="submit">ค้นหา</Button>
      </form>

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
              <TableHead>รายละเอียด</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {forms &&
              forms.map((form: any, i) => (
                <TableRow key={i}>
                  <TableCell>
                    {form.sequenceNumber.sequenceNumber}/
                    {form.sequenceNumber.year}
                  </TableCell>
                  <TableCell>
                    {dayjs(new Date(form.createdAt))
                      .locale("th")
                      .format("DD/MM/YYYY")}
                  </TableCell>
                  <TableCell>{handleFormType(form.formType)}</TableCell>
                  <TableCell>
                    {form.firstNameTh} {form.lastNameTh}
                  </TableCell>
                  <TableCell>{form.currentProvince}</TableCell>
                  <TableCell>{handleStatus(form.status)}</TableCell>
                  <TableCell>
                    <Link href={`/admin/form/${form.id}`}>
                      <Button>คลิก</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <Pagination className="items-end justify-end">
          {/* TODO */}
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            {totalPage <= 4 ? (
              <>
                {[...Array(totalPage)].map((p, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      className={parseInt(page) == i + 1 ? "text-primary" : ""}
                      href={`/admin/form-request?status=${status}&page=${
                        i + 1
                      }&search=${search}`}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
              </>
            ) : (
              <>
                <PaginationItem>
                  <PaginationLink
                    className={"text-primary"}
                    href={`/admin/form-request?status=${status}&page=${page}&search=${search}`}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    href={`/admin/form-request?status=${status}&page=${
                      parseInt(page) + 1
                    }&search=${search}`}
                  >
                    {parseInt(page) + 1}
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    href={`/admin/form-request?status=${status}&page=${
                      parseInt(page) + 2
                    }&search=${search}`}
                  >
                    {parseInt(page) + 2}
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    href={`/admin/form-request?status=${status}&page=${totalPage}&search=${search}`}
                  >
                    {totalPage}
                  </PaginationLink>
                </PaginationItem>
              </>
            )}
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
