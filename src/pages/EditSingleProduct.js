import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Alert,
  FormControl,
  InputGroup,
  Form as Select,
  Container,
  Col,
} from "react-bootstrap";
import Loading from "../components/Loading";
import CreateSchema from "../productSchema/CreateSchema";
import { LoadingOutlined } from "@ant-design/icons";
import Button from "@mui/material/Button";

import { Formik, Form } from "formik";
import SaveIcon from "@mui/icons-material/Save";
import { useHistory } from "react-router-dom";
import { message } from "antd";
import { Select as Selects } from "antd";
const { Option } = Selects;

export default function EditSingleProduct(props) {
  const user = useSelector((state) => state.user.data);
  const success = () => {
    message.success("You Edited Product");
  };

  const success2 = () => {
    message.success("You Deleted Image");
  };
  let history = useHistory();

  const [response, setResponse] = useState("");
  const [Pending, setPending] = useState(true);
  const [response2, setResponse2] = useState("");

  const [Pending2, setPending2] = useState(false);

  const [response3, setResponse3] = useState("");

  const [Pending3, setPending3] = useState(false);

  const [serverMsg, setServerMsg] = useState(null);
  const [categories, setCategories] = useState("");
  const [tags, setTags] = useState("");

  const [selectedTags, setSelectedTags] = useState([]);

  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [serverMsgs, setServerMsgs] = useState(null);

  function handleChange(value) {
    console.log(`selected `, value);
    // value.map()
    setSelectedTags(value.map((item) => item.value));
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

  useEffect(() => {
    const options2 = {
      method: "get",
      url: `${process.env.REACT_APP_API_BASEURL}/api/admin/products/${props.match.params.id}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    };

    axios(options2)
      .then(function (response) {
        console.log("handle sucss");
        console.log(response);

        setResponse(response.data.data);
        console.log(response.data.data.image);
        // setSelectedFile(response.data.data.image)
        setPending(false);
      })
      .catch(function (error) {
        console.log("hande rror");
        console.log(error);
      });

    // return () => {
    //   null;
    // };
    console.log("heello", response, Pending);
  }, []);

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

  const fileData = () => {
    if (selectedFile) {
      return (
        <div>
          <p>New image :</p>

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
  const submit = (values) => {
    console.log("Start");
    // console.log(values, selectedFile, selectedFiles);
    // Create an object of formData
    // const formDataa = new FormData();
    // // Update the formData object
    // formDataa.append("category_id", values.category_id);
    // formDataa.append("name[en]", values.English_Name);
    // formDataa.append("name[ar]", values.Arabic_Name);
    // formDataa.append("short_description[en]", values.English_short_description);
    // formDataa.append("short_description[ar]", values.Arabic_short_description);
    // formDataa.append("description[en]", values.English_description);
    // formDataa.append("description[ar]", values.Arabic_description);
    // formDataa.append("price", values.price);
    // formDataa.append("stock", values.stock);
    // formDataa.append("active", values.active === false ? 0 : 1);
    // formDataa.append("featured", values.featured === false ? 0 : 1);
    // formDataa.append("tag_ids[]", selectedTags);

    const options = {
      method: "post",
      url: `${process.env.REACT_APP_API_BASEURL}/api/admin/products/${props.match.params.id}?_method=put`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
      data: {
        category_id: values.category_id,
        name: { en: values.English_Name, ar: values.Arabic_Name },
        short_description: {
          en: values.English_short_description,
          ar: values.Arabic_short_description,
        },

        description: {
          en: values.English_description,
          ar: values.Arabic_description,
        },

        price: values.price,
        stock: values.stock,
        active: values.active === false ? 0 : 1,
        featured: values.featured === false ? 0 : 1,
        tag_ids: selectedTags,
      },
    };

    axios(options)
      .then(function (response) {
        success();
        console.log("edit", response);
        // history.push("/Products");
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  };

  const MainImageSubmit = () => {
    if (selectedFile !== null) {
      setPending2(true);

      console.log("Start");
      console.log(selectedFile);
      const formDataa = new FormData();
      // Update the formData object
      formDataa.append("image", selectedFile);

      const options = {
        method: "post",
        url: `${process.env.REACT_APP_API_BASEURL}/api/admin/products/${props.match.params.id}?_method=put`,
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
          console.log("edit", response);
          // history.push("/Products");

          setPending2(false);
        })
        .catch(function (response) {
          //handle error
          console.log(response);
          setPending2(false);
        });
    } else {
      alert("You dont change the image");
    }
  };

  const ImagesSubmit = () => {
    if (selectedFiles !== null) {
      setPending3(true);

      console.log("Start");
      console.log(selectedFiles);
      const formDataa = new FormData();
      // Update the formData object
      for (let i = 0; i < selectedFiles.length; i++) {
        formDataa.append("images[]", selectedFiles[i]);
        console.log(selectedFiles[i]);
      }

      const options = {
        method: "post",
        url: `${process.env.REACT_APP_API_BASEURL}/api/admin/products/${props.match.params.id}?_method=put`,
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
          console.log("edit", response);
          // history.push("/Products");

          setPending3(false);
        })
        .catch(function (response) {
          //handle error
          console.log(response);
          setPending3(false);
        });
    } else {
      alert("You dont add images");
    }
  };

  const deleteImg = (id) => {
    const options = {
      method: "delete",
      url: `${process.env.REACT_APP_API_BASEURL}/api/admin/media/${id}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    };

    axios(options)
      .then(function (response) {
        success2();
        console.log("delete", response.data.data);
        // history.push("/Products");
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  };

  const children = [];

  if (response) {
    for (let i = 0; i < response.tags.length; i++) {
      children.push({
        value: response.tags[i].id,
        label: response.tags[i].name,
        key: response.tags[i].id,
      });
      console.log(i, children);
    }
  }
  return Pending ? (
    <Loading />
  ) : (
    <Container>
      <Col md={6} xs={12} className="py-5 mx-auto">
        <h1>Edit Product Info</h1>
        {console.log("test", selectedTags)}
        <Formik
          initialValues={{
            category_id: response.category_id,
            Arabic_Name: response.name.ar,
            English_Name: response.name.en,
            Arabic_short_description: response.short_description.ar,
            English_short_description: response.short_description.en,
            Arabic_description: response.description.ar,
            English_description: response.description.en,
            price: response.price,

            stock: response.stock,

            active: response.active === 1 ? true : false,
            featured: response.featured === 1 ? true : false,
          }}
          validationSchema={CreateSchema}
          onSubmit={(values, actions) => {
            console.log(values);

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
                labelInValue
                defaultValue={children}
              >
                {/* {children} */}
                {tags &&
                  tags.map((tag) => (
                    <Option key={tag.id} value={tag.id}>
                      {tag.name}
                    </Option>
                  ))}
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
                  // onChange={(e) => console.log(e.target.checked)}
                  onChange={FormikProps.handleChange("active")}
                  name="active"
                  id="stoactiveck"
                  onChange={FormikProps.handleChange("active")}
                  value={FormikProps.values.active}
                  onBlur={FormikProps.handleBlur}
                  checked={FormikProps.values.active}
                />
              </Select.Group>

              <Select.Group className="mb-3" controlId="formBasicCheckbox">
                <Select.Check
                  type="checkbox"
                  label="featured"
                  // onChange={(e) => console.log(e.target.checked)}
                  onChange={FormikProps.handleChange("featured")}
                  name="featured"
                  id="featured"
                  onChange={FormikProps.handleChange("featured")}
                  value={FormikProps.values.featured}
                  onBlur={FormikProps.handleBlur}
                  checked={FormikProps.values.featured}
                />
              </Select.Group>

              <div>
                {/* <button type="submit">
            {loading ? <LoadingOutlined /> : "Create"}
          </button> */}

                {/* <Button type="submit" isLoading={loading}>
            Continue
          </Button> */}

                <Button
                  type="submit"
                  disabled={Pending}
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
                  {Pending ? (
                    <>
                      <LoadingOutlined />{" "}
                      <span className="px-2">Loading...</span>
                    </>
                  ) : (
                    <>
                      <SaveIcon /> <span className="px-2">Save</span>
                    </>
                  )}
                </Button>
              </div>
            </Form>
          )}
        </Formik>

        <h1>Edit Product Main Image</h1>
        <div className="d-flex align-items-center justify-content-start py-2">
          <p>old image :</p>
          <img src={response.image} style={{ width: "100px" }} />
        </div>
        <input
          type="file"
          onChange={(event) => onFileChange(event)}
          name="image"
          required
        />

        {fileData()}

        <Button
          onClick={() => MainImageSubmit()}
          disabled={Pending2}
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
          {Pending2 ? (
            <>
              <LoadingOutlined /> <span className="px-2">Loading...</span>
            </>
          ) : (
            <>
              <SaveIcon /> <span className="px-2">Save</span>
            </>
          )}
        </Button>

        <h1>Edit Product Images</h1>
        {response.images.map((img) => (
          <div className="d-flex align-items-center justify-content-start py-2">
            <p>old image {img.id} : </p>
            <img src={img.url} style={{ width: "100px" }} />

            <Button
              variant="dark"
              className="mx-2"
              onClick={() => deleteImg(img.id)}
            >
              <i class="fas fa-times"></i>{" "}
            </Button>
          </div>
        ))}
        <input
          type="file"
          onChange={(event) => onFileChange2(event)}
          name="image"
          required
          multiple
        />

        {fileData2()}

        <Button
          onClick={() => ImagesSubmit()}
          disabled={Pending3}
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
          {Pending3 ? (
            <>
              <LoadingOutlined /> <span className="px-2">Loading...</span>
            </>
          ) : (
            <>
              <SaveIcon /> <span className="px-2">Save</span>
            </>
          )}
        </Button>
      </Col>
    </Container>
  );
}
