"use client";
import { Button } from "@/components/ui/button";
import { InputWithLabel } from "../../_components/InputWithLabel";
import Link from "next/link";
import {
  SubmitHandler,
  useForm,
  Controller,
  FormProvider,
} from "react-hook-form";
import { _post } from "@/app/_lib/apis/api";
import ConfirmationDialog from "@/app/_components/ConfirmationDialog";
import { useState } from "react";
import { IoIosCheckmarkCircle } from "react-icons/io";

interface IFormInput {
  username: string;
  password: string;
  confirmPassword: string;
}

const Page = () => {
  const methods = useForm<IFormInput>();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const { handleSubmit, setError } = methods;
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (data.password !== data.confirmPassword) return;
    let res = await _post("/auth/register", data).catch((e) => {
      if (e.status === 409) {
        setError("username", { type: "duplicated" });
      } else {
        setError("username", { type: "tryAgain" });
      }
    });
    if (res?.status === 201) {
      setIsSuccess(true);
    }
  };

  return (
    <FormProvider {...methods}>
      {isSuccess ? (
        <div className="flex w-full flex-col gap-8 items-center justify-center">
          <IoIosCheckmarkCircle className="w-24 h-24 text-green-500" />
          <h3 className="text-2xl font-bold text-blue-700">
            สมัครสมาชิกสำเร็จ
          </h3>
          <Link href="/login" className="w-1/2">
            <Button className="w-full">เข้าสู่ระบบ</Button>
          </Link>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full items-center justify-center text-center gap-4 relative"
        >
          <img
            src="dopa-icon.png"
            alt="DOPA Icon"
            className="object-cover h-[150px] w-[150px]"
          />
          <h3 className="text-2xl font-bold text-blue-700 mb-8">สมัครสมาชิก</h3>
          <div className="w-full xl:w-2/3 flex flex-col gap-4">
            <InputWithLabel
              rule={{ required: true }}
              name="username"
              type="string"
              label="ชื่อผู้ใช้"
            />
            <InputWithLabel
              rule={{ required: true, minLength: 8 }}
              type="password"
              name="password"
              label="รหัสผ่าน"
            />
            <InputWithLabel
              rule={{ required: true, minLength: 8 }}
              type="password"
              name="confirmPassword"
              label="ยืนยันรหัสผ่าน"
            />
          </div>
          <Button className="w-full xl:w-2/3">สมัครสมาชิก</Button>
          <Link href="/login" className="mt-8">
            เป็นสมาชิกอยู่แล้ว?{" "}
            <span className="text-primary underline">เข้าสู่ระบบ</span>
          </Link>
        </form>
      )}
    </FormProvider>
  );
};

export default Page;
