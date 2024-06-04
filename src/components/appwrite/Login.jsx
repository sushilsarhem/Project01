import React, { useState } from "react";
import { account } from "./appwrite";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./Context";
import { AlertBox } from "./AlertBox";
import "./Login.css";

export const Login = () => {
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const { user, SetUser } = useContext(UserContext);

  const [showAlert, SetAlert] = useState(false);

  const navigate = useNavigate();

  // const NewUser = account.get("current");
  // console.log(NewUser);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const res = await account.createEmailPasswordSession(email, password);
      SetEmail("");
      SetPassword("");
      if (res) {
        SetAlert(true);
        SetUser(true);
        setTimeout(() => {
          navigate("/dashboard");
        }, 5000);
      }
    } catch (error) {
      alert("Unable to login!");
      // console.error("Loginup error:", error);
      // console.log(error);
    }
  }
  // console.log(user);

  return (
    <div className="login-container">
      <div className="input-container">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          placeholder="enter email.."
          value={email}
          onChange={(event) => {
            SetEmail(event.target.value);
          }}
        />
      </div>
      <div className="input-container">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          placeholder="enter password.."
          value={password}
          onChange={(event) => {
            SetPassword(event.target.value);
          }}
        />
      </div>
      <button className="login-button" onClick={handleSubmit}>
        Login
      </button>
      {showAlert && (
        <AlertBox
          status={"Login Successful"}
          redirect={"Redirecting To Dashboard.."}
        />
      )}
    </div>
  );
};
