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

import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import CreateSchema from "../FqasSchema/CreateSchema";
import { message } from "antd";
import SaveIcon from "@mui/icons-material/Save";

export default function AddFqas() {
  const user = useSelector((state) => state.user.data);

  const [serverMsg, setServerMsg] = useState(null);
  const [serverMsgs, setServerMsgs] = useState(null);

  const [loading, setLoading] = useState("");

  const success = () => {
    message.success("You Created FQAS");
  };

  const submit = (values) => {
    console.log("Start");
    setLoading(true);
    const options = {
      method: "post",
      url: `${process.env.REACT_APP_API_BASEURL}/api/admin/faqs`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
      data: {
        question: { ar: values.arQuestion, en: values.enQuestion },
        answer: { ar: values.arAnswer, en: values.enAnswer },
        active: 1,
      },
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
            enQuestion: "",
            arQuestion: "",
            enAnswer: "",
            arAnswer: "",
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
                    placeholder="English Question"
                    name="enQuestion"
                    id="enQuestion"
                    onChange={FormikProps.handleChange("enQuestion")}
                    value={FormikProps.values.enQuestion}
                    onBlur={FormikProps.handleBlur}
                    required
                  />
                </InputGroup>
                {FormikProps.touched.enQuestion &&
                FormikProps.errors.enQuestion ? (
                  <small className="text-danger text-center">
                    {FormikProps.touched.enQuestion &&
                      FormikProps.errors.enQuestion}
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
                    placeholder="Arabic Question"
                    name="arQuestion"
                    id="arQuestion"
                    onChange={FormikProps.handleChange("arQuestion")}
                    value={FormikProps.values.arQuestion}
                    onBlur={FormikProps.handleBlur}
                    required
                  />
                </InputGroup>
                {FormikProps.touched.arQuestion &&
                FormikProps.errors.arQuestion ? (
                  <small className="text-danger text-center">
                    {FormikProps.touched.arQuestion &&
                      FormikProps.errors.arQuestion}
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
                    placeholder="Engilsh Answer"
                    name="enAnswer"
                    id="enAnswer"
                    onChange={FormikProps.handleChange("enAnswer")}
                    value={FormikProps.values.enAnswer}
                    onBlur={FormikProps.handleBlur}
                    required
                  />
                </InputGroup>
                {FormikProps.touched.enAnswer && FormikProps.errors.enAnswer ? (
                  <small className="text-danger text-center">
                    {FormikProps.touched.enAnswer &&
                      FormikProps.errors.enAnswer}
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
                    placeholder="Arabic Answer"
                    name="arAnswer"
                    id="arAnswer"
                    onChange={FormikProps.handleChange("arAnswer")}
                    value={FormikProps.values.arAnswer}
                    onBlur={FormikProps.handleBlur}
                    required
                  />
                </InputGroup>
                {FormikProps.touched.arAnswer && FormikProps.errors.arAnswer ? (
                  <small className="text-danger text-center">
                    {FormikProps.touched.arAnswer &&
                      FormikProps.errors.arAnswer}
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
