"use client";
import React, { useEffect, useState } from "react";
import WeeklySales from "./WeeklySales";
import WeeklyOrders from "./WeeklyOrders";
import { getBestSeller } from "../../server/routes";
import { toast } from "react-toastify";
import ScaleLoaderSpinner from "../spinners/ScaleLoaderSpinner";

const Charts = () => {
  const [dsbData, setDsbData] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getBestSeller()
      .then((data) => {
        setDsbData(data.bestSellingProduct);
      })
      .catch((err) => {
        console.log(err);
        toast.error("someting went wrong");
      })
      .finally(() => setLoading(false));
  }, []);
  if (loading) {
    return <ScaleLoaderSpinner />;
  }
  return (
    <div className="bg-white my-9 mx-10 justify-center flex flex-row gap-3 flex-wrap rounded-2xl">
      {/* <WeeklySales /> */}
      <WeeklyOrders dsbData={dsbData} />
    </div>
  );
};

export default Charts;
