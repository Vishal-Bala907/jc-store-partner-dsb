"use client";
import React, { useEffect, useState } from "react";
import RiderDetails from "./RiderDetails";
import { getAllRidersOfTheStore } from "../../server/routes";
import ScaleLoaderSpinner from "../spinners/ScaleLoaderSpinner";
import NotFoundPage from "../not-found/NotFoundPage";

const RiderWrapper = () => {
  const [riders, setRiders] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const user = localStorage.getItem("jc-store-partner");
    if (user) {
      const USER = JSON.parse(user);
      setLoading(true);
      getAllRidersOfTheStore(USER.partner._id)
        .then((data) => setRiders(data))
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
      // setRiders(USER.partner.riders);
    } else {
      toast.warn("please login first");
      router.push("/");
    }
  }, []);

  if (loading) {
    return <ScaleLoaderSpinner />;
  }

  if (!riders || riders.length < 1) {
    return <NotFoundPage message="No Riders found" />;
  }

  return (
    <div className="mx-10 bg-white">
      <div className="w-[100%] h-[100%] min-h-screen flex flex-wrap gap-4 justify-center items-start ">
        {riders.map((rider, index) => {
          return <RiderDetails key={index} rider={rider} />;
        })}
      </div>
    </div>
  );
};

export default RiderWrapper;
