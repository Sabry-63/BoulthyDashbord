import React from "react";
import {ErrorMessage, useField } from "formik";

export const MyInputField = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);
  return (
    <>
        <input
          {...field}
          {...props}
          className={`form-control shadow-none ${meta.touched && meta.error && 'is-invalid'}`}
          autoComplete="off"
        />
        
         <ErrorMessage name={field.name} component="div" className="errorfiled"/>
    </>
  );
};


export const MyTextField = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);
  return (
    <>
        <textarea 
          {...field}
          {...props}
          className={`form-control shadow-none ${meta.touched && meta.error && 'is-invalid'}`}
          autoComplete="off"
        />
        
         <ErrorMessage name={field.name} component="div" className="errorfiled"/>
    </>
  );
};