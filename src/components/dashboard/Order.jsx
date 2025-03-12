import Image from "next/image";
import React from "react";

const Order = ({ icon, text, qty }) => {
  return (
    <div className="min-w-0 rounded-lg overflow-hidden bg-white dark:bg-gray-800 flex h-full">
      <div className="p-4 flex items-center border border-gray-200 dark:border-gray-800 bg-white w-full rounded-lg">
        <div className="flex items-center justify-center p-3 rounded-full h-12 w-12 text-center mr-4 text-lg text-orange-600 dark:text-orange-100 bg-orange-100 dark:bg-orange-500">
          <Image src={icon} alt="icon" width={20} height={20} />
        </div>
        <div>
          <h6 className="text-sm mb-1 font-medium text-gray-600 dark:text-black">
            <span>{text}</span>{" "}
          </h6>
          <p className="text-2xl font-bold leading-none text-black dark:text-gray-200">
            {qty}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Order;
