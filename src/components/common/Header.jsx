import React from "react";
// import logo from "/img/logo/lg.png";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
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
            <a href="#">Orders</a>
          </li>
          <li>
            <a href="#">Profile Image</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
