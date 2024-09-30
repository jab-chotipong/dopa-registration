"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { useFormContext } from "react-hook-form";

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
  const { register } = useFormContext();

  return (
    <div className={`items-top flex space-x-2 ${className}`}>
      <Checkbox
        id={id}
        className="border-slate-300"
        onCheckedChange={onChange}
        {...register(id)}
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
  );
}
