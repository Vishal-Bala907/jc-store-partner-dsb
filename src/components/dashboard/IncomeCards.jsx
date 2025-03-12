import React from "react";
import income from "../../layouts/incomecard";
import IncomeCard from "./IncomeCard";
const IncomeCards = () => {
  return (
    <div className="flex flex-row justify-center items-center gap-6 my-9 mx-10 flex-wrap">
      {income.map((item, index) => {
        return (
          <IncomeCard
            key={index}
            color={item.color}
            icon={item.icon}
            text={item.text}
            price={0}
          />
        );
      })}
    </div>
  );
};

export default IncomeCards;
