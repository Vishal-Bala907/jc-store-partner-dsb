"use client";
import { Button, Card, CardContent, MenuItem, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { RxCross2 } from "react-icons/rx";
import { updatePartnerProfile } from "../../server/routes";
import { useRouter } from "next/navigation";
import UpdateSpinner from "../../components/spinners/UpdateSpinner";

const UpdateProfile = ({ setShowUpdateProfile }) => {
  const [partner, setPartner] = useState({
    name: "",
    email: "",
    mobile: "",
    city: "",
    state: "",
    pinCode: "",
    address: "",
    pan: "",
    aadhar: "",
    gst: "",
    status: "Hold",
  });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const user = localStorage.getItem("jc-store-partner");
    if (!user) {
      toast.warn("please login first");
      return;
    }
    const USER = JSON.parse(user);
    setPartner(USER.partner);
  }, []);

  const handleChange = (e) => {
    setPartner({ ...partner, [e.target.name]: e.target.value });
  };

  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    updatePartnerProfile(partner._id, partner)
      .then((data) => {
        toast.success(data.message);
        toast.success("Please login again");
        localStorage.removeItem("jc-store-partner");
        setShowUpdateProfile(false);
        router.push("/");
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => {
        setShowUpdateProfile(false);
        setLoading(false);
      });
  };

  return (
    <div className="flex justify-center items-center  bg-gray-100 relative">
      <div
        className="absolute top-3 bg-red-50 border-2 border-red-600 rounded-full  left-10 text-2xl"
        onClick={() => {
          setShowUpdateProfile(false);
        }}
      >
        <RxCross2 className="fw-bold text-red-600" />
      </div>
      <Card className="w-full max-w-3xl shadow-lg">
        <CardContent>
          <h2 className="text-2xl font-semibold text-center mb-4">
            Update Store Partner Profile
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
            <TextField
              label="Name"
              name="name"
              value={partner.name}
              onChange={handleChange}
              required
              fullWidth
            />
            <section className="flex md:flex-row flex-col gap-5">
              <TextField
                label="Email"
                name="email"
                value={partner.email}
                onChange={handleChange}
                required
                fullWidth
                contentEditable={false}
                disabled={true}
                className="bg-red-50 flex-shrink-1 md:w-[45%]"
              />
              <TextField
                label="Mobile"
                name="mobile"
                value={partner.mobile}
                onChange={handleChange}
                required
                fullWidth
                contentEditable={false}
                disabled={true}
                className="bg-red-50 flex-shrink-1 md:w-[45%]"
              />
            </section>

            <TextField
              label="Address"
              name="address"
              value={partner.address}
              onChange={handleChange}
              required
              fullWidth
              multiline
              rows={2}
            />
            <TextField
              label="GST"
              name="gst"
              value={partner.gst}
              onChange={handleChange}
              fullWidth
            />

            <section className="grid md:grid-cols-2 grid-cols-1 gap-5">
              <TextField
                label="City"
                name="city"
                value={partner.city}
                onChange={handleChange}
                required
                fullWidth
                className="md:w-[50%]"
              />
              <TextField
                label="State"
                name="state"
                value={partner.state}
                onChange={handleChange}
                required
                fullWidth
                className="md:w-[45%]"
              />
              <TextField
                label="Pin Code"
                name="pinCode"
                value={partner.pinCode}
                onChange={handleChange}
                required
                fullWidth
                className="md:w-[50%]"
              />
              <TextField
                label="PAN"
                name="pan"
                value={partner.pan}
                onChange={handleChange}
                required
                fullWidth
                disabled={true}
                className="bg-red-50 md:w-[50%]"
              />
              <TextField
                label="Aadhar"
                name="aadhar"
                value={partner.aadhar}
                onChange={handleChange}
                required
                fullWidth
                disabled={true}
                className="bg-red-50 md:w-[50%]"
              />

              <TextField
                label="Status"
                name="status"
                value={partner.status}
                onChange={handleChange}
                fullWidth
                required
                disabled={true}
                className="bg-red-50 md:w-[50%]"
              ></TextField>
            </section>
            <div className="col-span-2 flex justify-center">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="w-1/2"
              >
                {loading ? <UpdateSpinner /> : <p>Update Profile</p>}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdateProfile;
