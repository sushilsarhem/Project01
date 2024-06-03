import React, { useEffect, useState, useContext } from "react";
import { account, databases, Query, storage } from "./appwrite";
import { UserContext } from "./Context";
import "./Dashboard.css";
import { UserEvents } from "../UserEvents";

export const Dashboard = () => {
  const { user, SetUser } = useContext(UserContext);
  const [userDetails, SetUserDetails] = useState(null);
  const [loading, SetLoading] = useState(true);
  const [error, SetError] = useState(null);
  const [file, SetFile] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const newUser = await account.get();
        SetUser(newUser);

        // const userid = newUser.$id;

        // console.log(userid);
        const response = await databases.listDocuments(
          import.meta.env.VITE_DATABASE_ID,
          import.meta.env.VITE_COLLECTION_ID,
          [Query.equal("userId", newUser.$id)]
        );
        // console.log(response);
        if (response.documents.length > 0) {
          SetUserDetails(response.documents[0]);
          if (response.documents[0].photo) {
            const file = await storage.getFileView(
              import.meta.env.VITE_STORAGE_ID,
              response.documents[0].photo
            );
            SetFile(file.href);
          }
        } else {
          SetError("User details not found.");
        }
        // console.log(response);
      } catch (error) {
        console.log("User not logged in", error);
        SetError("User not logged in or failed to fetch user data.");
        SetUser(null);
      } finally {
        SetLoading(false);
      }
    };
    fetchUser();
  }, [SetUser]);

  if (loading) {
    return <div style={{ color: "white", fontSize: "50px" }}>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (user === null) {
    return <div>User not logged in</div>;
  }
  // console.log(userDetails);

  return (
    <div className="dash-wrapper">
      <div className="dash-container">
        <div className="user user-profile">
          <h1 className="user-heading">Your Profile</h1>
          <div className="info">
            <p>Username: {user.name}</p>
            <p>Email: {user.email}</p>
            {userDetails && (
              <>
                <p>First Name: {userDetails.firstName}</p>
                <p>Last Name: {userDetails.lastName}</p>
                <p>Address: {userDetails.address}</p>
                <p>Phone: {userDetails.phone}</p>
                <p>Company: {userDetails.company}</p>
                {file && (
                  <img className="user-profile" src={file} alt="User Photo" />
                )}
              </>
            )}
          </div>
        </div>
        <div className="user user-event">
          <h1 className="user-heading">Your Event</h1>
          <UserEvents />
        </div>
      </div>
    </div>
  );
};
