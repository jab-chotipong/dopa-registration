"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";
import { FieldValues, RegisterOptions, useFormContext } from "react-hook-form";
import { handleErrors } from "../_lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface InputWithLabelProps {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  className?: string;
  color?: string;
  disabled?: boolean;
  rule?: RegisterOptions<FieldValues, string> | undefined;
}

export function InputWithLabel({ ...props }: InputWithLabelProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={`grid w-full items-center gap-1.5 ${props.className}`}>
      {props.label && (
        <div className="flex items-center justify-between">
          <Label
            className={`${
              props.color ? props.color : "text-slate-700"
            } text-start ml-2`}
            htmlFor={props.name}
          >
            {props.label}
          </Label>
          {errors[props.name] && (
            <p className="text-[12px] text-left text-red-500">
              {handleErrors(errors[props.name]?.type)}
            </p>
          )}
        </div>
      )}
      <Input
        type={props.type}
        {...register(props.name, props.rule)}
        id={props.name}
        disabled={props.disabled}
        placeholder={props.placeholder}
        className="bg-slate-50"
      />
    </div>
  );
}
