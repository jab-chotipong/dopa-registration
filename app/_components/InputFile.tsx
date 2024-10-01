import { useFormContext } from "react-hook-form";
import { GoPlusCircle } from "react-icons/go";

type InputFileProps = {
  label: string;
  name: string;
};

export function InputFile(props: InputFileProps) {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const file = watch(props.name);

  return (
    <div className="text-blue-800 w-full flex flex-col gap-4 border border-slate-300 p-4 rounded-lg">
      <p>{props.label}</p>
      <label
        htmlFor={props.name}
        className="flex gap-4 items-center w-full bg-slate-200 p-2 rounded-lg justify-center border border-dashed border-blue-800"
      >
        {file[0] ? (
          <p className="text-blue-800">{file[0]?.name}</p>
        ) : (
          <>
            <GoPlusCircle className="w-5 h-5" />
            <p className="text-blue-800">เพิ่ม{props.label}</p>
          </>
        )}
        <input
          id={props.name}
          type="file"
          className="hidden"
          {...register(props.name)}
        />
      </label>
    </div>
  );
}
