import {
  Alert,
  FormControl,
  InputGroup,
  Form as Select,
  Container,
  Col,
} from "react-bootstrap";
import { Formik, Form } from "formik";

import { LoadingOutlined } from "@ant-design/icons";
import Button from "@mui/material/Button";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import CreateSchema from "../blogSchema/CreateSchema";
import { useHistory } from "react-router-dom";
import { message } from "antd";
import SaveIcon from "@mui/icons-material/Save";

import { Select as Selects } from "antd";
const { Option } = Selects;
export default function CreateBlog() {
  const user = useSelector((state) => state.user.data);
  const [tags, setTags] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  const [selectedFile, setSelectedFile] = useState("");
  const [selectedFiles, setSelectedFiles] = useState("");
  const [serverMsg, setServerMsg] = useState(null);
  const [serverMsgs, setServerMsgs] = useState(null);

  const [loading, setLoading] = useState("");

  function handleChange(value) {
    console.log(`selected ${value}`);
    setSelectedTags(value);
  }

  useEffect(() => {
    const options2 = {
      method: "get",
      url: `${process.env.REACT_APP_API_BASEURL}/api/admin/tags`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    };

    axios(options2)
      .then(function (response) {
        console.log("tag", response.data.data.data);
        setTags(response.data.data.data);
      })
      .catch(function (error) {
        //handle error
        console.log("tag error", error);
      });
  }, []);

  const success = () => {
    message.success("You Created Blog");
  };
  let history = useHistory();

  const onFileChange = (event) => {
    // Update the state
    setSelectedFile(event.target.files[0]);
    console.log("lej", selectedFile);
  };
  const onFileChange2 = (event) => {
    // let images = [];

    // Update the state

    setSelectedFiles(event.target.files);

    console.log("images3", selectedFiles);
  };

  const submit = (values) => {
    setLoading(true);
    console.log("Start");
    console.log(values, selectedFile, selectedFiles);
    // Create an object of formData
    const formDataa = new FormData();
    // Update the formData object
    formDataa.append("title[en]", values.English_title);
    formDataa.append("title[ar]", values.Arabic_title);
    formDataa.append("short_description[en]", values.English_short_description);
    formDataa.append("short_description[ar]", values.Arabic_short_description);
    formDataa.append("description[en]", values.English_description);
    formDataa.append("description[ar]", values.Arabic_description);
    formDataa.append("active", values.active === false ? 0 : 1);

    formDataa.append("tag_ids[]", selectedTags);

    formDataa.append("image", selectedFile);

    for (let i = 0; i < selectedFiles.length; i++) {
      formDataa.append("images[]", selectedFiles[i]);
      console.log(selectedFiles[i]);
    }

    const options = {
      method: "post",
      url: `${process.env.REACT_APP_API_BASEURL}/api/admin/blogs`,
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
        setLoading(false);
      })
      .catch(function (err) {
        //handle error
        console.log(err.response);
        setServerMsg(err.response.data.data);
      });
  };
  const fileData = () => {
    if (selectedFile) {
      return (
        <div>
          {console.log(selectedFile)}
          <h2>File Details:</h2>

          <p>File Name: {selectedFile.name}</p>

          <p>File Type: {selectedFile.type}</p>

          <p>Last Modified: {selectedFile.lastModifiedDate.toDateString()}</p>

          <div className="d-flex align-items-center justify-content-start">
            <p> File image :</p>

            <img
              src={URL.createObjectURL(selectedFile)}
              style={{ width: "100px" }}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  };

  const fileData2 = () => {
    if (selectedFiles) {
      var images = [];

      for (let i = 0; i < selectedFiles.length; i++) {
        images.push(selectedFiles[i]);
      }
      return (
        <div>
          {images.map((img) => (
            <div className="">
              <p>File Name: {img.name}</p>

              <img
                src={URL.createObjectURL(img)}
                alt="test"
                style={{ width: "100px" }}
              />
            </div>
          ))}
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  };

  return (
    <Container>
      <Col md={6} xs={12} className="py-5 mx-auto">
        <Formik
          initialValues={{
            Arabic_title: "",
            English_title: "",
            Arabic_short_description: "",
            English_short_description: "",
            Arabic_description: "",
            English_description: "",

            active: false,
          }}
          validationSchema={CreateSchema}
          onSubmit={(values, actions) => {
            // console.log(values, selectedFile, selectedFiles);

            submit(values);
          }}
        >
          {(FormikProps) => (
            <Form style={{ width: "100%" }}>
              {serverMsgs !== null
                ? serverMsgs.map((msg) => (
                    <Alert variant="primary">{msg}</Alert>
                  ))
                : null}

              {serverMsg !== null ? (
                <Alert variant="primary">{serverMsg}</Alert>
              ) : null}
              <Selects
                mode="tags"
                style={{ width: "100%" }}
                placeholder="Tags ids"
                onChange={handleChange}
                className="pb-2"
              >
                {/* {children} */}
                {tags &&
                  tags.map((tag) => <Option key={tag.id}>{tag.name}</Option>)}
              </Selects>

              <div className="mb-3">
                <InputGroup>
                  <InputGroup.Text>
                    <i class="fas fa-language"></i>{" "}
                  </InputGroup.Text>
                  <FormControl
                    type="text"
                    placeholder="Arabic Title"
                    name="Arabic_title"
                    id="Arabic_title"
                    onChange={FormikProps.handleChange("Arabic_title")}
                    value={FormikProps.values.Arabic_title}
                    onBlur={FormikProps.handleBlur}
                    required
                  />
                </InputGroup>
                {FormikProps.touched.Arabic_title &&
                FormikProps.errors.Arabic_title ? (
                  <small className="text-danger text-center">
                    {FormikProps.touched.Arabic_title &&
                      FormikProps.errors.Arabic_title}
                  </small>
                ) : null}
              </div>
              <div className="mb-3">
                <InputGroup>
                  <InputGroup.Text>
                    <i class="fas fa-language"></i>{" "}
                  </InputGroup.Text>
                  <FormControl
                    type="text"
                    placeholder="English Title"
                    name="English_title"
                    id="English_title"
                    onChange={FormikProps.handleChange("English_title")}
                    value={FormikProps.values.English_title}
                    onBlur={FormikProps.handleBlur}
                    required
                  />
                </InputGroup>
                {FormikProps.touched.English_title &&
                FormikProps.errors.English_title ? (
                  <small className="text-danger text-center">
                    {FormikProps.touched.English_title &&
                      FormikProps.errors.English_title}
                  </small>
                ) : null}
              </div>

              <div className="mb-3">
                <InputGroup>
                  <InputGroup.Text>
                    <i class="fas fa-language"></i>{" "}
                  </InputGroup.Text>
                  <FormControl
                    type="text"
                    as="textarea"
                    rows={3}
                    placeholder="Arabic short description"
                    name="Arabic_short_description"
                    id="Arabic_short_description"
                    onChange={FormikProps.handleChange(
                      "Arabic_short_description"
                    )}
                    value={FormikProps.values.Arabic_short_description}
                    onBlur={FormikProps.handleBlur}
                    required
                  />
                </InputGroup>
                {FormikProps.touched.Arabic_short_description &&
                FormikProps.errors.Arabic_short_description ? (
                  <small className="text-danger text-center">
                    {FormikProps.touched.Arabic_short_description &&
                      FormikProps.errors.Arabic_short_description}
                  </small>
                ) : null}
              </div>

              <div className="mb-3">
                <InputGroup>
                  <InputGroup.Text>
                    <i class="fas fa-language"></i>{" "}
                  </InputGroup.Text>
                  <FormControl
                    type="text"
                    as="textarea"
                    rows={3}
                    placeholder="English short description"
                    name="English_short_description"
                    id="English_short_description"
                    onChange={FormikProps.handleChange(
                      "English_short_description"
                    )}
                    value={FormikProps.values.English_short_description}
                    onBlur={FormikProps.handleBlur}
                    required
                  />
                </InputGroup>
                {FormikProps.touched.English_short_description &&
                FormikProps.errors.English_short_description ? (
                  <small className="text-danger text-center">
                    {FormikProps.touched.English_short_description &&
                      FormikProps.errors.English_short_description}
                  </small>
                ) : null}
              </div>

              <div className="mb-3">
                <InputGroup>
                  <InputGroup.Text>
                    <i class="fas fa-language"></i>{" "}
                  </InputGroup.Text>
                  <FormControl
                    type="text"
                    as="textarea"
                    rows={3}
                    placeholder="Arabic description"
                    name="Arabic_description"
                    id="Arabic_description"
                    onChange={FormikProps.handleChange("Arabic_description")}
                    value={FormikProps.values.Arabic_description}
                    onBlur={FormikProps.handleBlur}
                    required
                  />
                </InputGroup>
                {FormikProps.touched.Arabic_description &&
                FormikProps.errors.Arabic_description ? (
                  <small className="text-danger text-center">
                    {FormikProps.touched.Arabic_description &&
                      FormikProps.errors.Arabic_description}
                  </small>
                ) : null}
              </div>
              <div className="mb-3">
                <InputGroup>
                  <InputGroup.Text>
                    <i class="fas fa-language"></i>{" "}
                  </InputGroup.Text>
                  <FormControl
                    type="text"
                    as="textarea"
                    rows={3}
                    placeholder="English description"
                    name="English_description"
                    id="English_description"
                    onChange={FormikProps.handleChange("English_description")}
                    value={FormikProps.values.English_description}
                    onBlur={FormikProps.handleBlur}
                    required
                  />
                </InputGroup>
                {FormikProps.touched.English_description &&
                FormikProps.errors.English_description ? (
                  <small className="text-danger text-center">
                    {FormikProps.touched.English_description &&
                      FormikProps.errors.English_description}
                  </small>
                ) : null}
              </div>

              <Select.Group className="mb-3" controlId="formBasicCheckbox">
                <Select.Check
                  type="checkbox"
                  label="active"
                  // onChange={(e) => console.log(e.target.checked)}
                  onChange={FormikProps.handleChange("active")}
                  name="active"
                  id="stoactiveck"
                  onChange={FormikProps.handleChange("active")}
                  value={FormikProps.values.active}
                  onBlur={FormikProps.handleBlur}
                />
              </Select.Group>

              <h1> Blog Main Image</h1>

              <input
                type="file"
                onChange={(event) => onFileChange(event)}
                name="image"
                required
              />

              {fileData()}

              <h1> Blog Images</h1>

              <input
                type="file"
                onChange={(event) => onFileChange2(event)}
                multiple
              />

              {fileData2()}

              <div>
                <Button
                  type="submit"
                  disabled={loading}
                  style={{ width: "100%", minHeight: "30px" }}
                  // startIcon={<SaveIcon />}
                  style={{
                    borderRadius: 35,
                    backgroundColor: "black",
                    padding: "10px ",
                    fontSize: "18px",
                    width: "100%",
                    minHeight: "30px",
                  }}
                  variant="contained"
                >
                  {loading ? (
                    <>
                      <LoadingOutlined />{" "}
                      <span className="px-2">Loading...</span>
                    </>
                  ) : (
                    <>
                      <SaveIcon /> <span className="px-2">Create</span>
                    </>
                  )}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Col>
    </Container>
  );
}
