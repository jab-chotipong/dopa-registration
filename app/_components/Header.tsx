import { FaUserCircle } from "react-icons/fa";

const Header = () => {
  return (
    <div className="w-full z-10 bg-slate-100 h-[7vh] flex items-center justify-center sticky top-0">
      <div className="flex justify-between items-center max-w-7xl w-full h-full px-2 py-1">
        <div className="flex gap-4 items-center justify-center">
          <img src="/dopa-icon.png" className="w-12 h-12" alt="DOPA Icon" />
          <p className="text-primary text-xl">กรมการปกครอง</p>
        </div>
        <div className="flex justify-center items-center gap-4">
          <FaUserCircle className="w-6 h-6" />
          <p>Lorem Ipsum</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
