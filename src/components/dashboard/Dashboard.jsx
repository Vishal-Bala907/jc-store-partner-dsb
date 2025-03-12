import React from "react";
import IncomeCards from "./IncomeCards";
import Orders from "./Orders";
import Charts from "./Charts";
import OrderTable from "./RecentUser";
// import IncomeCards from "./IncomeCard";

const Dashboard = () => {
  return (
    <div>
      <IncomeCards />
      <Orders />
      <Charts />
      <OrderTable />
    </div>
  );
};

export default Dashboard;
