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
import CreateSchema from "../tagSchema/CreateSchema";
import { useHistory } from "react-router-dom";
import { message } from "antd";
import SaveIcon from "@mui/icons-material/Save";
export default function CreateTag() {
  const user = useSelector((state) => state.user.data);

  const success = () => {
    message.success("You Created Tag");
  };
  let history = useHistory();

  const [serverMsg, setServerMsg] = useState(null);
  const [serverMsgs, setServerMsgs] = useState(null);

  const [loading, setLoading] = useState("");

  const submit = (values) => {
    console.log("Start");
    setLoading(true);
    const options = {
      method: "post",
      url: `${process.env.REACT_APP_API_BASEURL}/api/admin/tags`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
      data: { name: values, active: 1 },
    };

    // console.log(options);

    axios(options)
      .then(function (response) {
        success();
        console.log(response);
        setServerMsg(null);
        setLoading(false);
      })
      .catch(function (err) {
        //handle error
        setServerMsg(err.response.data.data);
        console.log(err);
      });
  };

  return (
    <Container>
      <Col md={6} xs={12} className="py-5 mx-auto">
        <Formik
          initialValues={{
            en: "",
            ar: "",
          }}
          validationSchema={CreateSchema}
          onSubmit={(values, actions) => {
            // console.log(values);

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

              <div className="mb-3">
                <InputGroup>
                  <InputGroup.Text>
                    <i class="fas fa-language"></i>{" "}
                  </InputGroup.Text>
                  <FormControl
                    type="text"
                    placeholder="Tag English Name"
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
                    <i class="fas fa-language"></i>{" "}
                  </InputGroup.Text>
                  <FormControl
                    type="text"
                    placeholder="Tag Arabic Name"
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
                <Button
                  type="submit"
                  disabled={loading}
                  // style={{ width: "100%", minHeight: "30px" }}
                  // startIcon={<SaveIcon />}
                  // variant="outlined"

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
                      <LoadingOutlined />
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
