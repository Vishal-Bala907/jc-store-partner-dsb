"use client";
import { Box } from "@mui/material";
import React, { useState } from "react";
// import "./updateRiderButton.css";
import { RiDeleteBin5Line } from "react-icons/ri";
import {
  FaUser,
  FaIdCard,
  FaPhone,
  FaEnvelope,
  FaMotorcycle,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { deleteRider } from "../../server/routes";
import { toast } from "react-toastify";
import UpdatePasswordForm from "./UpdatePasswordForm";
const RiderDetails = ({ rider }) => {
  console.log(rider);

  const [updatePassword, setUpdatePassword] = useState(false);
  const submit = (riderId) => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            deleteRider(riderId)
              .then((data) => {
                toast.success(data.message);
              })
              .catch((err) => {
                toast.error(err.response.data.message);
              });
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  const padDocument = (docNumber, remainig) => {
    if (docNumber) {
      return docNumber.slice(-remainig).padStart(docNumber.length, "*");
    } else {
      return "N/A";
    }
  };

  if (!rider)
    return (
      <p className="text-center text-gray-500">No rider details available</p>
    );

  return (
    <div className="flex justify-center items-center h-fit border-gray-300 p-4 relative">
      <Box className="max-w-lg w-full p-6 bg-white shadow-lg rounded-2xl">
        <Box>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2 border-gray-300 border-b-1 text-center">
            <FaUser className="text-pink-500" /> {rider?.fullName ?? "N/A"}
            <div className="text-red-700">
              <RiDeleteBin5Line
                title="delete rider"
                onClick={() => submit(rider._id)}
                className="text-red-500 text-2xl hover:scale-[1.2] transition-all hover:cursor-pointer "
              />
            </div>
          </h2>
          {/* <p className="text-gray-600 text-sm ">
            Username: <b> {rider.username}</b>
          </p> */}

          <div className="mt-4 space-y-3 text-center">
            <div className="flex items-center gap-2 text-gray-700">
              <FaIdCard className="text-pink-500" /> Aadhar:{" "}
              <b>{padDocument(rider?.aadharNumber, 4) ?? "N/A"}</b>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <FaIdCard className="text-pink-500" /> Username:{" "}
              <b>{rider?.username ?? "N/A"}</b>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <FaIdCard className="text-pink-500" /> PAN:{" "}
              <b> {padDocument(rider?.panNumber, 3) ?? "N/A"}</b>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <FaMotorcycle className="text-pink-500" /> License:{" "}
              <b>{rider?.bikeLicenceNumber ?? "N/A"}</b>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <FaPhone className="text-pink-500" />{" "}
              <b>
                {" "}
                <b>{rider?.phoneNumber ?? "N/A"}</b>
              </b>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <FaEnvelope className="text-pink-500" />{" "}
              <b>
                {" "}
                <b>{rider?.email ?? "N/A"}</b>
              </b>
            </div>
          </div>
          <div className="">
            <button
              onClick={() => setUpdatePassword(!updatePassword)}
              className="custom-button mt-6 bg-pink-300 hover:cursor-pointer hover:bg-pink-700 hover:text-white shadow-xl mx-auto w-full p-4 rounded-lg font-bold"
            >
              Update Rider Password
            </button>
          </div>
          <div className="mt-6 p-4 bg-pink-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <FaMapMarkerAlt className="text-pink-400" /> Address
            </h3>
            <p className="text-gray-600 text-sm">
              {rider?.address?.street ?? "N/A"}, {rider?.address?.city ?? "N/A"}
              , {rider?.address?.state ?? "N/A"} -{" "}
              {rider?.address?.postalCode ?? "N/A"}
            </p>
          </div>
        </Box>
      </Box>
      {updatePassword && (
        <div className="absolute top-0 right-0  h-full w-full">
          <UpdatePasswordForm
            riderId={rider._id}
            setUpdatePassword={setUpdatePassword}
          />
        </div>
      )}
    </div>
  );
};

export default RiderDetails;
