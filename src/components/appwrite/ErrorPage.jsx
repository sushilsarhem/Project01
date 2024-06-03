import React from "react";
import { useRouteError, Link } from "react-router-dom";

export const ErrorPage = () => {
  const error = useRouteError();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        margin: "50px",
        color: "white",
      }}
    >
      <h1>Oops! Error Occured..</h1>
      <h3>
        click here to go...
        <Link
          style={{ color: "yellow", textDecoration: "none", fontSize: "30px" }}
          to={"/"}
        >
          HOME
        </Link>
      </h3>
    </div>
  );
};
