"use client";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import React, { useEffect, useState } from "react";
import { Controller, FieldError, useFormContext } from "react-hook-form";
import DatePicker, { DateValueType } from "react-tailwindcss-datepicker";

const CalendarInput = (props: any) => {
  const {
    id,
    label,
    required,
    errors,
    asSingle,
    placeholder = "วัน/เดือน/ปี",
  } = props;
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={id}
      rules={
        asSingle
          ? {
              validate: (v) =>
                (v != null && v.startDate != null) || "กรุณากรอกข้อมูล",
            }
          : { required: { value: required, message: "กรุณากรอกข้อมูล" } }
      }
      render={({ field }) => (
        <div className={`grid w-full items-center gap-1.5`}>
          {label && (
            <div className="flex items-center justify-between">
              <Label
                className={`${
                  props.color ? props.color : "text-slate-700"
                } text-start ml-2`}
                htmlFor={props.id}
              >
                {props.label}
              </Label>
              {errors && errors[id] && (
                <p className="text-[12px] text-left text-red-500">
                  {errors[id]?.message}
                </p>
              )}
            </div>
          )}
          <DatePicker
            primaryColor="blue"
            displayFormat="DD/MM/YYYY"
            inputClassName={`${
              props.disabled ? "text-gray-400" : ""
            } bg-slate-50 w-full border-none rounded px-3 placeholder-gray-500`}
            containerClassName="flex h-9 w-full rounded-md border border-input bg-transparent text-sm shadow-sm transition-colors relative"
            useRange={false}
            asSingle={asSingle}
            placeholder={placeholder}
            value={field.value}
            onChange={field.onChange}
            disabled={props.disabled}
          />
        </div>
      )}
    />
  );
};

export default CalendarInput;
