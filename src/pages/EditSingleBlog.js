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
import CreateSchema from "../blogSchema/CreateSchema";
import { LoadingOutlined } from "@ant-design/icons";
import Button from "@mui/material/Button";

import { Formik, Form } from "formik";
import SaveIcon from "@mui/icons-material/Save";
import { useHistory } from "react-router-dom";
import { message } from "antd";
import { Select as Selects } from "antd";
const { Option } = Selects;

export default function EditSingleBlog(props) {
  const user = useSelector((state) => state.user.data);
  const success = () => {
    message.success("You Edited Blog");
  };

  const success2 = () => {
    message.success("You Deleted Image");
  };
  let history = useHistory();

  const [response, setResponse] = useState("");
  const [Pending, setPending] = useState(true);
  const [Pendingg, setPendingg] = useState(false);

  const [response2, setResponse2] = useState("");

  const [Pending2, setPending2] = useState(false);

  const [response3, setResponse3] = useState("");

  const [Pending3, setPending3] = useState(false);

  const [serverMsg, setServerMsg] = useState(null);
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
      url: `${process.env.REACT_APP_API_BASEURL}/api/admin/blogs/${props.match.params.id}`,
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
    setPendingg(true);

    console.log("Start");

    const options = {
      method: "post",
      url: `${process.env.REACT_APP_API_BASEURL}/api/admin/blogs/${props.match.params.id}?_method=put`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
      data: {
        title: { en: values.English_title, ar: values.Arabic_title },
        short_description: {
          en: values.English_short_description,
          ar: values.Arabic_short_description,
        },

        description: {
          en: values.English_description,
          ar: values.Arabic_description,
        },

        active: values.active === false ? 0 : 1,

        tag_ids: selectedTags,
      },
    };

    axios(options)
      .then(function (response) {
        success();
        console.log("edit", response);
        setPendingg(false);

        // history.push("/Blogs");
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
        url: `${process.env.REACT_APP_API_BASEURL}/api/admin/blogs/${props.match.params.id}?_method=put`,
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
          // history.push("/Blogs");

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
        url: `${process.env.REACT_APP_API_BASEURL}/api/admin/blogs/${props.match.params.id}?_method=put`,
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
          // history.push("/Blogs");

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
        // history.push("/Blogs");
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
      // setSelectedTags([...selectedTags, response.tags[i].id]);
    }
  }
  return Pending ? (
    <Loading />
  ) : (
    <Container>
      <Col md={6} xs={12} className="py-5 mx-auto">
        <h1>Edit Blog Info</h1>
        {console.log("test", selectedTags)}
        <Formik
          initialValues={{
            Arabic_title: response.title.ar,
            English_title: response.title.en,
            Arabic_short_description: response.short_description.ar,
            English_short_description: response.short_description.en,
            Arabic_description: response.description.ar,
            English_description: response.description.en,
            active: response.active === 1 ? true : false,
          }}
          validationSchema={CreateSchema}
          onSubmit={(values, actions) => {
            console.log(values);

            submit(values);
          }}
        >
          {(FormikProps) => (
            <Form style={{ width: "100%" }}>
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
                  checked={FormikProps.values.active}
                />
              </Select.Group>

              <div>
                <Button
                  type="submit"
                  disabled={Pendingg}
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
                  {Pendingg ? (
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

        <h1>Edit Blog Main Image</h1>
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

        <h1>Edit Blog Images</h1>
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
