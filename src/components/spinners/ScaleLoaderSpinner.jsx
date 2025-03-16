"use client";
import React from "react";
import { ScaleLoader } from "react-spinners";

const ScaleLoaderSpinner = () => {
  return (
    <div className="flex justify-center items-center my-10">
      <ScaleLoader height={150} width={10} color={"#3b82f6"} />
    </div>
  );
};

export default ScaleLoaderSpinner;
