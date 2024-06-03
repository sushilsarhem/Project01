import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import "./NavBar.css";
import { useEffect, useState } from "react";
import { account } from "./appwrite/appwrite";
import { useLogout } from "./appwrite/useLogout";
import { UserContext } from "./appwrite/Context";
import { useContext } from "react";

export const NavBar = () => {
  const [value, setValue] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 860);
  // const [user, SetUser] = useState(null);
  const { user, SetUser } = useContext(UserContext);
  const { LogOut } = useLogout();

  function toggleMenu() {
    setValue(!value);
  }

  useEffect(() => {
    function handleResize() {
      setIsLargeScreen(window.innerWidth > 860);
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchUser = async () => {
    try {
      const user = await account.get();
      SetUser(user);
    } catch (error) {
      console.log("User not logged in");
      SetUser(null);
    }
  };
  useEffect(() => {
    fetchUser();
  }, [user, SetUser]);

  return (
    <>
      <nav>
        <div className="container">
          <div className="logo">
            <Link to="/">Event Master</Link>
          </div>
          <ul
            className={`nav-list ${
              isLargeScreen || value ? "active" : "inactive"
            }`}
          >
            <li onClick={toggleMenu}>
              <Link to="/">Home</Link>
            </li>
            <li onClick={toggleMenu}>
              <Link to="/gallery">Gallery</Link>
            </li>
            {/* <li onClick={toggleMenu}>
              <Link to="/contact">Contact</Link>
            </li> */}

            {!user ? (
              <>
                <li onClick={toggleMenu}>
                  <Link to="/signup">SignUp</Link>
                </li>
                <li onClick={toggleMenu}>
                  <Link to="/login">Login</Link>
                </li>
              </>
            ) : (
              <>
                <li onClick={toggleMenu}>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li
                  onClick={() => {
                    toggleMenu();
                    LogOut();
                  }}
                >
                  <Link to="#">Logout</Link>
                </li>
              </>
            )}
            {/* <li onClick={toggleMenu}>
              <Link to="/signup">SignUp</Link>
            </li>
            <li onClick={toggleMenu}>
              <Link to="/login">Login</Link>
            </li>
            <li onClick={toggleMenu}>
              <Link to="/logout">Logout</Link>
            </li> */}
          </ul>
          {!value && !isLargeScreen ? (
            <FontAwesomeIcon
              icon={faBars}
              size="2x"
              onClick={toggleMenu}
              className="menu-bar"
            />
          ) : (
            <FontAwesomeIcon
              icon={faTimes}
              size="2x"
              className="close"
              onClick={toggleMenu}
            />
          )}
        </div>
      </nav>
    </>
  );
};
