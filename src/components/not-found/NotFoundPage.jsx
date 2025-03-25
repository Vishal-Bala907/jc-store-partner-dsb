import React from "react";
import { Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

const NotFoundPage = ({ message }) => {
  const navigate = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center p-4">
      <img
        src="404.svg"
        alt="Not Found"
        className="w-64 h-64 md:w-80 md:h-80"
      />
      <Typography variant="h4" className="text-gray-800 font-bold mt-4">
        404 - {message}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        className="mt-4"
        onClick={() => navigate.push("/dashboard")}
      >
        Go Back Dashboard
      </Button>
    </div>
  );
};

export default NotFoundPage;
