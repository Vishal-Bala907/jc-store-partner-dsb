"use client";
import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { getRelativePosition } from "chart.js/helpers";

const data = [
  { product: "prod 1", Income: 24455 },
  { product: "prod 2", Income: 23453450 },
  { product: "prod 3", Income: 13454355 },
  { product: "prod 4", Income: 23455 },
  { product: "prod 5", Income: 34522 },
  { product: "prod 6", Income: 33450 },
  { product: "prod 7", Income: 2342568 },
];

const WeeklySales = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");

    if (!ctx) return;

    const chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: data.map((row) => row.product),
        datasets: [
          {
            label: "Acquisitions by year",
            data: data.map((row) => row.Income),
            borderColor: "#4CAF50",
            backgroundColor: "rgba(76, 175, 80, 0.2)",
            tension: 0.4,
          },
        ],
      },
      options: {
        onClick: (e) => {
          const canvasPosition = getRelativePosition(e, chart);
          const dataX = chart.scales.x.getValueForPixel(canvasPosition.x);
          const dataY = chart.scales.y.getValueForPixel(canvasPosition.y);
          console.log(`Clicked at: X=${dataX}, Y=${dataY}`);
        },
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: "top",
          },
        },
      },
    });

    return () => chart.destroy(); // Cleanup to avoid memory leaks
  }, []);

  return (
    <div className="lg:w-[40%] w-[100%] mx-10 my-8 bg-white">
      <canvas ref={canvasRef}></canvas>;
    </div>
  );
};

export default WeeklySales;
