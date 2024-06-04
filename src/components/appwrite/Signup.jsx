import { useState } from "react";
import { account, databases, storage } from "./appwrite";
import { useNavigate } from "react-router-dom";
import { AlertBox } from "./AlertBox";
import "./Signup.css";

export const Signup = () => {
  const [name, SetName] = useState("");
  const [firstName, SetFirstName] = useState("");
  const [lastName, SetLastName] = useState("");
  const [address, SetAddress] = useState("");
  const [phone, SetPhone] = useState("");
  const [photo, SetPhoto] = useState(null);
  const [company, SetCompany] = useState("");

  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");

  const [showAlert, SetAlert] = useState(false);

  const navigate = useNavigate();

  function handleFileSubmit(event) {
    // event.preventDefault();
    SetPhoto(event.target.files[0]);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const res = await account.create("unique()", email, password, name);
      // console.log("User creation response:", res);

      //make a sesion so that verification may work
      const sess = await account.createEmailPasswordSession(email, password);
      //send email verification
      await account.createVerification(
        "https://sarangthem01.netlify.app/verifyusers"
      );
      console.log("verification email sent");

      // Check if user ID is valid
      if (!res || !res.$id) {
        throw new Error("User creation failed, invalid user ID.");
      }

      let fileId = null;
      if (photo) {
        const uploadedFile = await storage.createFile(
          import.meta.env.VITE_APPWRITE_STORAGE_ID,
          "unique()",
          photo
        );
        fileId = uploadedFile.$id;
      }

      await databases.createDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID,
        "unique()",
        {
          userId: res.$id,
          firstName,
          lastName,
          address,
          phone,
          photo: fileId,
          company,
        }
      );

      if (res) {
        ////////////////////
        SetAlert(true);
        setTimeout(() => {
          navigate("/verifynote");
          SetName("");
          SetEmail("");
          SetPassword("");
        }, 5000);
        ////////////////
      }
      // console.log(name, email, password);
    } catch (error) {
      // console.error("Signup error:", error);
      alert("Signup failed!");
    }
  }

  return (
    <div className="form-wrapper">
      <h2>Sign Up now</h2>
      <form className="signup-container" onSubmit={handleSubmit}>
        {/* <div className="for-name"> */}
        <label htmlFor="name">User name:</label>
        <input
          type="name"
          name="name"
          placeholder="enter name.."
          value={name}
          onChange={(event) => SetName(event.target.value)}
        />

        <label htmlFor="firstName">First name:</label>
        <input
          type="text"
          name="firstname"
          placeholder="enter first name.."
          value={firstName}
          onChange={(event) => SetFirstName(event.target.value)}
        />

        <label htmlFor="lastname">Last name:</label>
        <input
          type="text"
          name="lastname"
          placeholder="enter last name.."
          value={lastName}
          onChange={(event) => SetLastName(event.target.value)}
        />
        {/* </div> */}
        {/* <br /> */}
        <label htmlFor="address">Address:</label>
        <input
          type="text"
          name="address"
          placeholder="enter address.."
          value={address}
          onChange={(event) => SetAddress(event.target.value)}
        />
        {/* <br /> */}
        <label htmlFor="phone">Phone no:</label>
        <input
          type="text"
          name="phone"
          placeholder="enter phone.."
          value={phone}
          onChange={(event) => SetPhone(event.target.value)}
        />
        {/* <br /> */}
        <label htmlFor="company">Company:</label>
        <input
          type="text"
          name="company"
          placeholder="enter company.."
          value={company}
          onChange={(event) => SetCompany(event.target.value)}
        />
        {/* <br /> */}
        <label htmlFor="photo">Photo:</label>
        <input type="file" name="photo" onChange={handleFileSubmit} />
        <br />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          placeholder="enter email.."
          value={email}
          onChange={(event) => SetEmail(event.target.value)}
        />
        {/* <br /> */}
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          placeholder="enter password.."
          value={password}
          onChange={(event) => SetPassword(event.target.value)}
        />
        {/* <br /> */}
        <button>SIGN UP</button>
      </form>
      {showAlert && (
        <AlertBox
          status={"Account Creation successful"}
          redirect={"Redirecting For Login.."}
        />
      )}
    </div>
  );
};
