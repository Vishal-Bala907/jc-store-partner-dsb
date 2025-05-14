import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import OrderInfo from "./OrderInfo";
import UserInfo from "./UserInfo";
import OrderedBy from "./OrderedBy";
import Cart from "./Cart";

const PendingOrderInfo = ({ order, setViewOrderDetails }) => {
  console.log(order);

  return (
    <div className="flex md:flex-col flex-col justify-center my-5 gap-3 bg-white text-black absolute top-0 right-0 m-0">
      <div>
        <IoMdArrowRoundBack
          className="hover:cursor-pointer"
          style={{ color: "red", fontSize: "30px" }}
          onClick={() => {
            setViewOrderDetails(null);
          }}
        />
      </div>
      <div className="flex md:flex-row  flex-col gap-5 justify-center">
        <OrderInfo order={order} />
        <UserInfo user={order.user_info} />
      </div>
      <div className="flex md:flex-row flex-col gap-5 justify-center">
        {/* <DeliveryInfo delivery={orderInfo.delivery} /> */}
        {/* <BikeRiderInfo bikeRiderId={orderInfo.bikeRiderId} /> */}
        <OrderedBy orderedBy={order.orderedBy} />
      </div>

      <div className="w-full">
        <Cart cart={order.cart} />
      </div>
    </div>
  );
};

export default PendingOrderInfo;
