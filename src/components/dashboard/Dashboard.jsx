"use client";
import React, { useEffect, useState } from "react";
import IncomeCards from "./IncomeCards";
import Orders from "./Orders";
import Charts from "./Charts";
import OrderTable from "./RecentUser";
import { getIncomeAndCountData } from "../../server/routes";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import ScaleLoaderSpinner from "../spinners/ScaleLoaderSpinner";
// import IncomeCards from "./IncomeCard";

const Dashboard = () => {
  const router = useRouter();
  const [dsbData, setDsbData] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const user = localStorage.getItem("jc-store-partner");
    if (!user) {
      toast.warn("please login first");
      router.push("/");
    }
    const USER = JSON.parse(user);
    setLoading(true);
    getIncomeAndCountData(USER.partner._id)
      .then((data) => setDsbData(data))
      .catch((err) => {
        toast.error(err.response.data.message);
      })
      .finally(() => setLoading(false));
  }, []);
  console.log(dsbData);

  return (
    <div>
      {loading ? (
        <ScaleLoaderSpinner />
      ) : (
        <>
          <IncomeCards icm={dsbData.income} />
          <Orders count={dsbData.orders} />
        </>
      )}

      <Charts />
      <OrderTable />
    </div>
  );
};

export default Dashboard;
