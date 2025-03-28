"use client";
import React, { useEffect } from "react";
import OrderInfo from "./OrderInfo";
import UserInfo from "./UserInfo";
import DeliveryInfo from "./DeliveryInfo";
import BikeRiderInfo from "./BikeRiderInfo";
import Cart from "./Cart";
import { IoMdArrowRoundBack } from "react-icons/io";

const OrderInfoWrapper = ({ orderInfo, setOrderInfo }) => {
  // useEffect(() => {
  //   // eat fivestart do nothing

  //   return () => {
  //     setOrderInfo(null);
  //   };
  // }, []);
  return (
    <div className="flex md:flex-col flex-col justify-center my-5 gap-3 md:mx-10 mx-0">
      <div>
        <IoMdArrowRoundBack
          className="hover:cursor-pointer"
          style={{ color: "red", fontSize: "30px" }}
          onClick={() => {
            setOrderInfo(null);
          }}
        />
      </div>
      <div className="flex md:flex-row  flex-col gap-5 justify-center">
        <OrderInfo order={orderInfo.order} />
        <UserInfo user={orderInfo.user} />
      </div>
      <div className="flex md:flex-row flex-col gap-5 justify-center">
        <DeliveryInfo delivery={orderInfo.delivery} />
        <BikeRiderInfo bikeRiderId={orderInfo.bikeRiderId} />
      </div>
      <div className="w-full">
        <Cart cart={orderInfo.cart} />
      </div>
    </div>
  );
};

export default OrderInfoWrapper;
