"use client";
import CalendarInput from "@/app/_components/CalendarInput";
import { CheckboxWithText } from "@/app/_components/CheckBox";
import ConfirmationDialog from "@/app/_components/ConfirmationDialog";
import { InputWithLabel } from "@/app/_components/InputWithLabel";
import { authAPI } from "@/app/_lib/apis/auth";
import { userAPI } from "@/app/_lib/apis/user";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import dayjs from "dayjs";
import th from "dayjs/locale/th";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FaCheckCircle } from "react-icons/fa";
import { FiHome, FiUser } from "react-icons/fi";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { MdError } from "react-icons/md";

const Page = () => {
  const router = useRouter();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  const [isSameAddress, setIsSameAddress] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [confirmDialog, setConfirmDialog] = useState<any>({
    icon: null,
    desc: null,
    confirmText: "",
    cancelText: "",
    onConfirm: () => undefined,
    onCancel: () => undefined,
  });

  const methods = useForm({ defaultValues: async () => await getUser() });
  const {
    handleSubmit,
    setValue,
    getValues,
    resetField,
    setError,
    formState: { errors },
  } = methods;
  const onSubmit = handleSubmit(async (data) => {
    delete data.password;
    console.log(getValues("birthDate"));
    if (getValues("birthDate") != null) {
      data.birthDate = new Date(getValues("birthDate").startDate).toString();
    } else {
      setError("birthDate", { type: "required" });
    }
    if (isSameAddress) {
      data.currentAddressNumber = getValues("registrationAddressNumber");
      data.currentVillageNumber = getValues("registrationVillageNumber");
      data.currentRoad = getValues("registrationRoad");
      data.currentAddress = getValues("registrationAddress");
      data.currentSubDistrict = getValues("registrationSubDistrict");
      data.currentDistrict = getValues("registrationDistrict");
      data.currentProvince = getValues("registrationProvince");
      data.currentPostalCode = getValues("registrationPostalCode");
    }
    try {
      let res = await userAPI.patchMe(data, token!);
      if (res.status === 200) {
        setOpen(true);
        setConfirmDialog({
          icon: <IoIosCheckmarkCircle className="w-12 h-12 text-green-500" />,
          desc: "บันทึกข้อมูลสำเร็จ",
          confirmText: "ยื่นคำร้องขอมีบัตร",
          cancelText: "กลับ",
          onConfirm: () => router.push("/user/form/request"),
          onCancel: () => setOpen(false),
        });
      }
    } catch (e) {
      setOpen(true);
      setConfirmDialog({
        icon: <MdError className="w-12 h-12 text-red-500" />,
        desc: "พบข้อผิดพลาด",
        cancelText: "ปิด",
        onCancel: () => setOpen(false),
      });
    }
  });

  const getUser = async () => {
    let res = await userAPI.getMe(token!);
    console.log(res.data.data.birthDate);
    res.data.data.birthDate = res.data.data.birthDate && {
      startDate: new Date(res.data.data.birthDate),
      endDate: new Date(res.data.data.birthDate),
    };
    return res.data.data;
  };

  const [otpPassed, setOtpPassed] = useState(false);
  const confirmOTP = async () => {
    const payload = {
      phoneNumber: getValues("phoneNumber"),
      otp: getValues("otp"),
    };
    try {
      const res = await authAPI.verifyOTP(payload);
      const { message, data } = res.data;
      if (message === "verify otp successfully") {
        setOtpPassed(true);
        resetField("newPassword");
        resetField("newPassword2");
        resetField("otp");
      }
    } catch (e) {
      setError("otp", { type: "incorrect", message: "OTP ผิด" });
    }
  };
  const reqOTP = async () => {
    const res = await authAPI.requestOTP(getValues("phoneNumber"));
  };

  const [changeSuccess, setChangeSuccess] = useState(false);
  const changePassword = async () => {
    if (getValues("newPassword") != getValues("newPassword2")) {
      setError("newPassword", {
        type: "notMatch",
        message: "รหัสผ่านไม่ตรงกัน",
      });
      setError("newPassword2", {
        type: "notMatch",
        message: "รหัสผ่านไม่ตรงกัน",
      });
      return;
    }

    try {
      const res = await userAPI.patchMe(
        { newPassword: getValues("newPassword") },
        token!
      );
      if (res.status === 200) {
        setChangeSuccess(true);
      }
    } catch (e) {}
  };

  const setSameAddress = () => {
    if (isSameAddress == false) {
      setIsSameAddress(true);
      setValue("currentAddressNumber", getValues("registrationAddressNumber"));
      setValue("currentVillageNumber", getValues("registrationVillageNumber"));
      setValue("currentRoad", getValues("registrationRoad"));
      setValue("currentAddress", getValues("registrationAddress"));
      setValue("currentSubDistrict", getValues("registrationSubDistrict"));
      setValue("currentDistrict", getValues("registrationDistrict"));
      setValue("currentProvince", getValues("registrationProvince"));
      setValue("currentPostalCode", getValues("registrationPostalCode"));
    } else {
      setIsSameAddress(false);
      resetField("currentAddressNumber");
      resetField("currentVillageNumber");
      resetField("currentRoad");
      resetField("currentAddress");
      resetField("currentSubDistrict");
      resetField("currentDistrict");
      resetField("currentProvince");
      resetField("currentPostalCode");
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={onSubmit}
        className="bg-slate-50 p-6 md:rounded-xl h-full border flex flex-col gap-8"
      >
        <div className="flex gap-4 items-center px-4 py-2  rounded-xl bg-orange-100">
          <FiUser className="text-orange-400" />
          <p className="text-orange-400">ข้อมูลส่วนตัว</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-8 items-center">
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

          <Dialog onOpenChange={(open) => setOtpPassed(false)}>
            <DialogTrigger asChild>
              <a className="pt-4 text-sm text-primary underline text-right">
                เปลี่ยน
              </a>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader className="gap-8">
                <DialogTitle>เปลี่ยนรหัสผ่าน</DialogTitle>
              </DialogHeader>
              <DialogDescription>
                {!otpPassed ? (
                  <div className="flex flex-col gap-4">
                    <div className="flex items-end gap-4">
                      <InputWithLabel
                        type="string"
                        name="phoneNumber"
                        label="โทรศัพท์"
                        disabled
                      />
                      <Button onClick={reqOTP} variant="outline">
                        ขอ OTP
                      </Button>
                    </div>
                    <InputWithLabel type="string" name="otp" label="OTP" />
                    <Button onClick={confirmOTP}>ยืนยัน OTP</Button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {!changeSuccess ? (
                      <>
                        <InputWithLabel
                          type="password"
                          name="newPassword"
                          label="รหัสผ่านใหม่"
                          rule={{ required: true, minLength: 8 }}
                        />
                        <InputWithLabel
                          type="password"
                          name="newPassword2"
                          label="ยืนยันรหัสผ่านใหม่"
                          rule={{ required: true, minLength: 8 }}
                        />
                        <Button onClick={changePassword}>ยืนยัน</Button>
                      </>
                    ) : (
                      <div className="flex flex-col gap-4 items-center">
                        <FaCheckCircle className="w-16 h-16 text-green-500" />
                        <p>เปลี่ยนสำเร็จ</p>
                      </div>
                    )}
                  </div>
                )}
              </DialogDescription>
            </DialogContent>
          </Dialog>
        </div>
        <span className="w-full h-[1px] bg-slate-200"></span>

        <div className="grid sm:grid-cols-3 gap-8">
          <InputWithLabel
            type="string"
            name="titleTh"
            label="คำนำหน้าชื่อ"
            rule={{ required: true }}
          />
          <InputWithLabel
            type="string"
            name="firstNameTh"
            label="ชื่อ (ภาษาไทย)"
            rule={{ required: true }}
          />
          <InputWithLabel
            type="string"
            name="lastNameTh"
            label="นามสกุล (ภาษาไทย)"
            rule={{ required: true }}
          />
          <InputWithLabel
            type="string"
            name="firstNameEn"
            label="ชื่อ (ภาษาอังกฤษ)"
            rule={{ required: true }}
          />
          <InputWithLabel
            type="string"
            name="lastNameEn"
            label="นามสกุล (ภาษาอังกฤษ)"
            rule={{ required: true }}
          />
          <InputWithLabel
            type="string"
            name="citizenId"
            label="หมายเลขบัตรประจำตัวประชาชน"
            maxLength={13}
            rule={{
              required: true,
              maxLength: 13,
              pattern: {
                value: /^[1-9]\d*$/,
                message: "กรุณากรอกข้อมูลให้ถูกต้อง",
              },
            }}
          />
          <InputWithLabel
            type="string"
            name="phoneNumber"
            label="โทรศัพท์"
            maxLength={10}
            rule={{
              required: true,
              maxLength: 10,
              pattern: {
                value: /^[0-9]\d*$/,
                message: "กรุณากรอกข้อมูลให้ถูกต้อง",
              },
            }}
          />
          <CalendarInput
            label="วันเกิด"
            id="birthDate"
            required
            asSingle
            errors={errors}
          />
          <InputWithLabel
            type="string"
            name="nation"
            label="สัญชาติ"
            rule={{ required: true }}
          />
          <InputWithLabel
            type="string"
            name="religion"
            label="ศาสนา"
            rule={{ required: true }}
          />
        </div>

        <div className="flex gap-4 items-center px-4 py-2  rounded-xl bg-blue-100">
          <FiHome className="text-blue-600" />
          <p className="text-blue-600">ที่อยู่ตามทะเบียนบ้าน</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-8">
          <InputWithLabel
            type="string"
            name="registrationAddressNumber"
            label="บ้านเลขที่"
            rule={{ required: true }}
          />
          <InputWithLabel
            type="string"
            name="registrationVillageNumber"
            label="หมู่"
            rule={{ required: true }}
          />
          <InputWithLabel
            type="string"
            name="registrationRoad"
            label="ถนน"
            rule={{ required: true }}
          />
          <InputWithLabel
            type="string"
            name="registrationSubDistrict"
            label="แขวง/ตำบล"
            rule={{ required: true }}
          />
          <InputWithLabel
            type="string"
            name="registrationDistrict"
            label="เขต/อำเภอ"
            rule={{ required: true }}
          />
          <InputWithLabel
            type="string"
            name="registrationProvince"
            label="จังหวัด"
            rule={{ required: true }}
          />
          <InputWithLabel
            type="string"
            name="registrationPostalCode"
            label="รหัสไปรษณีย์"
            maxLength={6}
            rule={{ required: true, maxLength: 6 }}
          />
        </div>

        <div className="flex gap-4 items-center px-4 py-2  rounded-xl bg-green-100">
          <FiHome className="text-green-700" />
          <p className="text-green-700">ที่อยู่ปัจจุบัน</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-8">
          <CheckboxWithText
            label="ที่อยู่ตามทะเบียนบ้าน"
            id="isSameAddress"
            value={isSameAddress}
            className="sm:col-span-3"
            onChange={setSameAddress}
          />
          {!isSameAddress && (
            <>
              <InputWithLabel
                type="string"
                name="currentAddressNumber"
                label="บ้านเลขที่"
                rule={{ required: true }}
              />
              <InputWithLabel
                type="string"
                name="currentVillageNumber"
                label="หมู่บ้าน"
                rule={{ required: true }}
              />
              <InputWithLabel
                type="string"
                name="currentRoad"
                label="ถนน"
                rule={{ required: true }}
              />
              <InputWithLabel
                type="string"
                name="currentSubDistrict"
                label="แขวง/ตำบล"
                rule={{ required: true }}
              />
              <InputWithLabel
                type="string"
                name="currentDistrict"
                label="เขต/อำเภอ"
                rule={{ required: true }}
              />
              <InputWithLabel
                type="string"
                name="currentProvince"
                label="จังหวัด"
                rule={{ required: true }}
              />
              <InputWithLabel
                type="string"
                name="currentPostalCode"
                label="รหัสไปรษณีย์"
                maxLength={6}
                rule={{ required: true, maxLength: 6 }}
              />
            </>
          )}
        </div>

        <div className="w-full flex items-center justify-center gap-8">
          <ConfirmationDialog
            open={open}
            icon={confirmDialog.icon}
            desc={confirmDialog.desc}
            confirmText={confirmDialog.confirmText}
            cancelText={confirmDialog.cancelText}
            onConfirm={confirmDialog.onConfirm}
            onCancel={confirmDialog.onCancel}
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
