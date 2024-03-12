import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FormContext } from "../FormContext";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Test_Cases = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useContext(FormContext);
  const [email, setEmail] = useState(formData.email || "");
  const [phone, setPhone] = useState(formData.phone || "");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  useEffect(() => {
    setEmail(formData.email || "");
    setPhone(formData.phone || "");
  }, [formData]);

  const handlePrevious = () => {
    navigate("/");
  };

  const handleNext = () => {
    if (!validateEmail(email)) {
      setEmailError("Invalid email address");
      toast.error("Invalid email address");
      return;
    }

    if (!phone) {
      setPhoneError("Mobile number must be present");
      toast.error("Mobile number must be present");
      return;
    }

    setFormData({
      ...formData,
      email,
      phone,
    });
    navigate("/details");
  };

  const handlePhoneChange = (value, country) => {
    setPhone(value);
  };

  const handlePhoneBlur = () => {
    if (phone && phone.length >= 2) {
      setPhone(`+${phone}`);
    }
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold text-gray-800 m-10">Test Cases</h1>
      <div className="border border-gray-300 rounded-lg shadow-md shadow-green-800 p-8 max-w-md w-full">
        <div className="mb-4">
          <label htmlFor="email" className="mb-1 mr-5 block">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-b-2 border-gray-300 px-2 py-1 w-full focus:outline-none focus:border-blue-500"
            required
          />
          {emailError && <span className="text-red-500">{emailError}</span>}
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="mb-1 mr-5 block">
            Mobile Number:
          </label>
          <PhoneInput
            country={"us"}
            value={phone}
            onChange={handlePhoneChange}
            onBlur={handlePhoneBlur}
            inputProps={{
              name: "phone",
              required: true,
            }}
            containerStyle={{ width: "100%" }}
          />
          {phoneError && <span className="text-red-500">{phoneError}</span>}
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            className="bg-slate-500 text-white rounded-lg px-4 py-2 mt-4 hover:bg-slate-600 transition duration-150 ease-in-out"
            onClick={handlePrevious}
          >
            Previous
          </button>
          <button
            type="button"
            className="inline-block rounded-full bg-blue-500 px-4 py-2 text-xs font-medium text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

export default Test_Cases;
