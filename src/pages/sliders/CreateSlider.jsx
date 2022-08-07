
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Container,
  InputGroup,
  Form as Form2,
  FormControl,
} from "react-bootstrap";
import { Formik, Form } from "formik";
import axios from "axios";
import { message } from "antd";
import FetchDataApi from "../api/inedx.jsx";
import Spinner from "../Spinner/Spinner";
import { useHistory } from "react-router-dom";

export default function CreateSlider() {
  let history = useHistory();
  const user = useSelector((state) => state.user.data);
  const [serverMsg, setServerMsg] = useState([]);
  const [slider, setSlider] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState("");
  const [formLoading, setFormLoading] = useState(false);

  const success = () => {
    message.success("You Are Successfully Create Slider");
  };

  const errors = () => {
    message.error("somthing wrong");
  };

  const onFileChange = (event) => {
    // Update the state
    setSelectedFile(event.target.files[0]);
  };

  const fileData = () => {
    if (selectedFile) {
      return (
        <div>
          <div className="d-flex align-items-center justify-content-center w-100">
            <img
              alt="add"
              src={URL.createObjectURL(selectedFile)}
              style={{
                width: "400px",
                border: "1px solid white",
                margin: "20px",
              }}
            />
          </div>
        </div>
      );
    } else {
      return null;
    }
  };

  useEffect(() => {
    const options = {
      method: "get",
      url: `${process.env.REACT_APP_API_BASEURL}/api/admin/sliders`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    };
    FetchDataApi(options, setSlider, setDataLoading, setServerMsg);
  }, []);

  const Create = (values) => {
    setFormLoading(true);

    // Create an object of formData
    const formDataa = new FormData();
    formDataa.append("photo", selectedFile);
    formDataa.append("title[en]", values.title_english);
    formDataa.append("title[ar]", values.title_arabic);
    formDataa.append("description[en]", values.description_english);
    formDataa.append("description[ar]", values.description_arabic);
    formDataa.append("active", values.active);

    

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
        success();
        setServerMsg(null);
        setFormLoading(false);
        history.push("/Slider");
      })
      .catch(function (err) {
        //handle error
        setServerMsg(err.response.data.data);
        errors();
      });
  };

  return (
    <main className="w-100">
      <Container>
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="fw-bold"> Create Slider</h1>
        </div>
        <Formik
          initialValues={{
            title_english: "",
            title_arabic: "",
            description_english: "",
            description_arabic: "",
            active: 1,
          }}
          enableReinitialize
          validationSchema=""
          onSubmit={(values, actions) => {
            Create(values);
          }}
        >
          {(FormikProps) => (
            <Form className="formHolder">
              {fileData()}
              <div className="d-flex align-items-center justify-content-center">
                <input
                  type="file"
                  onChange={(event) => onFileChange(event)}
                  name="image"
                  required
                  className="mt-2 mb-3 mx-5"
                />
              </div>

              

              <InputGroup className="mb-3 ">
                <InputGroup.Text>Title English</InputGroup.Text>
                <FormControl
                  placeholder="Title English"
                  name="title_english"
                  id="title_english"
                  onChange={FormikProps.handleChange("title_english")}
                  value={FormikProps.values.title_english}
                  onBlur={FormikProps.handleBlur}
                  required
                />
                {FormikProps.touched.title && FormikProps.errors.title ? (
                  <small className="text-danger text-center w-100">
                    {FormikProps.touched.title && FormikProps.errors.title}
                  </small>
                ) : null}
              </InputGroup>

              
              
              <InputGroup className="mb-3 ">
                <InputGroup.Text>Title Arabic</InputGroup.Text>
                <FormControl
                  placeholder="Title Arabic"
                  name="title_arabic"
                  id="title_arabic"
                  onChange={FormikProps.handleChange("title_arabic")}
                  value={FormikProps.values.title_arabic}
                  onBlur={FormikProps.handleBlur}
                  required
                />
                {FormikProps.touched.title && FormikProps.errors.title ? (
                  <small className="text-danger text-center w-100">
                    {FormikProps.touched.title && FormikProps.errors.title}
                  </small>
                ) : null}
              </InputGroup>


              <InputGroup className="mb-3 ">
                <InputGroup.Text>Description English</InputGroup.Text>
                <FormControl
                  placeholder="Description English"
                  name="description_english"
                  id="description_english"
                  onChange={FormikProps.handleChange("description_english")}
                  value={FormikProps.values.description_english}
                  onBlur={FormikProps.handleBlur}
                  required
                />
                {FormikProps.touched.description &&
                FormikProps.errors.description ? (
                  <small className="text-danger text-center w-100">
                    {FormikProps.touched.description &&
                      FormikProps.errors.description}
                  </small>
                ) : null}
              </InputGroup>


              <InputGroup className="mb-3 ">
                <InputGroup.Text>Description Arabic</InputGroup.Text>
                <FormControl
                  placeholder="Description Arabic"
                  name="description_arabic"
                  id="description_arabic"
                  onChange={FormikProps.handleChange("description_arabic")}
                  value={FormikProps.values.description_arabic}
                  onBlur={FormikProps.handleBlur}
                  required
                />
                {FormikProps.touched.description &&
                FormikProps.errors.description ? (
                  <small className="text-danger text-center w-100">
                    {FormikProps.touched.description &&
                      FormikProps.errors.description}
                  </small>
                ) : null}
              </InputGroup>


              <div className=" text-right ">
                <button className="theme-btn btn" type="submit" 
                    style={{
                      width: "100%",
                      minHeight: "30px",
                      borderRadius: 35,
                      backgroundColor: "black",
                      padding: "10px ",
                      fontSize: "18px",
                      color: "white",
                    }}>
                  {formLoading ? <Spinner /> : "Create"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </Container>
    </main>
  );
}
