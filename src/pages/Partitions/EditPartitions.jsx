import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Container,
  FormControl,
  InputGroup,
  Form as Form2,
} from "react-bootstrap";
import { Formik, Form } from "formik";
import axios from "axios";
import { message } from "antd";
import FetchDataApi from "../api/inedx.jsx";
import Spinner from "../Spinner/Spinner.js";
import { useHistory } from "react-router-dom";

export default function EditPartitions(props) {
  const user = useSelector((state) => state.user.data);
  let history = useHistory();

  const [serverMsg, setServerMsg] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState("");
  const [data, setData] = useState("");
  const [formLoading, setFormLoading] = useState(false);

  const success = () => {
    message.success("You Are Successfully The Partitions");
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
              src={URL.createObjectURL(selectedFile)}
              alt="edit"
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
      url: `${process.env.REACT_APP_API_BASEURL}/api/admin/partitions/${props.match.params.id}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    };
    FetchDataApi(options, setData, setDataLoading, setServerMsg);
  }, []);

  const Create = (values) => {
    setFormLoading(true);

    // Create an object of formData
    const formDataa = new FormData();
    // Update the formData object
    formDataa.append("photo", selectedFile);
    formDataa.append("title[en]", values.enTitle);
    formDataa.append("sub_title[en]", values.enSubTitle);
    formDataa.append("description[en]", values.enDescription);
    formDataa.append("short_description[en]", values.enShortDescription);
    formDataa.append("active", 1);
    const options = {
      method: "post",
      url: `${process.env.REACT_APP_API_BASEURL}/api/admin/partitions/${props.match.params.id}?_method=put`,
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
        console.log(response);
        setServerMsg(null);
        setFormLoading(false);
        history.push("/Partitions");
      })
      .catch(function (err) {
        //handle error
        setServerMsg(err.response.data.data);
        errors(err);
      });
  };

  return (
    <main className="w-100">
      <Container>
        <h1>Edit Partitions </h1>
        {dataLoading ? (
          <Spinner />
        ) : (
          <Formik
            initialValues={{
              enTitle: data.title.en,
            }}
            enableReinitialize
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

                <InputGroup className="mb-3">
                  <InputGroup.Text>Title</InputGroup.Text>
                  <FormControl
                    type="text"
                    placeholder="Title"
                    name="enTitle"
                    id="enTitle"
                    onChange={FormikProps.handleChange("enTitle")}
                    value={FormikProps.values.enTitle}
                    onBlur={FormikProps.handleBlur}
                    required
                  />
                  {FormikProps.touched.enTitle && FormikProps.errors.enTitle ? (
                    <small className="text-danger text-center w-100">
                      {FormikProps.touched.enTitle &&
                        FormikProps.errors.enTitle}
                    </small>
                  ) : null}
                </InputGroup>




                <div className=" text-right ">
                  <button className="btn btn-primary w-100" type="submit">
                    {formLoading ? <Spinner /> : "Update"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </Container>
    </main>
  );
}
