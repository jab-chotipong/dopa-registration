"use client";
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
import React, { useEffect, useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { userAPI } from "@/app/_lib/apis/user";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { InputWithLabel } from "@/app/_components/InputWithLabel";
import { FormProvider, useForm } from "react-hook-form";
import { authAPI } from "@/app/_lib/apis/auth";
import { FaCheckCircle } from "react-icons/fa";
import { Switch } from "@/components/ui/switch";

const Page = () => {
  const router = useRouter();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  const [user, setUser] = useState([]);
  const [id, setId] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);
  const [editedSuccess, setEditedSuccess] = useState(false);
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(searchParams.get("page") || "1");
  const [totalPage, setTotalPage] = useState(0);
  const [addError, setAddError] = useState<string | null>(null);

  const methods = useForm();
  const {
    handleSubmit,
    setValue,
    reset,
    getValues,
    formState: { errors },
  } = methods;
  const onSubmit = handleSubmit(async (data) => {
    console.log(isEdit);
    if (isEdit) {
      if (id) {
        if (data.newPassword == "") delete data.newPassword;
        data.id = id;
        try {
          const res = await userAPI.updateAdmin(token!, data);
          console.log(res);
          if (res.status === 200) {
            setEditedSuccess(true);
            getAdmin();
          } else {
          }
        } catch (e) {}
      }
    } else {
      try {
        const res = await authAPI.addAdmin(token!, data);
        if (res.status === 201) {
          setAddedSuccess(true);
          getAdmin();
          setAddError(null);
        }
      } catch (e: any) {
        if (e.status == 409) {
          setAddError("ผู้ใช้นี้มีอยู่ในระบบอยู่แล้ว");
        }
      }
    }
  });

  const onToggle = (id: string, status: boolean) => {
    if (status) {
      deleteAdmin(id);
    } else {
      activateAdmin(id);
    }
  };

  const activateAdmin = async (id: string) => {
    await userAPI.patchAdmin(token!, id);
    getAdmin();
  };

  const deleteAdmin = async (id: string) => {
    await userAPI.deleteAdmin(token!, id);
    getAdmin();
  };

  const selectAdmin = (user: any) => {
    setIsEdit(true);
    setId(user.id);
    setValue("username", user.username);
    setValue("titleTh", user.titleTh);
    setValue("phoneNumber", user.phoneNumber);
    setValue("firstNameTh", user.firstNameTh);
    setValue("lastNameTh", user.lastNameTh);
  };

  const getAdmin = async () => {
    const res = await userAPI.getAdmin(token!, { search, page });
    setUser(res.data.data.data);
    setTotalPage(res.data.data.pagination.totalPages);
  };

  const onSearch = (e: React.SyntheticEvent) => {
    e.preventDefault();
    getAdmin();
    router.push(`/admin/manage-user?search=${search}&page=${page}`);
  };

  useEffect(() => {
    getAdmin();
  }, []);

  return (
    <div className="flex flex-col h-full gap-4 text-slate-700">
      <p>ผู้ดูแลระบบ</p>
      <div className="flex items-center justify-between gap-8">
        <form onSubmit={onSearch} className="flex gap-2">
          <Input
            onChange={(e) => setSearch(e.target.value)}
            type="search"
            placeholder="ค้นหา"
            className="bg-white w-80"
          />
          <Button type="submit">ค้นหา</Button>
        </form>
        <Dialog
          onOpenChange={() => {
            setAddError(null);
            setAddedSuccess(false);
          }}
        >
          <DialogTrigger asChild>
            <Button className="gap-2">
              <FiPlusCircle className="w-4 h-4 " />
              <p>เพิ่มผู้ดูแล</p>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader className="gap-8">
              <DialogTitle>เพิ่มผู้ดูแล</DialogTitle>
              <DialogDescription>
                {!addedSuccess ? (
                  <FormProvider {...methods}>
                    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
                      <InputWithLabel
                        type="string"
                        name="username"
                        label="ชื่อผู้ใช้"
                        rule={{ required: true }}
                      />
                      <InputWithLabel
                        type="password"
                        name="password"
                        label="รหัสผ่าน"
                        rule={{ required: true }}
                      />
                      <InputWithLabel
                        type="string"
                        name="titleTh"
                        label="คำนำหน้า"
                        rule={{ required: true }}
                      />
                      <InputWithLabel
                        type="string"
                        name="firstNameTh"
                        label="ชื่อ"
                        rule={{ required: true }}
                      />
                      <InputWithLabel
                        type="string"
                        name="lastNameTh"
                        label="นามสกุล"
                        rule={{ required: true }}
                      />
                      <InputWithLabel
                        type="string"
                        name="phoneNumber"
                        label="เบอร์โทรศัพท์"
                        rule={{ required: true }}
                      />
                      {addError && (
                        <p className="text-sm text-red-500">{addError}</p>
                      )}
                      <Button type="submit">เพิ่มผู้ดูแล</Button>
                    </form>
                  </FormProvider>
                ) : (
                  <div className="flex flex-col gap-8 items-center">
                    <FaCheckCircle className="w-12 h-12 text-green-500" />
                    <p>เพิ่มผู้ดูแลสำเร็จ</p>
                  </div>
                )}
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <div className="bg-slate-50 h-full w-full px-2 rounded-xl flex flex-col justify-between">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>คำนำหน้า</TableHead>
              <TableHead>ชื่อ-นามสกุล</TableHead>
              <TableHead>เบอร์โทรศัพท์</TableHead>
              <TableHead>ตำแหน่ง</TableHead>
              <TableHead>สถานะ</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {user?.map((u: any, i) => (
              <TableRow key={i}>
                <TableCell>{u.titleTh}</TableCell>
                <TableCell>
                  {u.firstNameTh} {u.lastNameTh}
                </TableCell>
                <TableCell>{u.phoneNumber}</TableCell>
                <TableCell>แอดมิน</TableCell>
                <TableCell>{u.adminStatus ? "Active" : "Inactive"}</TableCell>
                {u.adminStatus && (
                  <TableCell className="flex gap-8 items-center justify-center">
                    {/* <Switch
                    checked={u.adminStatus}
                    onCheckedChange={() => onToggle(u.id, u.adminStatus)}
                  /> */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          onClick={() => selectAdmin(u)}
                          className="bg-blue-400"
                        >
                          แก้ไข
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader className="gap-8">
                          <DialogTitle>แก้ไขผู้ดูแล</DialogTitle>
                          <DialogDescription>
                            {!editedSuccess ? (
                              <FormProvider {...methods}>
                                <form
                                  className="flex flex-col gap-4"
                                  onSubmit={onSubmit}
                                >
                                  <InputWithLabel
                                    type="string"
                                    name="username"
                                    label="ชื่อผู้ใช้"
                                    rule={{ required: true }}
                                  />
                                  <InputWithLabel
                                    type="password"
                                    name="newPassword"
                                    label="รหัสผ่านใหม่"
                                  />
                                  <InputWithLabel
                                    type="string"
                                    name="titleTh"
                                    label="คำนำหน้า"
                                    rule={{ required: true }}
                                  />
                                  <InputWithLabel
                                    type="string"
                                    name="firstNameTh"
                                    label="ชื่อ"
                                    rule={{ required: true }}
                                  />
                                  <InputWithLabel
                                    type="string"
                                    name="lastNameTh"
                                    label="นามสกุล"
                                    rule={{ required: true }}
                                  />
                                  <InputWithLabel
                                    type="string"
                                    name="phoneNumber"
                                    label="เบอร์โทรศัพท์"
                                    rule={{ required: true }}
                                  />
                                  <Button type="submit">แก้ไขผู้ดูแล</Button>
                                </form>
                              </FormProvider>
                            ) : (
                              <div className="flex flex-col gap-8 items-center">
                                <FaCheckCircle className="w-12 h-12 text-green-500" />
                                <p>แก้ไขสำเร็จ</p>
                              </div>
                            )}
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                    <Dialog
                      onOpenChange={(status) => {
                        if (!status) {
                          reset();
                          setIsEdit(false);
                          setEditedSuccess(false);
                        }
                      }}
                    >
                      <DialogTrigger asChild>
                        <Button className="bg-red-400" variant="destructive">
                          ลบ
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader className="gap-8">
                          <DialogTitle>ลบผู้ดูแล</DialogTitle>
                          <DialogDescription>
                            <div className="flex flex-col gap-4">
                              <p>
                                หากลบผู้ดูแล
                                ผู้ดูแลจะถูกเปลี่ยนไปเป็นผู้ใช้งานปกติและไม่สามารถกลับมาเป็นแอดมินได้
                              </p>
                              <div className="flex justify-end gap-4">
                                <Button
                                  variant="secondary"
                                  className="bg-white-400"
                                >
                                  ยกเลิก
                                </Button>
                                <Button
                                  variant="destructive"
                                  className="bg-red-400"
                                  onClick={() => deleteAdmin(u.id)}
                                >
                                  ลบ
                                </Button>
                              </div>
                            </div>
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Pagination className="items-end justify-end">
          {/* TODO */}
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={`/admin/manage-user?status=${status}&page=${
                  parseInt(page) > 1 ? parseInt(page) - 1 : 1
                }&search=${search}`}
              />
            </PaginationItem>
            {totalPage <= 4 ? (
              <>
                {[...Array(totalPage)].map((p, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      className={parseInt(page) == i + 1 ? "text-primary" : ""}
                      href={`/admin/manage-user?status=${status}&page=${
                        i + 1
                      }&search=${search}`}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
              </>
            ) : (
              totalPage - parseInt(page) >= 3 && (
                <>
                  {parseInt(page) != 1 && (
                    <PaginationItem>
                      <PaginationLink
                        href={`/admin/manage-user?status=${status}&page=${
                          parseInt(page) - 1
                        }&search=${search}`}
                      >
                        {parseInt(page) - 1}
                      </PaginationLink>
                    </PaginationItem>
                  )}
                  <PaginationItem>
                    <PaginationLink
                      className={"text-primary"}
                      href={`/admin/manage-user?status=${status}&page=${page}&search=${search}`}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      href={`/admin/manage-user?status=${status}&page=${
                        parseInt(page) + 1
                      }&search=${search}`}
                    >
                      {parseInt(page) + 1}
                    </PaginationLink>
                  </PaginationItem>
                  {parseInt(page) == 1 && (
                    <PaginationItem>
                      <PaginationLink
                        href={`/admin/manage-user?status=${status}&page=${
                          parseInt(page) + 2
                        }&search=${search}`}
                      >
                        {parseInt(page) + 2}
                      </PaginationLink>
                    </PaginationItem>
                  )}
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      href={`/admin/manage-user?status=${status}&page=${totalPage}&search=${search}`}
                    >
                      {totalPage}
                    </PaginationLink>
                  </PaginationItem>
                </>
              )
            )}
            {totalPage - parseInt(page) < 3 && totalPage > 4 && (
              <>
                <PaginationItem>
                  <PaginationLink
                    href={`/admin/manage-user?status=${status}&page=${1}&search=${search}`}
                  >
                    {1}
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    className={
                      parseInt(page) === totalPage - 2 ? "text-primary" : ""
                    }
                    href={`/admin/manage-user?status=${status}&page=${
                      totalPage - 2
                    }&search=${search}`}
                  >
                    {totalPage - 2}
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    className={
                      parseInt(page) === totalPage - 1 ? "text-primary" : ""
                    }
                    href={`/admin/manage-user?status=${status}&page=${
                      totalPage - 1
                    }&search=${search}`}
                  >
                    {totalPage - 1}
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    className={
                      parseInt(page) === totalPage ? "text-primary" : ""
                    }
                    href={`/admin/manage-user?status=${status}&page=${totalPage}&search=${search}`}
                  >
                    {totalPage}
                  </PaginationLink>
                </PaginationItem>
              </>
            )}
            <PaginationItem>
              <PaginationNext
                href={`/admin/manage-user?status=${status}&page=${
                  parseInt(page) == totalPage
                    ? parseInt(page)
                    : parseInt(page) + 1
                }&search=${search}`}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default Page;
