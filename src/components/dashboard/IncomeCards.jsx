"use client";
import React, { useState } from "react";
import income from "../../layouts/incomecard";
import IncomeCard from "./IncomeCard";
const IncomeCards = ({ icm }) => {
  // console.log(Object.values(icm));

  const [data, setData] = useState(Object.values(icm));
  console.log(data);

  return (
    <div className="flex flex-row justify-center items-center gap-6 my-9 mx-10 flex-wrap">
      {income.map((item, index) => {
        return (
          <IncomeCard
            key={index}
            color={item.color}
            icon={item.icon}
            text={item.text}
            price={data[index]}
          />
        );
      })}
    </div>
  );
};

export default IncomeCards;
