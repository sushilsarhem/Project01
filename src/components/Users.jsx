import React, { useEffect, useState } from "react";
import "./Users.css";

export const Users = () => {
  const [users, setUsers] = useState([]);

  async function fetchUsers() {
    const res = await fetch("https://dummyjson.com/users?limit=16");
    const data = await res.json();
    const users = await data.users;
    setUsers(users);
    // console.log(users);
  }
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <div className="users-container">
        {users.map((user, id) => (
          <div key={id} className="single-user">
            <img src={user.image} alt={user.firstName} />
            <div>
              <p>
                Name:{user.firstName} {user.lastName}
              </p>
              <p>Address: {user.address.city}</p>
              <p>Date of birth: {user.birthDate}</p>
              <p>Sex: {user.gender}</p>
              <p>Phone: {user.phone}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
