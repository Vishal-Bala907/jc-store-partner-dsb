"use client";
import React from "react";
// import logo from "/img/logo/lg.png";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const handleLogOut = () => {
    const user = localStorage.getItem("jc-store-partner");
    if (user) {
      localStorage.removeItem("jc-store-partner");
      router.push("/");
    } else {
      router.push("/");
    }
  };
  return (
    <header>
      <nav className="bg-[#72003f] py-4  mx-10">
        <ul className="flex lg:justify-end justify-center gap-5 mx-3 bg-[#72003f]">
          <li>
            <Image src={"/img/logo/lg.png"} alt="logo" width={50} height={50} />
          </li>
          <li className="hover:underline">
            <Link href="/dashboard">DashBoard</Link>
          </li>
          <li className="hover:underline">
            <Link href="/orders">Orders</Link>
          </li>
          <li className="hover:underline">
            <Link href="/riders">Our Riders</Link>
          </li>
          <li>
            <a href="#">Profile Image</a>
          </li>
          <li>
            <button className="hover:cursor-pointer" onClick={handleLogOut}>
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
