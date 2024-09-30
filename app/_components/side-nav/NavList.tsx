import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ReactNode } from "react";

interface NavListProps {
  link: any;
  text: string;
  icon: ReactNode;
  selected?: boolean;
}

const NavList = ({ link, text, icon }: NavListProps) => {
  const searchParams = useSearchParams();
  const selected = searchParams.get("state");
  const pathname = usePathname();

  const handleSelectedList = () => {
    if (selected && selected == link.query?.state) {
      return "bg-primary text-white";
    } else if (!selected && pathname == link.href) {
      return "bg-primary text-white";
    } else {
      return "hover:bg-slate-100";
    }
  };

  return (
    <Link
      href={{ pathname: link.href, query: link.query }}
      className={`flex gap-2 pointer items-center justify-start py-4 px-2 text-sm rounded ${handleSelectedList()}`}
    >
      {icon}
      <p>{text}</p>
    </Link>
  );
};

export default NavList;
