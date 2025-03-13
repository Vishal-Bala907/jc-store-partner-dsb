"use client";
import React from "react";
// import logo from "/img/logo/lg.png";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaRegUserCircle } from "react-icons/fa";
import { IoMdExit } from "react-icons/io";

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
      <nav className="bg-customPink py-4  mx-10">
        <ul className="flex lg:justify-end justify-center items-center gap-5 mx-3 ">
          <li>
            <Image src={"/img/logo/lg.png"} alt="logo" width={50} height={50} />
          </li>
          <li className="hover:underline">
            <Link href="/dashboard">DashBoard</Link>
          </li>
          <li className="hover:underline">
            <Link href="/add-rider-form">Add Rider</Link>
          </li>

          <li className="hover:underline">
            <Link href="/orders">Orders</Link>
          </li>
          <li className="hover:underline">
            <Link href="/riders">Our Riders</Link>
          </li>
          <li
            className=" hover:cursor-pointer flex  gap-1 flex-row items-center justify-center "
            title="Login / Profile"
          >
            <Link href="/profile">Profile</Link>
            <FaRegUserCircle />
          </li>
          <li>
            <button
              className="hover:cursor-pointer flex  gap-1 flex-row items-center justify-center"
              title="Logout"
              onClick={handleLogOut}
            >
              Logout
              <IoMdExit />
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
