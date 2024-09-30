"use client";
import { CheckboxWithText } from "@/app/_components/CheckBox";
import ConfirmationDialog from "@/app/_components/ConfirmationDialog";
import { InputWithLabel } from "@/app/_components/InputWithLabel";
import { userAPI } from "@/app/_lib/apis/user";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FiHome, FiUser } from "react-icons/fi";
import { IoIosCheckmarkCircle } from "react-icons/io";

const Page = () => {
  const [open, setOpen] = useState<boolean>(false);
  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  const [isSameAddress, setIsSameAddress] = useState<boolean>(false);
  const methods = useForm({ defaultValues: async () => await getUser() });
  const { handleSubmit } = methods;
  const onSubmit = handleSubmit(async (data) => {
    delete data.password;
    if (isSameAddress) {
      data.currentAddress = data.registrationAddress;
      data.currentSubDistrict = data.registrationSubDistrict;
      data.currentDistrict = data.registrationDistrict;
      data.currentProvince = data.registrationProvince;
      data.PostalCode = data.registrationPostalCode;
    }
    let res = await userAPI.patchMe(data, token!);
    console.log(res);
  });

  const getUser = async () => {
    let res = await userAPI.getMe(token!);
    return res.data.data;
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={onSubmit}
        className="bg-slate-50 p-6 rounded-xl h-full border flex flex-col gap-8"
      >
        <div className="flex gap-4 items-center px-4 py-2  rounded-xl bg-orange-100">
          <FiUser className="text-orange-400" />
          <p className="text-orange-400">ข้อมูลส่วนตัว</p>
        </div>

        <div className="grid grid-cols-3 gap-8 items-center">
          <InputWithLabel
            type="string"
            name="username"
            disabled
            label="ชื่อผู้ใช้"
          />
          <InputWithLabel
            type="password"
            disabled
            name="password"
            label="รหัสผ่าน"
          />
          <Link
            href="/user/detail"
            className="pt-4 text-sm text-primary underline"
          >
            เปลี่ยน
          </Link>
        </div>
        <span className="w-full h-[1px] bg-slate-200"></span>

        <div className="grid grid-cols-3 gap-8">
          <InputWithLabel type="string" name="titleTh" label="คำนำหน้าชื่อ" />
          <InputWithLabel
            type="string"
            name="firstNameTh"
            label="ชื่อ (ภาษาไทย)"
          />
          <InputWithLabel
            type="string"
            name="lastNameTh"
            label="นามสกุล (ภาษาไทย)"
          />
          <InputWithLabel
            type="string"
            name="firstNameEn"
            label="ชื่อ (ภาษาอังกฤษ)"
          />
          <InputWithLabel
            type="string"
            name="lastNameEn"
            label="นามสกุล (ภาษภาษาอังกฤษ)"
          />
          <InputWithLabel
            type="string"
            name="citizenId"
            label="หมายเลขบัตรประจำตัวประชาชน"
          />
          <InputWithLabel
            type="string"
            name="birthDate"
            label="วัน/เดือน/ปีเกิด"
          />
          <InputWithLabel type="string" name="nation" label="สัญชาติ" />
          <InputWithLabel type="string" name="religion" label="ศาสนา" />
        </div>

        <div className="flex gap-4 items-center px-4 py-2  rounded-xl bg-blue-100">
          <FiHome className="text-blue-600" />
          <p className="text-blue-600">ที่อยู่ตามทะเบียนบ้าน</p>
        </div>

        <div className="grid grid-cols-3 gap-8">
          <InputWithLabel
            label="ที่อยู่"
            name="registrationAddress"
            className="col-span-2"
          />
          <InputWithLabel
            type="string"
            name="registrationSubDistrict"
            label="แขวง/ตำบล"
          />
          <InputWithLabel
            type="string"
            name="registrationDistrict"
            label="เขต/อำเภอ"
          />
          <InputWithLabel
            type="string"
            name="registrationProvince"
            label="จังหวัด"
          />
          <InputWithLabel
            type="string"
            name="registrationPostalCode"
            label="รหัสไปรษณีย์"
          />
        </div>

        <div className="flex gap-4 items-center px-4 py-2  rounded-xl bg-green-100">
          <FiHome className="text-green-700" />
          <p className="text-green-700">ที่อยู่ปัจจุบัน</p>
        </div>

        <div className="grid grid-cols-3 gap-8">
          <CheckboxWithText
            label="ที่อยู่ตามทะเบียนบ้าน"
            id="sameAddr"
            className="col-span-3"
            onChange={() => {
              setIsSameAddress(!isSameAddress);
            }}
          />
          {!isSameAddress && (
            <>
              <InputWithLabel
                type="string"
                name="currentAddress"
                label="ที่อยู่"
                className="col-span-2"
              />
              <InputWithLabel
                type="string"
                name="currentSubDistrict"
                label="แขวง/ตำบล"
              />
              <InputWithLabel
                type="string"
                name="currentDistrict"
                label="เขต/อำเภอ"
              />
              <InputWithLabel
                type="string"
                name="currentProvince"
                label="จังหวัด"
              />
              <InputWithLabel
                type="string"
                name="currentPostalCode"
                label="รหัสไปรษณีย์"
              />
            </>
          )}
        </div>

        <div className="w-full flex items-center justify-center gap-8">
          <Button className="w-28" variant="outline">
            ยกเลิก
          </Button>
          <ConfirmationDialog
            open={open}
            icon={<IoIosCheckmarkCircle className="w-12 h-12 text-green-500" />}
            desc="บันทึกข้อมูลสำเร็จ"
            confirmText="ยื่นคำร้องขอมีบัตร"
            cancelText="กลับ"
          >
            <Button className="w-28" type="submit">
              บันทึกข้อมูล
            </Button>
          </ConfirmationDialog>
        </div>
      </form>
    </FormProvider>
  );
};

export default Page;
