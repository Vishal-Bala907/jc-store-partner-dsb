"use client";
import React, { useEffect, useState } from "react";
import { Select, MenuItem } from "@mui/material";
import {
  assignOrderToRider,
  fetchOrders,
  getAllRiders,
  updateOrder,
} from "../../server/routes";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const statusOptions = ["Pending", "Cancelled", "Delivered", "Processing"];

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

  const handleStatusChange = (id, invoice, newStatus) => {
    const status = { status: newStatus };
    updateOrder(id, status)
      .then((data) => {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.invoice === invoice ? { ...order, status: newStatus } : order
          )
        );
        toast.success("Order Updated...");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Something went wrong...");
      });
  };

  const handleRiderAssignment = (riderId, orderId) => {
    const user = localStorage.getItem("jc-store-partner");
    if (user) {
      const USER = JSON.parse(user);
      assignOrderToRider(orderId, riderId, USER._id)
        .then((data) => {
          toast.success(data.message, { position: "top-center" });
          fetchOrders(USER.partner.pinCode, page); // Refresh orders
        })
        .catch((err) => {
          toast.error(err.response?.data?.message || "Error assigning rider", {
            position: "top-center",
          });
        });
    }
  };

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <div className="overflow-x-auto mx-10 my-5">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-100 text-gray-700 text-left">
            <th className="py-3 px-5">Invoice No</th>
            <th className="py-3 px-5">Order Time</th>
            <th className="py-3 px-5">Customer Name</th>
            <th className="py-3 px-5">Payment Method</th>
            <th className="py-3 px-5">Amount ($)</th>
            <th className="py-3 px-5">Status</th>
            <th className="py-3 px-5">Rider</th>
            <th className="py-3 px-5">Assign Order To Rider</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr
              key={order.invoice}
              className={`border-b text-black ${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              }`}
            >
              <td className="py-3 px-5">{order.invoice}</td>
              <td className="py-3 px-5">{order.createdAt}</td>
              <td className="py-3 px-5">{order.user_info.name}</td>
              <td className="py-3 px-5">{order.paymentMethod}</td>
              <td className="py-3 px-5">{order.total}</td>
              <td className="py-3 px-5">
                <Select
                  value={order.status}
                  onChange={(e) =>
                    handleStatusChange(order._id, order.invoice, e.target.value)
                  }
                  fullWidth
                  size="small"
                  className="bg-white text-black"
                >
                  {statusOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </td>
              <td className="py-3 px-5">{order.riderName || "Not Assigned"}</td>
              <td className="py-3 px-5">
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
      <div className="flex justify-between items-center mt-4 bg-white text-black rounded-lg px-4 py-2">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
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
          className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default OrderTable;
