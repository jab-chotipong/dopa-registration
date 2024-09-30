import { useSearchParams } from "next/navigation";
import React from "react";

interface AdminFilterProps {
  text: string;
  color: string;
  value: number;
  icon: React.ReactNode;
  isSelected: boolean;
  onClick: () => void;
}

const getTextColor = (color: string) => {
  switch (color) {
    case "blue":
      return "bg-blue-100";
    case "orange":
      return "bg-orange-100";
    case "green":
      return "bg-green-100";
    case "yellow":
      return "bg-yellow-100";
    case "purple":
      return "bg-purple-100";
    case "red":
      return "bg-red-100";
    default:
      return "bg-white";
  }
};

const AdminFilter = ({
  text,
  color,
  value,
  icon,
  isSelected,
  onClick,
}: AdminFilterProps) => {
  return (
    <div
      className={`${
        isSelected ? "border-blue-400 border" : ""
      } bg-slate-50 w-full h-28 flex flex-col justify-between rounded-xl p-3 text-md`}
      onClick={onClick}
    >
      <p className="text-sm">{text}</p>
      <div className="flex items-center justify-between px-1">
        <p className="text-2xl">{value}</p>
        <div
          className={`w-8 h-8 flex items-center justify-center rounded-md ${getTextColor(
            color
          )}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
};

export default AdminFilter;
