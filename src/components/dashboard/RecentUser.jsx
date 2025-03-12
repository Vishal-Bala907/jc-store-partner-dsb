"use client";
import React, { useEffect, useState } from "react";
import { Select, MenuItem } from "@mui/material";
import recentOrders from "../../data/DummyRecentOrder";
import {
  assignOrderToRider,
  getAllOrders,
  getAllRiders,
} from "../../server/routes";
import { toast } from "react-toastify";

const statusOptions = ["Pending", "Cancelled", "Delivered", "Processing"];

const OrderTable = () => {
  const [rows, setRows] = useState([]);
  const [riders, setRiders] = useState([]);
  const [rider, setRider] = useState([]);

  const handleStatusChange = (invoice, newStatus) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.invoice === invoice ? { ...row, status: newStatus } : row
      )
    );
  };

  useEffect(() => {
    const user = localStorage.getItem("jc-store-partner");
    if (user) {
      const USER = JSON.parse(user);
      getAllOrders(USER.partner.pinCode)
        .then((data) => {
          setRows(data);
          setRiders(USER.partner.riders);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);

  const handleRiderAissgnment = (riderId, orderId) => {
    const user = localStorage.getItem("jc-store-partner");
    if (user) {
      const USER = JSON.parse(user);
      // console.log();
      assignOrderToRider(orderId, riderId, USER._id)
        .then((data) => {
          toast.success(data.message, {
            position: "top-center",
          });
        })
        .catch((err) => {
          toast.error(err.response.data.message, {
            position: "top-center",
          });
        });
    }
  };

  return (
    <div className="overflow-x-auto mx-10">
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
          {rows.map((row, index) => (
            <tr
              key={row.invoice}
              className={`border-b text-black ${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              }`}
            >
              <td className="py-3 px-5">{row.invoice}</td>
              <td className="py-3 px-5">{row.createdAt}</td>
              <td className="py-3 px-5">{row.user_info.name}</td>
              <td className="py-3 px-5">{row.paymentMethod}</td>
              <td className="py-3 px-5">{row.total}</td>
              <td className="py-3 px-5">
                <Select
                  value={row.status}
                  onChange={(e) =>
                    handleStatusChange(row.invoice, e.target.value)
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
              <td className="py-3 px-5">{row.riderName}</td>
              <td className="py-3 px-5">
                <Select
                  onChange={(e) => {
                    handleRiderAissgnment(e.target.value, row.invoice);
                  }}
                  value={row.riderName}
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
    </div>
  );
};

export default OrderTable;
