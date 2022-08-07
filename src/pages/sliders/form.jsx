import React, { useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { MyInputField } from "./MyField.jsx";
import axios from "axios";
import { useSelector } from "react-redux";

const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(70, "Too Long!")
    .required("Name Is Required"),
  mobile: Yup.string()
    .min(10, "Too Short!")
    .max(12, "Too Long!")
    .required("Mobile Is Required"),
  email: Yup.string().email("Invalid email").required("Email Is Required"),
  title: Yup.string().required("Title Is Required"),
  message: Yup.string().required("Your Message Is Required"),
});

function FormContact() {
  const user = useSelector((state) => state.user.data);
  const [selectedFile, setSelectedFile] = useState("");

  const onFileChange = (event) => {
    // Update the state
    setSelectedFile(event.target.files[0]);
    console.log("lej", selectedFile);
  };

  return (
    <Formik
      initialValues={{
        title: "",
        description: "",
        image: "",
      }}
      validationSchema={ContactSchema}
      onSubmit={(values) => {
        console.log("Start");
        console.log(values, selectedFile);
        // Create an object of formData
        const formDataa = new FormData();
        // Update the formData object
        formDataa.append("title", values.title);
        formDataa.append("description", values.description);
        formDataa.append("image", selectedFile);

        const options = {
          method: "post",
          url: `${process.env.REACT_APP_API_BASEURL}/api/admin/sliders`,
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
          },
          data: formDataa,
        };

        axios(options)
          .then(function (response) {
            console.log("response", response);
          })
          .catch(function (err) {
            console.log(err);
          });
      }}
    >
      {(formik) => (
        <Form>
          <div className="row g-3">
            <div className="col-md-12 fielddiv">
              <MyInputField name="title" type="text" placeholder="Title" />
            </div>
            <div className="col-md-12 fielddiv">
              <MyInputField
                name="description"
                type="text"
                placeholder="Description"
              />
            </div>
            <div className="col-md-12 fielddiv">
              <MyInputField
                name="img"
                type="file"
                placeholder="Img"
                onChange={(event) => onFileChange(event)}
              />
            </div>

            <div className="col-12">
              <button
                type="submit"
                className="btn"
                style={{
                  width: "100%",
                  minHeight: "30px",
                  borderRadius: 35,
                  backgroundColor: "black",
                  padding: "10px ",
                  fontSize: "18px",
                  width: "100%",
                  minHeight: "30px",
                  color: "white",
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default FormContact;
