"use client";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputWithLabel } from "./InputWithLabel";

interface FormInputProps {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  color?: string;
  className?: string;
  placeholder?: string;
}

const FormInput = ({ ...props }: FormInputProps) => {
  const { register } = useFormContext();

  return <InputWithLabel {...register(props.name)} {...props} />;
};

export default FormInput;
