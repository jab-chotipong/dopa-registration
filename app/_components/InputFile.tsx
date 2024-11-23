import { useEffect } from "react";
import {
  FieldError,
  FieldValues,
  RegisterOptions,
  useFormContext,
} from "react-hook-form";
import { GoPlusCircle } from "react-icons/go";
import { IoMdClose } from "react-icons/io";

type InputFileProps = {
  label: string;
  name: string;
  disabled?: boolean;
  required?: boolean;
  isImage?: boolean;
  onClick?: () => void;
  rule?: RegisterOptions<FieldValues, string> | undefined;
};

export function InputFile(props: InputFileProps) {
  const {
    register,
    watch,
    setValue,
    setError,
    formState: { errors },
  } = useFormContext();

  const file = watch(props.name);

  const handleOnClick = () => {
    props.disabled && props.onClick && props.onClick();
  };

  const handleFileError = (type: any) => {
    switch (type) {
      case "required":
        return "กรุณาเพิ่มไฟล์";
      case "maximum":
        return "ขนาดไฟล์เกิน 2 MB";
      case "acceptedFormats":
        return "กรุณาใส่รูปภาพให้ถูกต้อง";
      default:
        return "";
    }
  };

  return (
    <div
      className="text-blue-800 w-full flex flex-col gap-4 border border-slate-300 p-4 rounded-lg relative"
      onClick={handleOnClick}
    >
      <p>{props.label}</p>
      <label
        htmlFor={props.name}
        className="flex gap-4 items-center w-full bg-slate-200 p-2 rounded-lg justify-center border border-dashed overflow-hidden whitespace-nowrap text-ellipsis border-blue-800 relative"
      >
        {file && file[0] ? (
          <p className="text-blue-800 text-ellipsis overflow-hidden">
            {file[0]?.name}
          </p>
        ) : (
          <>
            <GoPlusCircle className="w-5 h-5" />
            <p className="text-blue-800 text-ellipsis overflow-hidden">
              เพิ่ม{props.label}
            </p>
          </>
        )}
        {typeof file === "string" ? (
          <p className="text-ellipsis overflow-hidden">{file}</p>
        ) : (
          <>
            <input
              id={props.name}
              disabled={props.disabled}
              type="file"
              className="hidden"
              {...register(props.name, {
                required: props.required,
                validate: {
                  maximum: (v) => {
                    if (v?.length > 0)
                      return v[0]?.size < 2097152 || "ขนาดไฟล์เกิน 2 MB";
                  },
                  acceptedFormats: (files) => {
                    if (file?.length > 0)
                      return (
                        ["image/jpeg", "image/png", "image/jpg"].includes(
                          files[0]?.type
                        ) || "กรุณาใส่รูปในนามสกุล jpeg, png"
                      );
                  },
                },
              })}
            />
          </>
        )}
      </label>
      {errors[props.name] && (
        <p className="text-[12px] absolute top-[-16px] right-0 text-red-500">
          {handleFileError(errors[props.name]?.type)}
        </p>
      )}
      {file?.length > 0 && !props.disabled && (
        <IoMdClose
          onClick={() => {
            setValue(props.name, null);
          }}
          className="absolute right-4 cursor-pointer"
        />
      )}
    </div>
  );
}
