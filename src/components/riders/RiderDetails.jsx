import { Box } from "@mui/material";
import React from "react";
// import { Card, CardContent } from "@/components/ui/card";
import {
  FaUser,
  FaIdCard,
  FaPhone,
  FaEnvelope,
  FaMotorcycle,
  FaMapMarkerAlt,
} from "react-icons/fa";

const RiderDetails = ({ rider }) => {
  if (!rider)
    return (
      <p className="text-center text-gray-500">No rider details available</p>
    );

  return (
    <div className="flex justify-center items-center h-fit border-gray-300 p-4">
      <Box className="max-w-lg w-full p-6 bg-white shadow-lg rounded-2xl">
        <Box>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2 border-gray-300 border-b-1 text-center">
            <FaUser className="text-blue-500" /> {rider.fullName}
          </h2>
          {/* <p className="text-gray-600 text-sm ">
            Username: <b> {rider.username}</b>
          </p> */}

          <div className="mt-4 space-y-3 text-center">
            <div className="flex items-center gap-2 text-gray-700">
              <FaIdCard className="text-green-500" /> Aadhar:{" "}
              <b> {rider.aadharNumber}</b>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <FaIdCard className="text-green-blue" /> Username:{" "}
              <b> {rider.username}</b>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <FaIdCard className="text-purple-500" /> PAN:{" "}
              <b> {rider.panNumber}</b>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <FaMotorcycle className="text-red-500" /> License:{" "}
              <b> {rider.bikeLicenceNumber}</b>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <FaPhone className="text-blue-500" /> <b> {rider.phoneNumber}</b>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <FaEnvelope className="text-yellow-500" /> <b> {rider.email}</b>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <FaMapMarkerAlt className="text-red-400" /> Address
            </h3>
            <p className="text-gray-600 text-sm">
              {rider.address.street}, {rider.address.city},{" "}
              {rider.address.state} - {rider.address.postalCode}
            </p>
          </div>
        </Box>
      </Box>
    </div>
  );
};

export default RiderDetails;
