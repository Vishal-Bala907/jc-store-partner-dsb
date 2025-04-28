"use client";
import React, { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { addRiderApi } from "../../server/routes";

const RiderForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [is, setId] = useState();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    fullName: "",
    phoneNumber: "",
    email: "",
    aadharNumber: "",
    panNumber: "",
    bikeLicenceNumber: "",
    status: false,
    address: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
    },
  });

  // Generate username and password based on fullName and phoneNumber
  useEffect(() => {
    if (formData.fullName && formData.phoneNumber) {
      const firstName = formData.fullName.split(" ")[0].toLowerCase();
      const username = `${firstName}_${formData.phoneNumber}`;
      const password = `${formData.phoneNumber}_${firstName}`;

      setFormData((prev) => ({
        ...prev,
        username,
        password,
      }));
    }
  }, [formData.fullName, formData.phoneNumber]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // var user = localStorage.getItem("jc-store-partner");
  // var partnerId;
  // console.log("partnerId", partnerId);
  // useEffect(() => {
  //   if (user) {
  //     partnerId = JSON.parse(user)._id;
  //   }
  // }, []);
  // console.log(formData);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const user = localStorage.getItem("jc-store-partner");
      if (!user) {
        toast.warn("please login first");
        router.push("/");
        return;
      }
      const USER = JSON.parse(user);
      console.log(formData);

      addRiderApi(formData, USER.partner._id)
        .then((data) => {
          toast.success(data.message, {
            position: "top-center",
          });
          setFormData({
            username: "",
            password: "",
            fullName: "",
            phoneNumber: "",
            email: "",
            aadharNumber: "",
            panNumber: "",
            bikeLicenceNumber: "",
            status: false,
            address: {
              street: "",
              city: "",
              state: "",
              postalCode: "",
            },
          });
        })
        .catch((err) => {
          console.log(err);

          toast.error(err.response.data.message, {
            position: "top-center",
          });
        });
    },
    [formData]
  );

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setIsSubmitting(true);

  //   try {
  //     if (user) {
  //       // console.log();
  //       addRiderApi(formData, partnerId)
  //         .then((data) => {
  //           toast.success(data.message, {
  //             position: "top-center",
  //           });
  //           setFormData({
  //             username: "",
  //             password: "",
  //             fullName: "",
  //             phoneNumber: "",
  //             email: "",
  //             aadharNumber: "",
  //             panNumber: "",
  //             bikeLicenceNumber: "",
  //             status: false,
  //             address: {
  //               street: "",
  //               city: "",
  //               state: "",
  //               postalCode: "",
  //             },
  //           });
  //         })
  //         .catch((err) => {
  //           toast.error(err.response.data.message, {
  //             position: "top-center",
  //           });
  //         });
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //     toast.error(error.response?.data?.message || "Something went wrong!");
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  // Form field structure based on API requirements
  const formFields = [
    {
      name: "fullName",
      label: "Full Name",
      type: "text",
      placeholder: "Enter your full name",
    },
    {
      name: "phoneNumber",
      label: "Mobile Number",
      type: "tel",
      placeholder: "Enter your 10-digit mobile number",
      pattern: "^[0-9]{10}$",
    },
    {
      name: "email",
      label: "Email Address",
      type: "email",
      placeholder: "Enter your email address",
      pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$",
    },
    {
      name: "aadharNumber",
      label: "Aadhar Number",
      type: "text",
      placeholder: "Enter your 12-digit Aadhar number",
      pattern: "^[0-9]{12}$",
    },
    {
      name: "panNumber",
      label: "PAN Number",
      type: "text",
      placeholder: "Enter your PAN number",
    },
    {
      name: "bikeLicenceNumber",
      label: "Bike License Number",
      type: "text",
      placeholder: "Enter your bike license number",
    },
    {
      name: "address.street",
      label: "Street Address",
      type: "text",
      placeholder: "Enter your street address",
    },
    {
      name: "address.city",
      label: "City",
      type: "text",
      placeholder: "Enter your city",
    },
    {
      name: "address.state",
      label: "State",
      type: "text",
      placeholder: "Enter your state",
    },
    {
      name: "address.postalCode",
      label: "Postal Code",
      type: "text",
      placeholder: "Enter your 6-digit postal code",
      pattern: "^[0-9]{6}$",
    },
  ];

  return (
    <>
      <h1 title="Rider Registration" description="Register as a rider" />

      {loading ? (
        <div>Loading....</div>
      ) : (
        <div className="max-w-3xl mx-auto px-4 py-8 text-black">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="bg-customPink px-6 py-4">
              <h2 className="text-xl font-bold text-white">
                Register as a Bike Rider
              </h2>
              <p className="text-indigo-100 mt-1 text-sm">
                Fill in the details below to join our Bike Rider network
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Username and Password Preview Section */}
              <div className="bg-gray-50 p-4 rounded-md border border-gray-200 mb-6">
                <h3 className="text-md font-medium text-gray-700 mb-2">
                  Account Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">
                      Username
                    </label>
                    <div className="bg-gray-100 p-2 rounded border border-gray-300 text-gray-700">
                      {formData.username || "Will be generated automatically"}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">
                      Password
                    </label>
                    <div className="bg-gray-100 p-2 rounded border border-gray-300 text-gray-700">
                      {formData.password || "Will be generated automatically"}
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  *Username and password are automatically generated based on
                  your name and phone number
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {formFields.map((field) => (
                  <div
                    key={field.name}
                    className={
                      field.name === "address.street" ? "md:col-span-2" : ""
                    }
                  >
                    <label
                      htmlFor={field.name}
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      {field.label}{" "}
                      {field.name === "fullName" ||
                      field.name === "phoneNumber" ? (
                        <span className="text-red-500">*</span>
                      ) : (
                        ""
                      )}
                    </label>
                    <input
                      type={field.type}
                      id={field.name}
                      name={field.name}
                      value={
                        field.name.includes(".")
                          ? formData[field.name.split(".")[0]][
                              field.name.split(".")[1]
                            ]
                          : formData[field.name]
                      }
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      pattern={field.pattern}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3"
                      required={
                        field.name === "fullName" ||
                        field.name === "phoneNumber"
                      }
                    />
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-center md:justify-end pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      username: "",
                      password: "",
                      fullName: "",
                      phoneNumber: "",
                      email: "",
                      aadharNumber: "",
                      panNumber: "",
                      bikeLicenceNumber: "",
                      status: false,
                      address: {
                        street: "",
                        city: "",
                        state: "",
                        postalCode: "",
                      },
                    })
                  }
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md mr-4"
                  disabled={isSubmitting}
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 text-sm font-medium text-white bg-customPink hover:bg-customPinkDark rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-customPink disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    "Register as Rider"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default RiderForm;
