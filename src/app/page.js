"use client";
import { Button, Card, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { loginStorePartner } from "../server/routes";
import { toast } from "react-toastify";
import UpdateSpinner from "../components/spinners/UpdateSpinner";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const user = localStorage.getItem("jc-store-partner");
    const USER = JSON.stringify(user);
    console.log(USER);

    if (user) {
      router.push("/dashboard");
    }
  });
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const USER = {
      email,
      password,
    };
    // console.log(USER);
    setLoading(true);
    loginStorePartner(USER)
      .then((data) => {
        localStorage.setItem("jc-store-partner", JSON.stringify(data));
        router.push("/dashboard");
      })
      .catch((err) => {
        toast.error(err.response.data.error);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="mx-10">
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <Card className="p-6 w-96 shadow-xl bg-white rounded-xl">
          <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
          <form className="flex flex-col gap-4">
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleLogin}
            >
              {loading ? <UpdateSpinner /> : <p>Update Profile</p>}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
