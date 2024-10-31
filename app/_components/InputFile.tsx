import { useEffect } from "react";
import { FieldValues, RegisterOptions, useFormContext } from "react-hook-form";
import { GoPlusCircle } from "react-icons/go";

type InputFileProps = {
  label: string;
  name: string;
  disabled?: boolean;
  required?: boolean;
  onClick?: () => void;
  rule?: RegisterOptions<FieldValues, string> | undefined;
};

export function InputFile(props: InputFileProps) {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const file = watch(props.name);

  const handleOnClick = () => {
    props.disabled && props.onClick && props.onClick();
  };

  return (
    <div
      className="text-blue-800 w-full flex flex-col gap-4 border border-slate-300 p-4 rounded-lg relative"
      onClick={handleOnClick}
    >
      <p>{props.label}</p>
      <label
        htmlFor={props.name}
        className="flex gap-4 items-center w-full bg-slate-200 p-2 rounded-lg justify-center border border-dashed border-blue-800"
      >
        {file && file[0] ? (
          <p className="text-blue-800">{file[0]?.name}</p>
        ) : (
          <>
            <GoPlusCircle className="w-5 h-5" />
            <p className="text-blue-800">เพิ่ม{props.label}</p>
          </>
        )}
        {typeof file === "string" ? (
          <p>{file}</p>
        ) : (
          <input
            id={props.name}
            disabled={props.disabled}
            type="file"
            className="hidden"
            {...register(props.name, { required: props.required })}
          />
        )}
      </label>
      {errors[props.name] && (
        <p className="text-[12px] absolute top-[-16px] right-0 text-red-500">
          กรุณาเพิ่มไฟล์
        </p>
      )}
    </div>
  );
}
