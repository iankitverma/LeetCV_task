import React, { createContext, useState, useEffect } from "react";

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState(() => {
    const savedFormData = localStorage.getItem("formData");
    return savedFormData
      ? JSON.parse(savedFormData)
      : {
          name: "",
          address: "",
          dob: "",
          phone: "",
          email: "",
        };
  });

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  return (
    <FormContext.Provider value={[formData, setFormData]}>
      {children}
    </FormContext.Provider>
  );
};
