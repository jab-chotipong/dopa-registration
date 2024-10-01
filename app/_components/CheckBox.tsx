"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Controller, useFormContext } from "react-hook-form";

type CheckBoxProps = {
  id: string;
  label: string;
  className?: string;
  onChange?: (e: any) => void;
};

export function CheckboxWithText({
  id,
  label,
  className,
  onChange,
}: CheckBoxProps) {
  const { register, control } = useFormContext();

  return (
    <Controller
      control={control}
      name={id}
      render={({ field }) => (
        <div className={`items-top flex space-x-2 ${className}`}>
          <Checkbox
            id={id}
            checked={field.value}
            className="border-slate-300"
            onCheckedChange={field.onChange}
            defaultChecked={false}
          />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor={id}
              className="text-sm text-slate-800 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {label}
            </label>
          </div>
        </div>
      )}
    />
  );
}
