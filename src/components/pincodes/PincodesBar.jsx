import React from "react";

const PincodesBar = ({ pincodes, selectedPincode, handlePincodeChange }) => {
  return (
    <div className="mx-10 my-5 max-w-[600px] overflow-auto ">
      {pincodes && pincodes.length > 0
        ? pincodes.map((pincode, index) => (
            <span
              key={index}
              className={`text-xs ${
                selectedPincode === pincode ? "bg-pink-200" : "bg-gray-100"
              }  text-gray-800 px-2 py-1 rounded-md mx-1 hover:cursor-pointer hover:shadow-md`}
              onClick={() => handlePincodeChange(pincode)}
            >
              {pincode}
            </span>
          ))
        : "No Pincodes found"}
    </div>
  );
};

export default PincodesBar;
