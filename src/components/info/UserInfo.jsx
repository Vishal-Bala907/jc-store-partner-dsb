import React from "react";

const UserInfo = ({ user }) => {
  if (!user) {
    return (
      <div className="text-center text-red-500">No User Data Available</div>
    );
  }

  return (
    <div className="bg-white grow  hover:shadow-xl transition-all border rounded-lg p-6 h-fit ">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        User Information
      </h2>
      <div className="space-y-2 flex flex-row gap-2 flex-wrap">
        <p className="p-2 border rounded-md hover:bg-pink-200 hover:font-bold transition-all">
          <span className="font-medium">Name:</span> {user?.name ?? "N/A"}
        </p>
        <p className="p-2 border rounded-md hover:bg-pink-200 hover:font-bold transition-all">
          <span className="font-medium">Email:</span> {user?.email ?? "N/A"}
        </p>
        <p className="p-2 border rounded-md hover:bg-pink-200 hover:font-bold transition-all">
          <span className="font-medium">Contact:</span> {user?.contact ?? "N/A"}
        </p>
        <p className="p-2 border rounded-md hover:bg-pink-200 hover:font-bold transition-all">
          <span className="font-medium">Address:</span> {user?.address ?? "N/A"}
          , {user?.city ?? "N/A"}, {user?.zipCode ?? "N/A"},{" "}
          {user?.country ?? "N/A"}
        </p>
      </div>
    </div>
  );
};

export default UserInfo;
