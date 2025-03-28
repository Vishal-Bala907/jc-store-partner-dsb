import React from "react";

const CartItems = ({ cart }) => {
  if (!cart || cart.length === 0) {
    return (
      <div className="text-center text-red-500">No Cart Items Available</div>
    );
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Cart Items</h2>
      <div className="space-y-4 flex flex-row gap-7  justify-start ">
        {cart.map((item) => (
          <div
            key={item._id}
            className="border-b pb-4 shadow-md  p-2 max-w-[300px]"
          >
            <h3 className="font-medium text-lg text-gray-700">{item.title}</h3>
            <p className="text-sm text-gray-500">
              Category: {item.category.name.en}
            </p>
            <img
              src={item.image[0]}
              alt={item.title}
              className="w-32 h-32 object-cover rounded-md mt-2"
            />
            <p className="text-gray-600">
              Original Price: ₹{item.originalPrice}
            </p>
            <p className="text-gray-800 font-semibold">Price: ₹{item.price}</p>
            <p className="text-green-500 font-medium">
              Discount: {Math.floor(item.prices.discount)}
            </p>
            <p className="text-xs text-gray-400">
              Added on: {new Date(item.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartItems;
