"use client";
import React, { useState } from "react";
import Order from "./Order";
import orders from "../../layouts/orders";

const Orders = ({ count }) => {
  const countArray = Object.values(count);
  // console.log(countArray);

  const [data, setData] = useState(countArray);
  console.log(data);

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5 mx-10">
      {orders.map((item, index) => {
        console.log(index);

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
