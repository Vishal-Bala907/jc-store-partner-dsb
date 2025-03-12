import React from "react";
import WeeklySales from "./WeeklySales";
import WeeklyOrders from "./WeeklyOrders";

const Charts = () => {
  return (
    <div className="bg-white my-9 mx-10 justify-center flex flex-row gap-3 flex-wrap rounded-2xl">
      <WeeklySales />
      <WeeklyOrders />
    </div>
  );
};

export default Charts;
