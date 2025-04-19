"use client";
import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";
import { updateRiderPassword } from "../../server/routes";

const UpdatePasswordForm = ({ riderId, setUpdatePassword }) => {
  const [formData, setFormData] = useState({
    aadhar: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add validation and submission logic
    if (formData.newPassword !== formData.confirmPassword) {
      toast.warn("Passwords do not match");
      return;
    }
    // fire API to change password
    const password = {
      aadhar: formData.aadhar,
      newPassword: formData.newPassword,
    };

    console.log(password);

    updateRiderPassword(riderId, password)
      .then((data) => {
        toast.success("Password updated successfully");
        setUpdatePassword(false);
      })
      .catch((err) => {
        console.log(err?.response?.data?.message ?? "Something went wrong");

        toast.error(err?.response?.data?.message ?? "Something went wrong");
      });
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6  rounded-xl shadow-md h-full w-full flex justify-center items-center flex-col relative">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
        Update Password
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Aadhar Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Aadhar Number
          </label>
          <input
            type="text"
            name="aadhar"
            value={formData.aadhar}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="Enter Aadhar Number"
            required
          />
        </div>

        {/* New Password Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            New Password
          </label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="Enter New Password"
            required
          />
        </div>

        {/* Confirm Password Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="Re-enter New Password"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-md transition-all"
        >
          Submit
        </button>
      </form>
      <div className="absolute top-2 right-2 cursor-pointer">
        <IoClose
          className="text-red-700 font-bold text-2xl"
          onClick={() => {
            setUpdatePassword((prev) => !prev);
          }}
        />
      </div>
    </div>
  );
};

export default UpdatePasswordForm;
