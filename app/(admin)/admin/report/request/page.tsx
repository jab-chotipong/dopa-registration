"use client";
import AdminFilter from "@/app/_components/AdminFilter";
import CalendarInput from "@/app/_components/CalendarInput";
import { InputWithLabel } from "@/app/_components/InputWithLabel";
import { formAPI } from "@/app/_lib/apis/form";
import {
  formatSearchDate,
  handleFormType,
  handleStatus,
} from "@/app/_lib/utils";
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
import { FormProvider, useForm } from "react-hook-form";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
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
  const methods = useForm();
  const { handleSubmit, control, getValues, watch, setValue } = methods;

  const onSubmit = handleSubmit(async (data) => {
    getForm(status, data.search, page, formatSearchDate(data.date));
    router.push(
      `/admin/report/request?status=${status}&search=${data.search}&page=${page}`
    );
  });

  const getForm = async (
    status: string | null,
    search: string | null,
    page: string | null,
    date?: any
  ) => {
    const res = await formAPI.getAllForm(token!, {
      status,
      search,
      page,
      startDate: date?.startDate,
      endDate: date?.endDate,
      size: 10,
    });
    const { pagination, data, statusCount } = res.data.data;
    setForms(data);
    setStatusCount(statusCount);
    setTotalPage(pagination.totalPages);
  };

  const exportForm = async () => {
    const date = getValues("date");
    const q = date.startDate && date.endDate ? formatSearchDate(date) : null;
    const res = await formAPI.exportForm(
      {
        search,
        status,
        startDate: q ? q.startDate : null,
        endDate: q ? q.endDate : null,
      },
      token!
    );
    const url = URL.createObjectURL(res.data);
    window.open(url);
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
    <div className="flex flex-col h-full gap-6 text-slate-700">
      <p>{headerText()}</p>
      <div className="grid grid-cols-6 gap-4">
        {filters.map((filter, i) => (
          <AdminFilter
            key={i}
            {...filter}
            value={statusCount[filter.count]}
            onClick={() =>
              router.push(
                `/admin/report/request?status=${filter.status}&search=${search}&page=${page}`
              )
            }
            isSelected={filter.status === status}
          />
        ))}
      </div>
      <FormProvider {...methods}>
        <form onSubmit={onSubmit} className="flex gap-8">
          <InputWithLabel type="string" name="search" placeholder="ค้นหา" />
          <CalendarInput id="date" placeholder="วันที่" />
          <Button type="submit">ค้นหา</Button>
          <Button variant="secondary" type="button" onClick={exportForm}>
            ดาวน์โหลด
          </Button>
        </form>
      </FormProvider>
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
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <Pagination className="items-end justify-end">
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
                      href={`/admin/report/request?status=${status}&page=${
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
                    href={`/admin/report/request?status=${status}&page=${page}&search=${search}`}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    href={`/admin/report/request?status=${status}&page=${
                      page + 1
                    }&search=${search}`}
                  >
                    {page + 1}
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    href={`/admin/report/request?status=${status}&page=${
                      page + 2
                    }&search=${search}`}
                  >
                    {page + 2}
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    href={`/admin/report/request?status=${status}&page=${totalPage}&search=${search}`}
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
