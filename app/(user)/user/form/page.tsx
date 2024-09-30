"use client";
import React from "react";
import { InputWithLabel } from "@/app/_components/InputWithLabel";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckboxWithText } from "@/app/_components/CheckBox";
import { InputFile } from "@/app/_components/InputFile";
import { Button } from "@/components/ui/button";
import { FormProvider, useForm } from "react-hook-form";

const Page = () => {
  const methods = useForm();
  const { handleSubmit } = methods;
  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <p className="pl-4">คำร้องขอมีบัตร</p>
        <div className="bg-slate-50 p-6 rounded-xl h-full border flex flex-col gap-8">
          <p>รับราชการ/ปฏิบัติงานสังกัด</p>
          <div className="grid grid-cols-3 gap-8">
            <InputWithLabel
              type="string"
              name="departmentName"
              label="ชื่อหน่วยงาน"
            />
            <InputWithLabel
              type="string"
              name="departmentDistrict"
              label="อำเภอ"
            />
            <InputWithLabel
              type="string"
              name="departmentProvince"
              label="จังหวัด"
            />
            <InputWithLabel type="string" name="position" label="ตำแหน่ง" />
            <InputWithLabel type="string" name="level" label="ระดับ" />
            <InputWithLabel type="string" name="classNumber" label="รุ่นที่" />
            <InputWithLabel
              type="string"
              name="trainingDate"
              label="วันที่อบรม"
            />
          </div>

          <span className="w-full h-[1px] bg-slate-200"></span>

          <p>ความประสงค์</p>
          <RadioGroup className="flex gap-16" defaultValue="first">
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="first"
                id="r1"
                className="border-slate-400"
              />
              <Label className="font-normal text-slate-800" htmlFor="r1">
                ขอมีบัตรครั้งแรก
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="new"
                id="r2"
                className="border-slate-400"
              />
              <Label className="font-normal text-slate-800" htmlFor="r2">
                ขอบัตรใหม่
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="change"
                id="r3"
                className="border-slate-400"
              />
              <Label className="font-normal text-slate-800" htmlFor="r3">
                ขอเปลี่ยนบัตร
              </Label>
            </div>
          </RadioGroup>

          <span className="w-full h-[1px] bg-slate-200"></span>

          <p>เหตุผล</p>
          <div className="grid grid-cols-4 gap-8 items-center">
            <CheckboxWithText
              id="expired"
              onChange={(e) => {
                console.log(e);
              }}
              label="บัตรหมดอายุ"
            />
            <CheckboxWithText id="destroyed" label="บัตรหายหรือถูกทำลาย" />
            <CheckboxWithText id="broken" label="บัตรชำรุด" />
            <CheckboxWithText id="renamed" label="เปลี่ยนชื่อ" />
            <CheckboxWithText id="resurnamed" label="เปลี่ยนนามสกุล" />
            <CheckboxWithText id="refullnamed" label="เปลี่ยนชื่อและนามสกุล" />
            <CheckboxWithText id="others" label="อื่นๆ(โปรดระบุ)" />
            <InputWithLabel type="string" name="others" />
          </div>

          <span className="w-full h-[1px] bg-slate-200"></span>

          <p>เอกสาร</p>
          <div className="grid grid-cols-2 gap-8">
            <InputFile label="สำเนาบัตรประชาชน" id="ident-no" />
            <InputFile label="รูปถ่ายขนาด 1 นิ้ว" id="picture" />
            <InputFile
              label="สำเนาประกาศนียบัตรผู้ผ่านการฝึกอบรมหลักสูตร"
              id="certificate"
            />
            <InputFile label="หนังสือรับรองจากต้นสังกัด" id="referal-letter" />
            <InputFile label="สำเนาบัตรประจำเครื่องวิทยุ (ถ้ามี)" id="reg-id" />
            <InputFile label="เอกสารแจ้งความบัตรสูญหาย (ถ้ามี)" id="missing" />
            <InputWithLabel
              label="ข้อมูลเพิ่มเติม"
              name="additional"
              placeholder="ข้อมูลเพิ่มเติม..."
            />
          </div>

          <span className="w-full h-[1px] bg-slate-200"></span>

          <p>เลือกที่อยู่จัดส่ง</p>
          <RadioGroup
            className="grid grid-cols-2 gap-16"
            defaultValue="registration-addr"
          >
            <div className="w-full flex flex-col gap-4 p-4 rounded-lg border border-slate-300">
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="registration-addr"
                  id="registration-addr"
                  className="border-slate-400"
                />
                <Label
                  className="font-normal text-slate-800"
                  htmlFor="registration-addr"
                >
                  ที่อยู่ตามทะเบียนบ้าน
                </Label>
              </div>
              <span className="w-full h-[1px] bg-slate-200"></span>
              <div>
                <p className="text-sm text-slate-700">
                  ที่อยู่ : Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Consectetur, fugiat.
                </p>
              </div>
            </div>

            <div className="w-full flex flex-col gap-4 p-4 rounded-lg border border-slate-300">
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="current-addr"
                  id="current-addr"
                  className="border-slate-400"
                />
                <Label
                  className="font-normal text-slate-800"
                  htmlFor="current-addr"
                >
                  ที่อยู่ปัจจุบัน
                </Label>
              </div>
              <span className="w-full h-[1px] bg-slate-200"></span>
              <div>
                <p className="text-sm text-slate-700">
                  ที่อยู่ : Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Consectetur, fugiat.
                </p>
              </div>
            </div>
          </RadioGroup>

          <div className="w-full flex items-center justify-center gap-8">
            <Button className="w-28" variant="outline">
              ยกเลิก
            </Button>
            <Button className="w-28">บันทึกข้อมูล</Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default Page;
