"use client";
import React, { useState } from "react";
import Order from "./Order";
import orders from "../../layouts/orders";

const Orders = ({ count }) => {
  const countArray = Object.values(count);

  const [data, setData] = useState(countArray);
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 mx-10">
      {orders.map((item, index) => {
        return (
          <Order
            key={index}
            icon={item.icon}
            text={item.text}
            qty={data[index]}
          />
        );
      })}
    </div>
  );
};

export default Orders;
