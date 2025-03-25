"use client";
import React from "react";
import { FadeLoader } from "react-spinners";
// import { RotatingLines } from "react-spinners";

const UpdateSpinner = () => {
  return (
    <div className="flex justify-center items-center my-10">
      <FadeLoader color="#ffffff" height={15} radius={55} width={3} />
    </div>
  );
};

export default UpdateSpinner;
