"use client";
import { Button, Card, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { loginStorePartner, verifyFirst } from "../server/routes";
import { toast } from "react-toastify";
import UpdateSpinner from "../components/spinners/UpdateSpinner";
// import { error } from "console";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const user = localStorage.getItem("jc-store-partner");
    const USER = JSON.parse(user);

    if (USER) {
      const id = USER.partner._id;
      if (id) {
        const response = verifyFirst(id)
          .then((res) => {
            router.push("/dashboard");
            console.log(res);
          })
          .catch((error) => {
            if (error.response.status === 401) {
              localStorage.removeItem("jc-store-partner");
              toast.error("User is not verified, Please Login Again...");
            } else if (error.response.status === 404) {
              localStorage.removeItem("jc-store-partner");
              toast.error("User is not found, Please Login Again...");
            } else {
              toast.error("Something went wrong, Please Login Again...");
            }
          });
      } else {
        toast.error("Invalid Id, Please Login Again...");
        return;
      }
    }

    if (user) {
      // router.push("/dashboard");
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
              {loading ? <UpdateSpinner /> : <p>Login</p>}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
