"use client";
import React, { useEffect, useState } from "react";
import ScaleLoaderSpinner from "../spinners/ScaleLoaderSpinner";
import { getStoreCompletedOrders } from "../../server/routes";
import NotFoundPage from "../not-found/NotFoundPage";
import { GoDotFill } from "react-icons/go";

const CompletedOrders = () => {
  const [page, setPage] = useState(1);
  const [orders, setOrders] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [store, setStore] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("jc-store-partner");
    if (user) {
      setLoading(true);
      const USER = JSON.parse(user);
      console.log(page);
      setStore(USER.partner);
      getStoreCompletedOrders(USER.partner._id, page)
        .then((data) => {
          console.log(data);

          setOrders(data.orders);
          setTotalPages(data.totalPages);
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
  }, [page]);
  const formatDataAndTime = (time) => {
    if (!time) {
      return "";
    }
    const DATE = time.split("T")[0];
    const TIME = time.split("T")[1].split(".")[0];
    return `${DATE} - ${TIME}`;
  };

  const deleverdFirst = () => {
    const filteredOrders = orders.filter(
      (order) => order.order.status === "Delivered"
    );
    const remainingOrders = orders.filter(
      (order) => order.order.status !== "Delivered"
    );
    const sortedOrders = [...filteredOrders, ...remainingOrders];
    setOrders(sortedOrders);
    console.log(orders);
  };
  const cancledFirst = () => {
    const filteredOrders = orders.filter(
      (order) => order.order.status === "Cancelled"
    );
    const remainingOrders = orders.filter(
      (order) => order.order.status !== "Cancelled"
    );
    const sortedOrders = [...filteredOrders, ...remainingOrders];
    setOrders(sortedOrders);
    // console.log(orders);
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
      <div className="flex flex-row justify-between gap-4 mb-3 items-center">
        <div>Completed Orders Of The Store : {store.address}</div>
        <div className="flex flex-row gap-4">
          <span
            className="flex flex-row items-center hover:cursor-pointer"
            onClick={deleverdFirst}
          >
            <GoDotFill className="text-green-300" /> Deliverd
          </span>

          <span
            className="flex flex-row items-center hover:cursor-pointer"
            onClick={cancledFirst}
          >
            <GoDotFill className="text-red-300" />
            Cancled
          </span>
        </div>
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
            {/* <th className="px-5 py-3">Assign Order To Rider</th> */}
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr
              key={order.order.invoice}
              className={`border-b text-black ${
                order.order.status === "Pending"
                  ? "bg-yellow-100"
                  : order.order.status === "Processing"
                  ? "bg-blue-100"
                  : order.order.status === "Delivered"
                  ? "bg-green-100"
                  : "bg-red-200"
              }`}
            >
              <td className="px-5 py-3">{order.order.invoice}</td>
              <td className="px-5 py-3">
                {formatDataAndTime(order.order.createdAt)}
              </td>
              <td className="px-5 py-3">{order.order.user_info.name}</td>
              <td className="px-5 py-3">{order.order.paymentMethod}</td>
              <td className="px-5 py-3">{order.order.total}</td>
              <td className="px-5 py-3">{order.order.status}</td>
              <td className="px-5 py-3">
                {order.order.riderName || "Not Assigned"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex bg-white justify-between rounded-lg text-black items-center mt-4 px-4 py-2">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="bg-gray-300 rounded-md disabled:opacity-50 px-4 py-2"
        >
          Previous
        </button>
        <span>
          <span className="text-gray-700">
            Page {page} of {totalPages}
          </span>

          <span className="text-gray-700 border ms-8 border-gray-300 rounded-md px-4 py-2">
            <input
              type="number"
              max={totalPages}
              min={1}
              value={page}
              onChange={(e) => {
                if (!(e.target.value > totalPages || e.target.value < 1)) {
                  setPage(e.target.value);
                }
              }}
            />
          </span>
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

export default CompletedOrders;
