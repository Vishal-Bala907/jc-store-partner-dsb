"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaIdCard,
  FaBuilding,
  FaFileInvoice,
  FaClipboardCheck,
  FaAddressBook,
} from "react-icons/fa";
import { toast } from "react-toastify";

const ProfileCard = () => {
  const [profile, setProfile] = useState({});
  const [partner, setPartner] = useState({});

  const router = useRouter();
  useEffect(() => {
    const user = localStorage.getItem("jc-store-partner");
    if (!user) {
      toast.warn("please login first");
      router.push("/");
    }
    const USER = JSON.parse(user);
    // console.log(USER);
    setProfile(USER);
    setPartner(USER.partner);
  }, []);

  const maskNumber = (number) => {
    if (!number) return "";
    const length = String(number).length;

    return number.slice(0, 4).padStart(length, "*");
  };
  console.log(profile);

  return (
    <div className=" bg-gray-100 flex items-center justify-center p-4 mx-10">
      <div className="bg-transparent shadow-lg rounded-lg max-w-md w-full p-6 backdrop-blur-3xl">
        <div className="flex items-center space-x-4">
          <FaUser className="text-pink-600 text-4xl" />
          <div>
            <h2 className="text-2xl font-bold">{profile.name}</h2>
            <p className="text-gray-500">{profile.designation}</p>
            <span
              className="inline-block mt-1 px-3 py-1 text-sm font-medium rounded-full 
              text-white bg-green-500"
            >
              {partner.status}
            </span>
          </div>
        </div>

        <div className="mt-6 space-y-4 text-gray-700">
          <div className="flex items-center space-x-2">
            <FaEnvelope className="text-pink-500" />
            <span>
              {" "}
              <b>Email : </b> {profile.email}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <FaPhone className="text-pink-500" />
            <span>
              {" "}
              <b>Phone : </b> {partner.mobile}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <FaMapMarkerAlt className="text-pink-500" />
            <span>
              {" "}
              <b>Location : </b>
              {partner.city}, {partner.state} - {partner.pinCode}{" "}
            </span>
            {/* <p className="ms-10">{profile.address}</p> */}
          </div>
          <div className="flex items-center space-x-2">
            <FaAddressBook className="text-pink-500" />
            <span>
              <b>Address : </b> {profile.address}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <FaIdCard className="text-pink-500" />
            <span>
              <b>PAN no. :</b> {maskNumber(partner.pan)}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <FaClipboardCheck className="text-pink-500" />
            <span>
              <b>Aadhar no. </b> {maskNumber(partner.aadhar)}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <FaFileInvoice className="text-pink-500" />
            <span>
              <b>GST no. </b> {maskNumber(partner.gst)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
