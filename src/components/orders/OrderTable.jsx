"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Select, MenuItem } from "@mui/material";
import { assignOrderToRider, fetchOrders } from "../../server/routes";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import ScaleLoaderSpinner from "../spinners/ScaleLoaderSpinner";

import { GoDotFill } from "react-icons/go";
import NotFoundPage from "../not-found/NotFoundPage";
const OrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [riders, setRiders] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const limit = 5; // Number of records per page

  const router = useRouter();
  // console.log(page);

  useEffect(() => {
    const user = localStorage.getItem("jc-store-partner");
    if (user) {
      setLoading(true);
      const USER = JSON.parse(user);
      fetchOrders(USER.partner.pinCode, page)
        .then((data) => {
          // console.log(data.totalPages);

          setOrders(data.orders);
          setTotalPages(data.totalPages);
          setRiders(USER.partner.riders);
        })
        .catch((err) => {
          console.error(err);
          toast.error(err.response.data.message);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      toast.warn("Please login first");
      router.push("/");
    }
  }, [page]); // Fetch orders whenever the page changes

  const handleRiderAssignment = useCallback(
    async (riderId, orderId) => {
      const user = localStorage.getItem("jc-store-partner");
      if (user) {
        const USER = JSON.parse(user);
        assignOrderToRider(orderId, riderId, USER._id)
          .then((data) => {
            toast.success(data.message, { position: "top-center" });
            fetchOrders(USER.partner.pinCode, page)
              .then((data) => {
                // console.log(data.totalPages);

                setOrders(data.orders);
                setTotalPages(data.totalPages);
                setRiders(USER.partner.riders);
              })
              .catch((err) => {
                console.error(err);
                toast.error(err.response.data.message);
              }); // Refresh orders
          })
          .catch((err) => {
            toast.error(
              err.response?.data?.message || "Error assigning rider",
              {
                position: "top-center",
              }
            );
          });
      }
    },
    [orders, page, riders]
  );

  const formatDataAndTime = (time) => {
    if (!time) {
      return "";
    }
    const DATE = time.split("T")[0];
    const TIME = time.split("T")[1].split(".")[0];
    return `${DATE} - ${TIME}`;
  };

  if (loading) {
    return (
      <div>
        <ScaleLoaderSpinner />
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return <NotFoundPage message="No orders found" />;
  }

  return (
    <div className="mx-10 my-5 overflow-x-auto">
      <div className="flex flex-row justify-end gap-4 mb-3 items-center">
        <span className="flex flex-row items-center">
          <GoDotFill className="text-green-300" /> Deliverd
        </span>
        <span className="flex flex-row items-center">
          <GoDotFill className="text-yellow-300" />
          Pending
        </span>
        <span className="flex flex-row items-center">
          <GoDotFill className="text-blue-300" />
          Processing
        </span>
        <span className="flex flex-row items-center">
          <GoDotFill className="text-red-300" />
          Cancled
        </span>
      </div>
      <table className="bg-white rounded-lg shadow-md min-w-full overflow-hidden">
        <thead>
          <tr className="bg-gray-100 text-gray-700 text-left">
            <th className="px-5 py-3">Invoice No</th>
            <th className="px-5 py-3">Order Time</th>
            <th className="px-5 py-3">Customer Name</th>
            <th className="px-5 py-3">Payment Method</th>
            <th className="px-5 py-3">Amount </th>
            <th className="px-5 py-3 flex flex-row gap-2">Status</th>
            <th className="px-5 py-3">Rider</th>
            <th className="px-5 py-3">Assign Order To Rider</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr
              key={order.invoice}
              className={`border-b text-black ${
                order.status === "Pending"
                  ? "bg-yellow-100"
                  : order.status === "Processing"
                  ? "bg-blue-100"
                  : order.status === "Delivered"
                  ? "bg-green-100"
                  : "bg-red-200"
              }`}
            >
              <td className="px-5 py-3">{order.invoice}</td>
              <td className="px-5 py-3">
                {formatDataAndTime(order.createdAt)}
              </td>
              <td className="px-5 py-3">{order.user_info.name}</td>
              <td className="px-5 py-3">{order.paymentMethod}</td>
              <td className="px-5 py-3">{order.total}</td>
              <td className="px-5 py-3">{order.status}</td>
              <td className="px-5 py-3">{order.riderName || "Not Assigned"}</td>
              <td className="px-5 py-3">
                <Select
                  onChange={(e) =>
                    handleRiderAssignment(e.target.value, order.invoice)
                  }
                  value={order.riderName || ""}
                  fullWidth
                  size="small"
                  className="bg-white text-black"
                >
                  {riders.map((rider) => (
                    <MenuItem key={rider._id} value={rider._id}>
                      {rider.fullName}
                    </MenuItem>
                  ))}
                </Select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex bg-white justify-between rounded-lg text-black items-center mt-4 px-4 py-2">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="bg-gray-300 rounded-md disabled:opacity-50 px-4 py-2"
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => {
            setPage((prev) => (prev < totalPages ? prev + 1 : prev));
            // console.log(totalPages);
          }}
          disabled={page >= totalPages}
          className="bg-gray-300 rounded-md disabled:opacity-50 px-4 py-2"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default OrderTable;
