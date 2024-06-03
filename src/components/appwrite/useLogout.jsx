import React from "react";
import { account } from "./appwrite";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const navigate = useNavigate();
  async function LogOut() {
    try {
      await account.deleteSession("current");
      // alert("You are logged out");
      navigate("/login");
    } catch (error) {
      console.log(error.message);
      alert("Unable to logout");
    }
  }
  return { LogOut };
};
// export default useLogout;
