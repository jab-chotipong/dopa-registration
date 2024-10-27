"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { formAPI } from "@/app/_lib/apis/form";
import { InputWithLabel } from "@/app/_components/InputWithLabel";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckboxWithText } from "@/app/_components/CheckBox";
import { InputFile } from "@/app/_components/InputFile";
import { Button } from "@/components/ui/button";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { userAPI } from "@/app/_lib/apis/user";
import CalendarInput from "@/app/_components/CalendarInput";
import ConfirmationDialog from "@/app/_components/ConfirmationDialog";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { MdError } from "react-icons/md";
import { FaRegFilePdf } from "react-icons/fa";
import { fileAPI } from "@/app/_lib/apis/file";

const Page = () => {
  const router = useRouter();
  const { id } = useParams();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  const [open, setOpen] = useState<boolean>(false);
  const [confirmDialog, setConfirmDialog] = useState<any>({
    icon: null,
    desc: null,
    confirmText: "",
    cancelText: "",
    onConfirm: () => undefined,
    onCancel: () => undefined,
  });
  const methods = useForm({
    defaultValues: async () => await getForm(),
  });
  const { handleSubmit, control, getValues, setValue } = methods;
  const [address, setAddress] = useState({
    currentAddress: {
      addressNumber: "",
      villageNumber: "",
      road: "",
      subDistrict: "",
      district: "",
      province: "",
      postalCode: "",
    },
    registrationAddress: {
      addressNumber: "",
      villageNumber: "",
      road: "",
      subDistrict: "",
      district: "",
      province: "",
      postalCode: "",
    },
  });

  const onSubmit = handleSubmit(async (data: any) => {
    try {
      const res = await formAPI.updateFormStatus(
        token!,
        data.id,
        data.userId,
        data.status
      );
      if (res.status === 200) {
        setOpen(true);
        setConfirmDialog({
          icon: <IoIosCheckmarkCircle className="w-12 h-12 text-green-500" />,
          desc: "บันทึกสำเร็จ",
          confirmText: "กลับไปหน้าค้นหา",
          cancelText: "ปิด",
          onConfirm: () => router.push("/admin/form-request?status=submit"),
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

  const getPdf = () => {
    const res = formAPI.getPdf(btoa(id as string));
    window.open(res);
  };

  const getFile = (file: string) => {
    if (!getValues(file)) return;
    const res = fileAPI.getFile({
      id: btoa(getValues("userId")),
      fileName: getValues(file),
    });
    window.open(res);
  };

  const getForm = async () => {
    if (id === "request") return;
    const res = await formAPI.getFormById(id as string, token!);
    let data = res.data.data;
    data.trainingDate = {
      startDate: data.trainingDate,
      endDate: data.trainingDate,
    };
    console.log(data);
    return data;
  };

  useEffect(() => {
    getForm();
  }, []);
  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} className="flex flex-col gap-4 pt-4 md:pt-0">
        <p className="pl-4">
          {id === "request" ? "คำร้องขอมีบัตร" : "ข้อมูลฟอร์ม"}
        </p>
        <div className="grid grid-cols-3">
          <div className="bg-slate-50 p-6 rounded-l-xl h-full border-r flex flex-col gap-8 col-span-2">
            <div className="text-center">
              <p>แบบคำขอมีบัตรประจำตัวผู้ใช้เครื่องวิทยุคมนาคม</p>
              <p>
                ตามระเบียบกรมการปกครองว่าด้วยการสื่อสารกรมการปกครอง พ.ศ. ๒๕๕๘
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <InputWithLabel
                type="string"
                name="departmentName"
                label="ชื่อหน่วยงาน"
                disabled
              />
              <InputWithLabel
                type="string"
                name="departmentDistrict"
                label="อำเภอ"
                disabled
              />
              <InputWithLabel
                type="string"
                name="departmentProvince"
                label="จังหวัด"
                disabled
              />
              <InputWithLabel
                type="string"
                name="position"
                label="ตำแหน่ง"
                disabled
              />
              <InputWithLabel
                type="string"
                name="level"
                label="ระดับ"
                disabled
              />
              <InputWithLabel
                type="string"
                name="classNumber"
                label="รุ่นที่"
                disabled
              />
              <CalendarInput label="วันที่อบรม" id="trainingDate" disabled />
            </div>
            <span className="w-full h-[1px] bg-slate-200"></span>
            <p>ความประสงค์</p>
            <Controller
              control={control}
              name="formType"
              render={({ field }) => (
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="grid grid-cols-1 gap-8 sm:flex sm:gap-16"
                  disabled
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="first-time"
                      id="first-time"
                      className="border-slate-400"
                    />
                    <Label
                      className="font-normal text-slate-800"
                      htmlFor="first-time"
                    >
                      ขอมีบัตรครั้งแรก
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="new-card"
                      id="new-card"
                      className="border-slate-400"
                    />
                    <Label
                      className="font-normal text-slate-800"
                      htmlFor="new-card"
                    >
                      ขอบัตรใหม่
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="change-card"
                      id="change-card"
                      className="border-slate-400"
                    />
                    <Label
                      className="font-normal text-slate-800"
                      htmlFor="change-card"
                    >
                      ขอเปลี่ยนบัตร
                    </Label>
                  </div>
                </RadioGroup>
              )}
            />
            <span className="w-full h-[1px] bg-slate-200"></span>
            <p>เหตุผล</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 items-center">
              <CheckboxWithText
                id="isCardExpired"
                label="บัตรหมดอายุ"
                value={getValues("isCardExpired")}
                onChange={() =>
                  setValue("isCardExpired", !getValues("isCardExpired"))
                }
                disabled
              />
              <CheckboxWithText
                id="isCardLostorDestroy"
                label="บัตรหายหรือถูกทำลาย"
                value={getValues("isCardLostorDestroy")}
                onChange={() =>
                  setValue(
                    "isCardLostorDestroy",
                    !getValues("isCardLostorDestroy")
                  )
                }
                disabled
              />
              <CheckboxWithText
                id="isCardDestroy"
                label="บัตรชำรุด"
                value={getValues("isCardDestroy")}
                onChange={() =>
                  setValue("isCardDestroy", !getValues("isCardDestroy"))
                }
                disabled
              />
              <CheckboxWithText
                id="isChangeFirstName"
                label="เปลี่ยนชื่อ"
                value={getValues("isChangeFirstName")}
                onChange={() =>
                  setValue("isChangeFirstName", !getValues("isChangeFirstName"))
                }
                disabled
              />
              <CheckboxWithText
                id="isChangeLastName"
                label="เปลี่ยนนามสกุล"
                value={getValues("isChangeLastName")}
                onChange={() =>
                  setValue("isChangeLastName", !getValues("isChangeLastName"))
                }
                disabled
              />
              <CheckboxWithText
                id="isChangeFullName"
                label="เปลี่ยนชื่อและนามสกุล"
                value={getValues("isChangeFullName")}
                onChange={() =>
                  setValue("isChangeFullName", !getValues("isChangeFullName"))
                }
                disabled
              />
              <CheckboxWithText
                id="others"
                label="อื่นๆ(โปรดระบุ)"
                value={getValues("others")}
                onChange={() => setValue("others", !getValues("others"))}
                disabled
              />
              <InputWithLabel type="string" disabled name="otherReason" />
            </div>
            <span className="w-full h-[1px] bg-slate-200"></span>
            <p>เอกสาร</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <InputFile
                label="สำเนาบัตรประชาชน"
                name="copyCitizenId"
                disabled
                onClick={() => getFile("copyCitizenId")}
              />
              <InputFile
                label="รูปถ่ายขนาด 1 นิ้ว"
                name="image"
                disabled
                onClick={() => getFile("image")}
              />
              <InputFile
                label="สำเนาประกาศนียบัตรผู้ผ่านการฝึกอบรมหลักสูตร"
                name="copyTrainingClass"
                disabled
                onClick={() => getFile("copyTrainingClass")}
              />
              <InputFile
                label="หนังสือรับรองจากต้นสังกัด"
                name="departmentCertificate"
                disabled
                onClick={() => getFile("departmentCertificate")}
              />
              <InputFile
                label="สำเนาบัตรประจำเครื่องวิทยุ (ถ้ามี)"
                name="copyRadioCard"
                disabled
                onClick={() => getFile("copyRadioCard")}
              />
              <InputFile
                label="เอกสารแจ้งความบัตรสูญหาย (ถ้ามี)"
                name="policeReport"
                disabled
                onClick={() => getFile("policeReport")}
              />
              <InputWithLabel
                label="ข้อมูลเพิ่มเติม"
                name="remark"
                placeholder="ข้อมูลเพิ่มเติม..."
                disabled
              />
            </div>
            <span className="w-full h-[1px] bg-slate-200"></span>
            <p>เลือกที่อยู่จัดส่ง</p>
            <Controller
              control={control}
              name="deliveryChannel"
              render={({ field }) => (
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="grid grid-cols-2 gap-16"
                  disabled
                >
                  <div className="w-full flex flex-col gap-4 p-4 rounded-lg border border-slate-300">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="registration-address"
                        id="registration-address"
                        className="border-slate-400"
                      />
                      <Label
                        className="font-normal text-slate-800"
                        htmlFor="registration-address"
                      >
                        ที่อยู่ตามทะเบียนบ้าน
                      </Label>
                    </div>
                    <span className="w-full h-[1px] bg-slate-200"></span>
                    <div>
                      <p className="text-sm text-slate-700">
                        ที่อยู่ : ที่อยู่ :{" "}
                        {getValues("registrationAddressNumber")}{" "}
                        {getValues("registrationVillageNumber")}{" "}
                        {getValues("registrationRoad")}{" "}
                        {getValues("registrationSubDistrict")}{" "}
                        {getValues("registrationDistrict")}{" "}
                        {getValues("registrationProvince")}{" "}
                        {getValues("registrationPostalCode")}{" "}
                      </p>
                    </div>
                  </div>

                  <div className="w-full flex flex-col gap-4 p-4 rounded-lg border border-slate-300">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="current-address"
                        id="current-address"
                        className="border-slate-400"
                      />
                      <Label
                        className="font-normal text-slate-800"
                        htmlFor="current-address"
                      >
                        ที่อยู่ปัจจุบัน
                      </Label>
                    </div>
                    <span className="w-full h-[1px] bg-slate-200"></span>
                    <div>
                      <p className="text-sm text-slate-700">
                        ที่อยู่ : {getValues("currentAddressNumber")}{" "}
                        {getValues("currentVillageNumber")}{" "}
                        {getValues("currentRoad")}{" "}
                        {getValues("currentSubDistrict")}{" "}
                        {getValues("currentDistrict")}{" "}
                        {getValues("currentProvince")}{" "}
                        {getValues("currentPostalCode")}{" "}
                      </p>
                    </div>
                  </div>
                </RadioGroup>
              )}
            />
          </div>
          <div className="bg-slate-50 p-6 flex flex-col gap-8 rounded-r-xl">
            <p>รายละเอียดคำร้อง</p>
            <Controller
              control={control}
              name="status"
              render={({ field }) => (
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex flex-col gap-8"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="submit"
                      id="submit"
                      className="border-slate-400"
                    />
                    <Label
                      className="font-normal text-slate-800"
                      htmlFor="submit"
                    >
                      คำร้องใหม่
                    </Label>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="re-submit"
                        id="re-submit"
                        className="border-slate-400"
                      />
                      <Label
                        className="font-normal text-slate-800"
                        htmlFor="re-submit"
                      >
                        ขอข้อมูลเพิ่มเติม
                      </Label>
                    </div>
                    {getValues("status") === "re-submit" && (
                      <InputWithLabel
                        label=""
                        name="remark"
                        placeholder="ข้อมูลเพิ่มเติม..."
                      />
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="reject"
                      id="reject"
                      className="border-slate-400"
                    />
                    <Label
                      className="font-normal text-slate-800"
                      htmlFor="reject"
                    >
                      ปฏิเสธคำร้อง
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="waiting-print"
                      id="waiting-print"
                      className="border-slate-400"
                    />
                    <Label
                      className="font-normal text-slate-800"
                      htmlFor="waiting-print"
                    >
                      อนุมัติ อยู่ระหว่างรอพิมพ์
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="deliveried"
                      id="deliveried"
                      className="border-slate-400"
                    />
                    <Label
                      className="font-normal text-slate-800"
                      htmlFor="deliveried"
                    >
                      จัดส่งแล้ว
                    </Label>
                  </div>
                </RadioGroup>
              )}
            />
            <div className="flex gap-8 items-center justify-between">
              <Button type="button" variant="outline" onClick={() => getPdf()}>
                <FaRegFilePdf className="mr-2" />
                PDF
              </Button>
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
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default Page;
