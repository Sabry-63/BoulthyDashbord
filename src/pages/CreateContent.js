import {
  Alert,
  FormControl,
  InputGroup,
  // Form as Select,
  Container,
  Col,
} from "react-bootstrap";
import { Formik, Form } from "formik";

import CreateSchema from "../contentSchema/CreateSchema";
import { useState } from "react";
// import { useRouter } from "next/router";
import { message } from "antd";

import axios from "axios";
import { useSelector } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";
import Button from "@mui/material/Button";
// import LoadingButton from "@mui/lab/LoadingButton";

import SaveIcon from "@mui/icons-material/Save";

export default function CreateContent() {
  const success = () => {
    message.success("You Created Content");
  };

  const user = useSelector((state) => state.user.data);

  const [serverMsg, setServerMsg] = useState("");
  const [loading, setLoading] = useState("");

  const submit = function name(params) {
    setLoading(true);
    const options = {
      method: "post",
      url: `${process.env.REACT_APP_API_BASEURL}/api/admin/static-content`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
      data: {
        group: params.group,
        key: params.key,
        text: { ar: params.ar, en: params.en },
      },
    };
    // console.log(options);

    axios(options)
      .then(function (response) {
        // handle success

        let Create = async function () {
          console.log("    handle success2");
          console.log(response);
          if (response.data.status_code !== 200) {
            setServerMsg(response.data.data);
            setLoading(false);
          } else {
            // function someFunc() {
            setServerMsg(response.data.message);
            setLoading(false);
            success();
          }
          return response;
        };

        Create();
      })
      .catch((error) => {
        // handle error
        setLoading(false);

        console.log("    handle error");

        console.log(error);
      });
  };

  return (
    <Container>
      <Col md={6} xs={12} className="py-5 mx-auto">
        <Formik
          initialValues={{
            group: "",
            key: "",
            en: "",
            ar: "",
          }}
          validationSchema={CreateSchema}
          onSubmit={(values, actions) => {
            console.log(values);

            submit(values);
          }}
        >
          {(FormikProps) => (
            <Form style={{ width: "100%" }}>
              {serverMsg && typeof serverMsg === "object"
                ? serverMsg.map((msg) => <Alert variant="primary">{msg}</Alert>)
                : null}

              {serverMsg && typeof serverMsg === "string" ? (
                <Alert variant="primary">{serverMsg}</Alert>
              ) : null}

              <div className="mb-3">
                <InputGroup>
                  <InputGroup.Text>
                    <i className="fas fa-user"></i>
                  </InputGroup.Text>
                  <FormControl
                    type="text"
                    placeholder="group"
                    name="group"
                    id="group"
                    onChange={FormikProps.handleChange("group")}
                    value={FormikProps.values.group}
                    onBlur={FormikProps.handleBlur}
                    required
                  />
                </InputGroup>
                {FormikProps.touched.group && FormikProps.errors.group ? (
                  <small className="text-danger text-center">
                    {FormikProps.touched.group && FormikProps.errors.group}
                  </small>
                ) : null}
              </div>
              <div className="mb-3">
                <InputGroup>
                  <InputGroup.Text>
                    <i className="fas fa-user"></i>
                  </InputGroup.Text>
                  <FormControl
                    type="text"
                    placeholder="key"
                    name="key"
                    id="key"
                    onChange={FormikProps.handleChange("key")}
                    value={FormikProps.values.key}
                    onBlur={FormikProps.handleBlur}
                    required
                  />
                </InputGroup>
                {FormikProps.touched.key && FormikProps.errors.key ? (
                  <small className="text-danger text-center">
                    {FormikProps.touched.key && FormikProps.errors.key}
                  </small>
                ) : null}
              </div>

              <div className="mb-3">
                <InputGroup>
                  <InputGroup.Text>
                    <i className="fas fa-user"></i>
                  </InputGroup.Text>
                  <FormControl
                    type="text"
                    placeholder="En Text"
                    name="en"
                    id="en"
                    onChange={FormikProps.handleChange("en")}
                    value={FormikProps.values.en}
                    onBlur={FormikProps.handleBlur}
                    required
                  />
                </InputGroup>
                {FormikProps.touched.en && FormikProps.errors.en ? (
                  <small className="text-danger text-center">
                    {FormikProps.touched.en && FormikProps.errors.en}
                  </small>
                ) : null}
              </div>

              <div className="mb-3">
                <InputGroup>
                  <InputGroup.Text>
                    <i className="fas fa-user"></i>
                  </InputGroup.Text>
                  <FormControl
                    type="text"
                    placeholder="Ar Text"
                    name="ar"
                    id="ar"
                    onChange={FormikProps.handleChange("ar")}
                    value={FormikProps.values.ar}
                    onBlur={FormikProps.handleBlur}
                    required
                  />
                </InputGroup>
                {FormikProps.touched.ar && FormikProps.errors.ar ? (
                  <small className="text-danger text-center">
                    {FormikProps.touched.ar && FormikProps.errors.ar}
                  </small>
                ) : null}
              </div>

              <div>
                {/* <button type="submit">
                      {loading ? <LoadingOutlined /> : "Create"}
                    </button> */}

                {/* <Button type="submit" isLoading={loading}>
                      Continue
                    </Button> */}

                <Button
                  type="submit"
                  disabled={loading}
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
