"use client";
import React, { useEffect } from "react";
// import logo from "/img/logo/lg.png";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaRegUserCircle } from "react-icons/fa";
import { IoMdExit } from "react-icons/io";
import socket from "../../utils/socket";
import { toast } from "react-toastify";

const Header = () => {
  const router = useRouter();
  useEffect(() => {
    const user = localStorage.getItem("jc-store-partner");
    if (!user) {
      toast.warn("please login first");
      router.push("/");
      return;
    }
    const USER = JSON.parse(user);
    toast.success(`Welcome ${USER.partner.name}`);
    console.log("socket");

    const handleOrderReceived = (data) => {
      if (USER.partner.pinCode === data.pincode) {
        toast.success(`🚀 New order received from ${data.user} `);
      }
    };

    socket.on("order-received", handleOrderReceived);

    return () => {
      socket.off("order-received", handleOrderReceived); // ✅ Cleanup listener on unmount
    };
  }, []);
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
      <nav className="bg-customPink py-4 mx-0  md:mx-10">
        <ul className="flex lg:justify-end justify-center items-center gap-5 mx-3 flex-wrap ">
          <li>
            <Image src={"/img/logo/lg.png"} alt="logo" width={50} height={50} />
          </li>
          <li className="hover:underline ">
            <Link href="/dashboard" className="text-white font-bold">
              DashBoard
            </Link>
          </li>
          <li className="hover:underline">
            <Link href="/add-rider-form" className="text-white font-bold">
              Add Rider
            </Link>
          </li>

          <li className="hover:underline">
            <Link href="/pending-orders" className="text-white font-bold">
              Pending Orders
            </Link>
          </li>
          <li className="hover:underline">
            <Link href="/orders" className="text-white font-bold">
              Orders
            </Link>
          </li>
          <li className="hover:underline">
            <Link href="/riders" className="text-white font-bold">
              Our Riders
            </Link>
          </li>
          <li
            className=" hover:cursor-pointer flex  gap-1 flex-row items-center justify-center "
            title="Login / Profile"
          >
            <Link href="/profile" className="text-white font-bold">
              {/* Profile */}
              <FaRegUserCircle className="text-white text-3xl" />
            </Link>
          </li>
          <li>
            <button
              className="hover:cursor-pointer flex  gap-1 flex-row items-center justify-center text-white font-bold"
              title="Logout"
              onClick={handleLogOut}
            >
              Logout
              <IoMdExit className="text-white text-3xl" />
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
