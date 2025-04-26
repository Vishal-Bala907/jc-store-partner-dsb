import React from "react";

const OrderedBy = ({ orderedBy }) => {
  if (!orderedBy) {
    return <div className="text-center text-red-500">No Data Available</div>;
  }

  // const formatDate = (dateString) => {
  //   return new Date(dateString).toLocaleString();
  // };

  return (
    <div className="bg-white grow  hover:shadow-xl transition-all border rounded-lg p-6 h-fit  ">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Ordered By</h2>
      <div className="space-y-2 flex flex-row gap-2 flex-wrap ">
        <p className="p-2 border rounded-md hover:bg-blue-200 hover:font-bold transition-all">
          <span className="font-medium">Placed By:</span>{" "}
          {orderedBy?.role ?? "Customer"}
        </p>
        <p className="p-2 border rounded-md hover:bg-blue-200 hover:font-bold transition-all">
          <span className="font-medium">Name:</span> {orderedBy?.name ?? "N/A"}
        </p>
        <p className="p-2 border rounded-md hover:bg-blue-200 hover:font-bold transition-all">
          <span className="font-medium">Email:</span>
          {orderedBy?.email ?? "N/A"}
        </p>
        <p className="p-2 border rounded-md hover:bg-blue-200 hover:font-bold transition-all">
          <span className="font-medium">Contact:</span>
          {orderedBy?.contact ?? "N/A"}
        </p>
      </div>
    </div>
  );
};

export default OrderedBy;
