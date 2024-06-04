import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { account } from "./appwrite";

export const VerifyUsers = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  useEffect(() => {
    const userId = searchParams.get("userId");
    const secret = searchParams.get("secret");

    if (userId && secret) {
      verifyUser(userId, secret);
    }
  }, [searchParams]);

  async function verifyUser(userId, secret) {
    try {
      const res = await account.updateVerification(userId, secret);
      if (res) {
        alert("Verified! please Login");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      alert("Verification failed!");
    }
  }

  return (
    <div>
      <h1>Please wait while we verify your account..</h1>
    </div>
  );
};
