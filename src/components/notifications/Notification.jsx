import React from "react";
import { GoDotFill } from "react-icons/go";

const Notification = ({ notification }) => {
  console.log(notification);

  if (!notification || notification.length === 0) {
    return (
      <div className="px-2 py-3 rounded-lg bg-blue-200 text-black">
        No Notifications yet ....
      </div>
    );
  }

  const formatDataAndTime = (time) => {
    if (!time) {
      return "";
    }
    const DATE = time.split("T")[0];
    const TIME = time.split("T")[1].split(".")[0];
    return `Date: ${DATE} - Time" ${TIME}`;
  };

  return (
    <div className="px-2 py-3 rounded-lg bg-blue-200 border border-blue-900 shadow-md">
      <div className="text-left flex  flex-row justify-between items-center border-b-2 border-pink-300">
        {/* <MdAccessTime className="text-white" />  */}
        <p className="px-2 py-1 rounded-full bg-blue-900 text-white mb-1 text-[.6em]">
          new order
        </p>
        <p> {formatDataAndTime(notification.createdAt)}</p>
      </div>
      <p className="flex flex-row gap-2  items-center">
        {notification.status === "unread" && (
          <GoDotFill className="text-green-600 text-lg " />
        )}
        {notification.message}
      </p>
    </div>
  );
};

export default Notification;
