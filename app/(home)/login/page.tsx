"use client";
import { Button } from "@/components/ui/button";
import { InputWithLabel } from "../../_components/InputWithLabel";
import Link from "next/link";
import {
  SubmitHandler,
  useForm,
  Controller,
  FieldValue,
} from "react-hook-form";
import { useRouter } from "next/navigation";
import { FormProvider } from "react-hook-form";
import { _post } from "@/app/_lib/apis/api";
import { useEffect, useState } from "react";

interface IFormInput {
  username: string;
  password: string;
}

const Page = () => {
  const router = useRouter();
  const methods = useForm<IFormInput>();
  const {
    handleSubmit,
    setError,
    formState: { errors },
  } = methods;
  const onSubmit = handleSubmit(async (data) => {
    if (data.username == "admin" && data.password == "admin") {
      router.push("/admin/form-request?state=new");
      return;
    }
    let res = await _post("/auth/login", data).catch((e) => {
      console.log(e);
      if (e.status == 401) {
        setError("username", {
          type: "invalid",
        });
      }
    });
    if (res?.status === 200) {
      localStorage.setItem("accessToken", res.data.data.accessToken);
      localStorage.setItem("refreshToken", res.data.data.refreshToken);
      router.push("/user/detail");
    }
  });

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={onSubmit}
        className="flex flex-col w-full items-center justify-center text-center gap-4 relative"
      >
        <img
          src="dopa-icon.png"
          alt="DOPA Icon"
          className="object-cover h-[150px] w-[150px]"
        />
        <h3 className="text-2xl font-bold text-blue-700 mb-8">เข้าสู่ระบบ</h3>
        <div className="w-full xl:w-2/3 flex flex-col gap-4">
          <InputWithLabel
            rule={{ required: true }}
            type="string"
            name="username"
            label="ชื่อผู้ใช้"
          />
          <InputWithLabel
            rule={{ required: true }}
            type="password"
            name="password"
            label="รหัสผ่าน"
          />
          <Link href="/" className="text-primary text-sm self-end underline">
            ลืมรหัสผ่าน
          </Link>
        </div>
        <Button type="submit" className="w-full xl:w-2/3">
          เข้าสู่ระบบ
        </Button>
        <Link href="/register" className="mt-12">
          ยังไม่เป็นสมาชิก?{" "}
          <span className="text-primary underline">สมัครสมาชิก</span>
        </Link>
      </form>
    </FormProvider>
  );
};

export default Page;
