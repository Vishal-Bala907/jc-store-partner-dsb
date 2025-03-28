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
          <span className="font-medium">Full Name:</span> {rider.fullName}
        </p>
        <p className="p-2 border rounded-md hover:bg-red-200 hover:font-bold transition-all">
          <span className="font-medium">Username:</span> {rider.username}
        </p>
        <p className="p-2 border rounded-md hover:bg-red-200 hover:font-bold transition-all">
          <span className="font-medium">Phone Number:</span> {rider.phoneNumber}
        </p>
        <p className="p-2 border rounded-md hover:bg-red-200 hover:font-bold transition-all">
          <span className="font-medium">Email:</span> {rider.email}
        </p>
        {/* <p className="p-2 border rounded-md">
          <span className="font-medium">Aadhar Number:</span>{" "}
          {rider.aadharNumber}
        </p>
        <p className="p-2 border rounded-md">
          <span className="font-medium">PAN Number:</span> {rider.panNumber}
        </p>
        <p className="p-2 border rounded-md">
          <span className="font-medium">Bike License:</span>{" "}
          {rider.bikeLicenceNumber}
        </p> */}
        {/* <p className="p-2 border rounded-md flex items-center">
          <span className="font-medium">Status:</span>
          <span
            className={`ml-2 px-3 py-1 rounded-full text-white text-sm ${
              rider.status ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {rider.status ? "Active" : "Inactive"}
          </span>
        </p> */}
      </div>
      {/* <h3 className="text-lg font-semibold text-gray-700 mt-4">Address</h3>
      <div className="p-2 border rounded-md">
        {rider.address.street}, {rider.address.city}, {rider.address.state} -{" "}
        {rider.address.postalCode}
      </div> */}
    </div>
  );
};

export default BikeRiderInfo;
