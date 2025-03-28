import React from "react";

const OrderInfo = ({ order }) => {
  if (!order) {
    return (
      <div className="text-center text-red-500">No Order Data Available</div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="bg-white grow  hover:shadow-xl transition-all border rounded-lg p-6 h-fit  ">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Order Information
      </h2>
      <div className="space-y-2 flex flex-row gap-2 flex-wrap ">
        <p className="p-2 border rounded-md hover:bg-blue-200 hover:font-bold transition-all">
          <span className="font-medium">Invoice No:</span> {order.invoice}
        </p>
        <p className="p-2 border rounded-md hover:bg-blue-200 hover:font-bold transition-all">
          <span className="font-medium">Status:</span> {order.status}
        </p>
        <p className="p-2 border rounded-md hover:bg-blue-200 hover:font-bold transition-all">
          <span className="font-medium">Total Amount:</span> ₹{order.total}
        </p>
        <p className="p-2 border rounded-md hover:bg-blue-200 hover:font-bold transition-all">
          <span className="font-medium">Sub Total:</span> ₹{order.subTotal}
        </p>
        <p className="p-2 border rounded-md hover:bg-blue-200 hover:font-bold transition-all">
          <span className="font-medium">Discount:</span> ₹{order.discount}
        </p>
        <p className="p-2 border rounded-md hover:bg-blue-200 hover:font-bold transition-all">
          <span className="font-medium">Shipping Cost:</span> ₹
          {order.shippingCost}
        </p>

        <p className="p-2 border rounded-md hover:bg-blue-200 hover:font-bold transition-all">
          <span className="font-medium">Payment Method:</span>{" "}
          {order.paymentMethod}
        </p>
        <p className="p-2 border rounded-md hover:bg-blue-200 hover:font-bold transition-all">
          <span className="font-medium">Rider Name:</span> {order.riderName}
        </p>
        <p className="p-2 border rounded-md hover:bg-blue-200 hover:font-bold transition-all">
          <span className="font-medium">Order Created:</span>{" "}
          {formatDate(order.createdAt)}
        </p>
        <p className="p-2 border rounded-md hover:bg-blue-200 hover:font-bold transition-all">
          <span className="font-medium">Last Updated:</span>{" "}
          {formatDate(order.updatedAt)}
        </p>
      </div>
    </div>
  );
};

export default OrderInfo;
