import React from "react";

const DeliveryInfo = ({ delivery }) => {
  if (!delivery) {
    return (
      <div className="text-center text-red-500">No delivery Data Available</div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };
  return (
    <div className="bg-white grow  border rounded-lg p-6 h-fit ">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Delivery Details
      </h2>
      <div className="space-y-2 flex flex-row gap-2 flex-wrap">
        <p className="p-2 border rounded-md hover:bg-orange-200 hover:font-bold transition-all">
          <span className="font-medium">Delivery ID:</span> {delivery.orderId}
        </p>
        <p className="p-2 border rounded-md hover:bg-orange-200 hover:font-bold transition-all">
          <span className="font-medium">Store ID:</span> {delivery.storeId}
        </p>
        <p className="p-2 border rounded-md hover:bg-orange-200 hover:font-bold transition-all">
          <span className="font-medium">Rider ID:</span> {delivery.bikeRiderId}
        </p>
        <p className="p-2 border rounded-md hover:bg-orange-200 hover:font-bold transition-all">
          <span className="font-medium">Amount:</span> ₹{delivery.amount}
        </p>
        <p className="p-2 border rounded-md hover:bg-orange-200 hover:font-bold transition-all">
          <span className="font-medium">Delivery Assigned:</span>{" "}
          {formatDate(delivery.orderAssignTime)}
        </p>
        <p className="p-2 border rounded-md hover:bg-orange-200 hover:font-bold transition-all">
          <span className="font-medium">Delivery Completed:</span>{" "}
          {formatDate(delivery.orderCompletionTime)}
        </p>
        <p className="p-2 border rounded-md hover:bg-orange-200 hover:font-bold transition-all">
          <span className="font-medium">Created At:</span>{" "}
          {formatDate(delivery.createdAt)}
        </p>
        <p className="p-2 border rounded-md hover:bg-orange-200 hover:font-bold transition-all">
          <span className="font-medium">Updated At:</span>{" "}
          {formatDate(delivery.updatedAt)}
        </p>
        <p className="p-2 border rounded-md flex items-center hover:bg-orange-200 hover:font-bold transition-all">
          <span className="font-medium">Status:</span>
          <span
            className={`ml-2 px-3 py-1 rounded-full text-white text-sm ${
              delivery.status ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {delivery.status ? "Completed" : "Pending"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default DeliveryInfo;
