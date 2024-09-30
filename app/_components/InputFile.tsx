import { GoPlusCircle } from "react-icons/go";

type InputFileProps = {
  label: string;
  id?: string;
};

export function InputFile({ label, id }: InputFileProps) {
  return (
    <div className="text-blue-800 w-full flex flex-col gap-4 border border-slate-300 p-4 rounded-lg">
      <p>{label}</p>
      <div className="flex gap-4 items-center w-full bg-slate-200 p-2 rounded-lg justify-center border border-dashed border-blue-800">
        <GoPlusCircle className="w-5 h-5" />
        <label className="text-blue-800" htmlFor={id}>
          เพิ่ม{label}
        </label>
        <input id={id} type="file" className="hidden" />
      </div>
    </div>
  );
}
