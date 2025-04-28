"use client";
import React from "react";
import { BeatLoader } from "react-spinners";
// import { RotatingLines } from "react-spinners";

const UpdateSpinner = () => {
  return (
    <div className="flex justify-center items-center my-2">
      <BeatLoader color="#ea00ff" margin={2} size={10} />
    </div>
  );
};

export default UpdateSpinner;
