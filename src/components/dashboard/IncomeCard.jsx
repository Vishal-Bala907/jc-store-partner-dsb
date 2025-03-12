import React from "react";
import income from "../../layouts/incomecard";

const IncomeCard = ({ color, icon, text, price }) => {
  return (
    <div
      className={`bg-[#${color}] rounded-lg p-4 flex flex-col items-center justify-center gap-4 flex-auto `}
      style={{
        backgroundColor: `#${color}`,
      }}
    >
      <img src={icon} alt="icon" />
      <h1 className="text-2xl font-bold">{text}</h1>
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-bold">$</h1>
        <h1 className="text-2xl font-bold">0</h1>
      </div>
    </div>
  );
};

export default IncomeCard;
