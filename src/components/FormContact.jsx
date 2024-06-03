import React, { useState } from "react";
import "./FormContact.css";

export const FormContact = () => {
  const [enteredValues, setEnteredValues] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    address: "",
    customerEnquiry: "",
  });

  function handleSubmit(event) {
    event.preventDefault();
    console.log(enteredValues);
    setEnteredValues({
      firstname: "",
      lastname: "",
      phone: "",
      email: "",
      address: "",
      customerEnquiry: "",
    });
  }

  function handleInputChange(identifier, value) {
    setEnteredValues((prevValues) => ({
      ...prevValues,
      [identifier]: value,
    }));
  }

  return (
    <div className="form-container">
      <p>Fill in your details and enquiry below to reach us.</p>

      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="FirstName">First name:</label>
        <input
          type="text"
          placeholder="enter your first name"
          name="firstname"
          value={enteredValues.firstname}
          onChange={(event) =>
            handleInputChange("firstname", event.target.value)
          }
        />

        <label htmlFor="LastName">Last name:</label>
        <input
          type="text"
          placeholder="enter your last name"
          name="lastname"
          value={enteredValues.lastname}
          onChange={(event) =>
            handleInputChange("lastname", event.target.value)
          }
        />

        <label htmlFor="phone">Phone:</label>
        <input
          type="tel"
          name="phone"
          placeholder="enter your phone number"
          value={enteredValues.phone}
          onChange={(event) => handleInputChange("phone", event.target.value)}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          placeholder="enter email here"
          value={enteredValues.email}
          onChange={(event) => handleInputChange("email", event.target.value)}
        />

        <label htmlFor="addresss">Address:</label>
        <input
          type="text"
          name="address"
          placeholder="enter your address"
          value={enteredValues.address}
          onChange={(event) => handleInputChange("address", event.target.value)}
        />
        <p>
          <label htmlFor="customer-enquiry">Enquiry:</label>
        </p>
        <textarea
          name="customerEnquiry"
          id=""
          rows="10"
          cols="60"
          placeholder="enter your comments...."
          value={enteredValues.customerEnquiry}
          onChange={(event) =>
            handleInputChange("customerEnquiry", event.target.value)
          }
        />
        <button>SUBMIT</button>
      </form>
    </div>
  );
};
