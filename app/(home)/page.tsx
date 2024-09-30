"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Home = () => {
  return (
    <div className="flex flex-col h-max items-center justify-center w-full text-center gap-4">
      <img
        src="dopa-icon.png"
        alt="DOPA Icon"
        className="object-cover h-1/2 w-1/2"
      />
      <h3 className="text-2xl font-bold text-blue-700">DOPA REGISTRATION</h3>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus
        unde, impedit eaque eum ratione sint exercitationem facilis nostrum ut
        saepe reiciendis dolores eveniet explicabo commodi nobis. Inventore
        incidunt nesciunt totam?
      </p>
      <div className="flex gap-4 mt-10">
        <Link href="/register">
          <Button className="w-28" variant="outline">
            สมัครสมาชิก
          </Button>
        </Link>
        <Link href="/login">
          <Button className="w-28">เข้าสู่ระบบ</Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
