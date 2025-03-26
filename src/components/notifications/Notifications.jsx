"use client";
import React, { useEffect, useState, useCallback } from "react";
import Notification from "./Notification";
import { toast } from "react-toastify";
import { deleteMyNotifications, getMyNotifications } from "../../server/routes";
import UpdateSpinner from "../spinners/UpdateSpinner";
import { FixedSizeList as List } from "react-window";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { FadeLoader } from "react-spinners";

const Notifications = ({ showNotifications }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to fetch notifications
  const fetchNotifications = useCallback(() => {
    const user = localStorage.getItem("jc-store-partner");
    if (!user) {
      toast.warn("Please login!...");
      return;
    }

    try {
      const USER = JSON.parse(user);
      if (!USER?.partner?.pinCode) {
        toast.error("Invalid user data");
        return;
      }

      setLoading(true);
      getMyNotifications(USER.partner.pinCode)
        .then((data) => {
          setNotifications(data.orders || []); // Ensure empty array if no orders
        })
        .catch((err) => {
          console.error(err);
          toast.error("Unable to fetch notifications");
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      toast.error("Error parsing user data");
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]); // Dependency added for better reactivity

  // Function to clear notifications from UI
  const clearAllNotifications = () => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to delete all these notifications",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            const user = localStorage.getItem("jc-store-partner");
            if (!user) {
              toast.warn("Please login!...");
              return;
            }

            try {
              const USER = JSON.parse(user);
              if (!USER?.partner?.pinCode) {
                toast.error("Invalid user data");
                return;
              }

              setLoading(true);
              deleteMyNotifications(USER.partner.pinCode)
                .then((data) => {
                  setNotifications([]); // Ensure empty array if no orders
                })
                .catch((err) => {
                  console.error(err);
                  toast.error("Unable to delete notifications");
                })
                .finally(() => {
                  setLoading(false);
                });
            } catch (error) {
              toast.error("Error parsing user data");
            }
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  // () => {
  // setNotifications([]); // Clears UI (You may also delete from DB)

  // };

  // Render each notification item
  const Row = ({ index, style }) => (
    <div style={style}>
      <Notification
        key={notifications[index]._id}
        notification={notifications[index]}
      />
    </div>
  );

  return (
    <div className="absolute rounded-lg shadow-2xl right-0 z-10 md:me-10 w-[75%] lg:w-[40%] max-h-fit bg-blue-50 text-black h-screen lg:h-[75%] overflow-auto mx-3 flex flex-col gap-3 py-2 px-2">
      <div
        className="text-red-600 fw-bold text-sm hover:cursor-pointer"
        onClick={clearAllNotifications} // Attach event
      >
        Clear All
      </div>
      {loading ? (
        <FadeLoader color="#000c" height={15} radius={55} width={3} />
      ) : (
        <List
          height={400} // Visible height of the list
          itemCount={notifications.length} // Total number of notifications
          itemSize={80} // Height of each notification item
          width="100%"
        >
          {Row}
        </List>
      )}
    </div>
  );
};

export default Notifications;
