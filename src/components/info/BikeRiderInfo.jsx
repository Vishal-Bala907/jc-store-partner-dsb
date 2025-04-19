import React, { useEffect, useState } from "react";
import { getBikeRiderById } from "../../server/routes";

const BikeRiderInfo = ({ bikeRiderId }) => {
  const [rider, setRider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBikeRider = async () => {
      try {
        const data = await getBikeRiderById(bikeRiderId);
        setRider(data);
      } catch (err) {
        setError("Failed to fetch bike rider details");
      } finally {
        setLoading(false);
      }
    };

    if (bikeRiderId) {
      fetchBikeRider();
    }
  }, [bikeRiderId]);

  if (loading) return <p>Loading bike rider details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!rider) return <p>No rider found</p>;

  return (
    <div className="bg-white grow-[2] hover:shadow-xl transition-all border rounded-lg p-6  h-fit">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Bike Rider Details
      </h2>
      <div className="space-y-2 flex flex-row gap-2 flex-wrap">
        <p className="p-2 border rounded-md hover:bg-red-200 hover:font-bold transition-all">
          <span className="font-medium">Full Name:</span>{" "}
          {rider?.fullName ?? "N/A"}
        </p>
        <p className="p-2 border rounded-md hover:bg-red-200 hover:font-bold transition-all">
          <span className="font-medium">Username:</span>{" "}
          {rider?.username ?? "N/A"}
        </p>
        <p className="p-2 border rounded-md hover:bg-red-200 hover:font-bold transition-all">
          <span className="font-medium">Phone Number:</span>{" "}
          {rider?.phoneNumber ?? "N/A"}
        </p>
        <p className="p-2 border rounded-md hover:bg-red-200 hover:font-bold transition-all">
          <span className="font-medium">Email:</span> {rider?.email ?? "N/A"}
        </p>
      </div>
    </div>
  );
};

export default BikeRiderInfo;
