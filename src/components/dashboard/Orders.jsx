import React from "react";
import Order from "./Order";
import orders from "../../layouts/orders";

const Orders = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 mx-10">
      {orders.map((item, index) => {
        return <Order key={index} icon={item.icon} text={item.text} qty={0} />;
      })}
    </div>
  );
};

export default Orders;
