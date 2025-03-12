"use client";
import { Chart } from "chart.js";
import React, { useEffect, useRef } from "react";
const data = [
  { product: "prod 1", Qty: 34 },
  { product: "prod 2", Qty: 67 },
  { product: "prod 3", Qty: 34 },
  { product: "prod 4", Qty: 65 },
  { product: "prod 5", Qty: 56 },
  { product: "prod 6", Qty: 89 },
  { product: "prod 7", Qty: 49 },
];
const WeeklyOrders = () => {
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
            data: data.map((row) => row.Qty),
            borderColor: "#FFA725",
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

export default WeeklyOrders;
