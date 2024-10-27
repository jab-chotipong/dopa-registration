"use client";
import { Button } from "@/components/ui/button";
import { InputWithLabel } from "../../_components/InputWithLabel";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { FormProvider } from "react-hook-form";
import { _post } from "@/app/_lib/apis/api";
import { useEffect, useState } from "react";
import Spinner from "@/app/_components/Spinner";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { authAPI } from "@/app/_lib/apis/auth";
import { userAPI } from "@/app/_lib/apis/user";
import { FaCheckCircle } from "react-icons/fa";

const Page = () => {
  const router = useRouter();
  const methods = useForm();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  const {
    handleSubmit,
    setError,
    getValues,
    resetField,
    formState: { errors },
  } = methods;
  const [isLoginSuccess, setIsLoginSuccess] = useState<boolean>(false);
  const onSubmit = handleSubmit(async (data) => {
    if (changeSuccess) router.push("/login");
    if (!otpPassed) {
      confirmOTP();
    } else {
      changePassword();
    }
  });

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
        localStorage.setItem("accessToken", res.data.data.accessToken);
        localStorage.setItem("refreshToken", res.data.data.refreshToken);
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
        <h3 className="text-2xl font-bold text-blue-700 mb-8">
          เปลี่ยนรหัสผ่าน
        </h3>
        {!otpPassed ? (
          <div className="w-full xl:w-2/3 flex flex-col gap-4">
            <div className="flex gap-4 items-end">
              <InputWithLabel
                rule={{ required: true }}
                type="string"
                name="phoneNumber"
                label="เบอร์โทรศัพท์"
              />
              <Button onClick={reqOTP} type="button" variant="outline">
                ขอ OTP
              </Button>
            </div>

            <InputWithLabel
              rule={{ required: true }}
              type="string"
              name="otp"
              label="OTP"
            />
            <Link
              href="/login"
              className="text-primary text-sm self-end underline"
            >
              เข้าสู่ระบบ
            </Link>
          </div>
        ) : (
          <>
            {changeSuccess ? (
              <>
                <FaCheckCircle className="w-16 h-16 text-green-500" />
                <p>เปลี่ยนสำเร็จ</p>
              </>
            ) : (
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
              </>
            )}
          </>
        )}
        <Button type="submit" className="w-full xl:w-2/3">
          {changeSuccess ? "เข้าสู่ระบบ" : "ยืนยัน"}
        </Button>
      </form>
    </FormProvider>
  );
};

export default Page;
