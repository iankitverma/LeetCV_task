import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FormContext } from "../FormContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Wizard_stepper = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useContext(FormContext);
  const [errors, setErrors] = useState({
    name: "",
    address: "",
    dob: "",
  });

  const [name, setName] = useState(formData.name || "");
  const [address, setAddress] = useState(formData.address || "");
  const [dob, setDob] = useState(formData.dob || "");

  useEffect(() => {
    // Update local state when formData changes
    setName(formData.name || "");
    setAddress(formData.address || "");
    setDob(formData.dob || "");
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "name") setName(value);
    else if (name === "address") setAddress(value);
    else if (name === "dob") setDob(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      navigate("/test_Cases");
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    }

    if (!address.trim()) {
      newErrors.address = "Address is required";
      valid = false;
    }

    if (!dob) {
      newErrors.dob = "Date of Birth is required";
      valid = false;
    } else {
      const selectedDate = new Date(dob);
      const currentDate = new Date();

      if (selectedDate > currentDate) {
        newErrors.dob = "Date of Birth cannot be in the future";
        valid = false;
      }
    }

    setErrors(newErrors);

    if (!valid) {
      Object.values(newErrors).forEach((error) => {
        toast.error(error, { position: "top-right" });
      });
    }

    return valid;
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold text-gray-800 m-10">Wizard Stepper</h1>
      <form
        className="border border-gray-300 rounded-lg shadow-md shadow-green-800 p-8 max-w-md w-full"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="mb-4">
          <label htmlFor="name" className="mb-1 block text-gray-800">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            value={name}
            onChange={handleChange}
            className="border-b-2 border-gray-300 px-2 py-1 w-full focus:outline-none focus:border-blue-500"
            required
          />
          {errors.name && <span className="text-red-500">{errors.name}</span>}
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="mb-1 block text-gray-800">
            Address:
          </label>
          <input
            type="text"
            id="address"
            name="address"
            placeholder="Enter your address"
            value={address}
            onChange={handleChange}
            className="border-b-2 border-gray-300 px-2 py-1 w-full focus:outline-none focus:border-blue-500"
            required
          />
          {errors.address && (
            <span className="text-red-500">{errors.address}</span>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="dob" className="mb-1 block text-gray-800">
            Date of Birth:
          </label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={dob}
            onChange={handleChange}
            className="border-b-2 border-gray-300 px-2 py-1 w-full focus:outline-none focus:border-blue-500"
            required
          />
          {errors.dob && <span className="text-red-500">{errors.dob}</span>}
        </div>
        <button
          type="submit"
          className="inline-block rounded-full bg-blue-500 px-6 py-2 text-xs font-medium text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Next
        </button>
      </form>
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

export default Wizard_stepper;
