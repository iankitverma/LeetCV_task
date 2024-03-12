import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FormContext } from "../FormContext";

const Details = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useContext(FormContext);

  const handleClear = () => {
    const clearedFormData = {};
    Object.keys(formData).forEach((key) => {
      clearedFormData[key] = "";
    });
    setFormData(clearedFormData);
  };

  return (
    <div className="bg-lightgreen-500 min-h-screen flex flex-col items-center">
      <h1 className="text-2xl font-bold text-gray-800 m-10">Details</h1>
      <div className="border border-gray-300 rounded-lg shadow-md shadow-green-800 p-8 max-w-md w-full">
        <form>
          {Object.keys(formData).map((key) => (
            <div className="mb-4" key={key}>
              <label htmlFor={key} className="mb-1 mr-5 block">
                {key === "dob"
                  ? key.toUpperCase()
                  : key.charAt(0).toUpperCase() + key.slice(1)}
                :
              </label>
              <input
                type="text"
                id={key}
                name={key}
                value={formData[key]}
                readOnly
                className="border-b-2 border-gray-300 px-2 py-1 w-full focus:outline-none focus:border-blue-500"
              />
            </div>
          ))}
          <div className="flex justify-between">
            <button
              type="button"
              className="bg-red-500 text-white rounded-lg px-4 py-2 mt-4 hover:bg-red-600 transition duration-150 ease-in-out"
              onClick={handleClear}
            >
              Clear
            </button>
            <button
              type="button"
              className="inline-block rounded-full bg-blue-500 px-4 py-2 text-xs font-medium text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              onClick={() => navigate("/")}
            >
              Home
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Details;
