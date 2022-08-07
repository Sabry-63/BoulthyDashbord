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
import CreateSchema from "../productSchema/CreateSchema";
import { useHistory } from "react-router-dom";
import { message } from "antd";
import SaveIcon from "@mui/icons-material/Save";

import { Select as Selects } from "antd";
const { Option } = Selects;
export default function CreateProduct() {
  const user = useSelector((state) => state.user.data);
  const [categories, setCategories] = useState("");
  const [tags, setTags] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  const [selectedFile, setSelectedFile] = useState("");
  const [selectedFiles, setSelectedFiles] = useState("");

  function handleChange(value) {
    console.log(`selected ${value}`);
    setSelectedTags(value);
  }

  useEffect(() => {
    const options = {
      method: "get",
      url: `${process.env.REACT_APP_API_BASEURL}/api/admin/categories`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    };

    axios(options)
      .then(function (response) {
        console.log("cat", response.data.data.data);
        setCategories(response.data.data.data);
      })
      .catch(function (error) {
        //handle error
        console.log("cat error", error);
      });

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
    message.success("You Created Product");
  };
  let history = useHistory();

  const [serverMsg, setServerMsg] = useState(null);
  const [serverMsgs, setServerMsgs] = useState(null);

  const [loading, setLoading] = useState("");

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
    formDataa.append("category_id", values.category_id);
    formDataa.append("name[en]", values.English_Name);
    formDataa.append("name[ar]", values.Arabic_Name);
    formDataa.append("short_description[en]", values.English_short_description);
    formDataa.append("short_description[ar]", values.Arabic_short_description);
    formDataa.append("description[en]", values.English_description);
    formDataa.append("description[ar]", values.Arabic_description);
    formDataa.append("price", values.price);
    formDataa.append("stock", values.stock);
    formDataa.append("active", values.active === false ? 0 : 1);
    formDataa.append("featured", values.featured === false ? 0 : 1);
    formDataa.append("tag_ids[]", selectedTags);

    formDataa.append("image", selectedFile);

    for (let i = 0; i < selectedFiles.length; i++) {
      formDataa.append("images[]", selectedFiles[i]);
      console.log(selectedFiles[i]);
    }

    const options = {
      method: "post",
      url: `${process.env.REACT_APP_API_BASEURL}/api/admin/products`,
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
        console.log("response",response);
        setLoading(false);
        setServerMsg(null);
      })
      .catch(function (err) {
        //handle error
        setServerMsg(err.response.data.data);

        console.log(err);
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
            category_id: "1",
            Arabic_Name: "",
            English_Name: "",
            Arabic_short_description: "",
            English_short_description: "",
            Arabic_description: "",
            English_description: "",
            price: "",

            stock: "",

            active: false,
            featured: false,
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
                    {" "}
                    <i className="fas fa-key"></i>
                  </InputGroup.Text>

                  <Select.Select
                    name="category_id"
                    id="category_id"
                    onChange={FormikProps.handleChange("category_id")}
                    value={FormikProps.values.category_id}
                    onBlur={FormikProps.handleBlur}
                    required
                  >
                    <option disabled>Product category </option>

                    {categories &&
                      categories.map((cat) => (
                        <option value={cat.id}>{cat.name}</option>
                      ))}

                    {/* <option value="2">2</option> */}
                  </Select.Select>
                </InputGroup>
                {FormikProps.touched.category_id &&
                FormikProps.errors.category_id ? (
                  <small className="text-danger text-center ">
                    {FormikProps.touched.category_id &&
                      FormikProps.errors.category_id}
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
                    placeholder="Arabic_Name"
                    name="Arabic_Name"
                    id="Arabic_Name"
                    onChange={FormikProps.handleChange("Arabic_Name")}
                    value={FormikProps.values.Arabic_Name}
                    onBlur={FormikProps.handleBlur}
                    required
                  />
                </InputGroup>
                {FormikProps.touched.Arabic_Name &&
                FormikProps.errors.Arabic_Name ? (
                  <small className="text-danger text-center">
                    {FormikProps.touched.Arabic_Name &&
                      FormikProps.errors.Arabic_Name}
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
                    placeholder="English_Name"
                    name="English_Name"
                    id="English_Name"
                    onChange={FormikProps.handleChange("English_Name")}
                    value={FormikProps.values.English_Name}
                    onBlur={FormikProps.handleBlur}
                    required
                  />
                </InputGroup>
                {FormikProps.touched.English_Name &&
                FormikProps.errors.English_Name ? (
                  <small className="text-danger text-center">
                    {FormikProps.touched.English_Name &&
                      FormikProps.errors.English_Name}
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

              <div className="mb-3">
                <InputGroup>
                  <InputGroup.Text>
                    <i class="fas fa-hand-holding-usd"></i>{" "}
                  </InputGroup.Text>
                  <FormControl
                    type="number"
                    placeholder="price"
                    name="price"
                    id="price"
                    onChange={FormikProps.handleChange("price")}
                    value={FormikProps.values.price}
                    onBlur={FormikProps.handleBlur}
                    required
                  />
                </InputGroup>
                {FormikProps.touched.price && FormikProps.errors.price ? (
                  <small className="text-danger text-center">
                    {FormikProps.touched.price && FormikProps.errors.price}
                  </small>
                ) : null}
              </div>

              <div className="mb-3">
                <InputGroup>
                  <InputGroup.Text>
                    <i class="fas fa-store"></i>{" "}
                  </InputGroup.Text>
                  <FormControl
                    type="number"
                    placeholder="stock"
                    name="stock"
                    id="stock"
                    onChange={FormikProps.handleChange("stock")}
                    value={FormikProps.values.stock}
                    onBlur={FormikProps.handleBlur}
                    required
                  />
                </InputGroup>
                {FormikProps.touched.stock && FormikProps.errors.stock ? (
                  <small className="text-danger text-center">
                    {FormikProps.touched.stock && FormikProps.errors.stock}
                  </small>
                ) : null}
              </div>

              <Select.Group className="mb-3" controlId="formBasicCheckbox">
                <Select.Check
                  type="checkbox"
                  label="active"
                  onChange={FormikProps.handleChange("active")}
                  name="active"
                  id="stoactiveck"
                  value={FormikProps.values.active}
                  onBlur={FormikProps.handleBlur}
                />
              </Select.Group>

              <Select.Group className="mb-3" controlId="formBasicCheckbox">
                <Select.Check
                  type="checkbox"
                  label="featured"
                  onChange={FormikProps.handleChange("featured")}
                  name="featured"
                  id="featured"
                  value={FormikProps.values.featured}
                  onBlur={FormikProps.handleBlur}
                />
              </Select.Group>

              <h1> Product Main Image</h1>

              <input
                type="file"
                onChange={(event) => onFileChange(event)}
                name="image"
                required
              />

              {fileData()}

              <h1> Product Images</h1>

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
                  style={{
                    width: "100%",
                    minHeight: "30px",
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
