"use client";
import React, { useEffect, useState } from "react";
import RiderDetails from "./RiderDetails";

const RiderWrapper = () => {
  const [riders, setRiders] = useState([]);
  useEffect(() => {
    const user = localStorage.getItem("jc-store-partner");
    if (user) {
      const USER = JSON.parse(user);
      setRiders(USER.partner.riders);
    } else {
      toast.warn("please login first");
      router.push("/");
    }
  }, []);
  if (riders && riders.length < 1) {
    return (
      <div className="min-h-screen w-[100%] flex justify-center items-center text-5xl">
        No Riders Yet ☹️☹️
      </div>
    );
  }

  return (
    <div className="mx-10 bg-white">
      <div className="w-[100%] h-[100%] min-h-screen flex justify-start items-start">
        {riders.map((rider, index) => {
          return <RiderDetails key={index} rider={rider} />;
        })}
      </div>
    </div>
  );
};

export default RiderWrapper;
