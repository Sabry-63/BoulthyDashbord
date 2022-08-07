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
import CreateSchema from "../FqasSchema/CreateSchema";
import { message } from "antd";
import SaveIcon from "@mui/icons-material/Save";
import Loading from "../components/Loading";

export default function EditFqas(props) {
  const user = useSelector((state) => state.user.data);

  const [serverMsg, setServerMsg] = useState(null);

  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);

  const [response, setResponse] = useState("");

  const success = () => {
    message.success("You Edited FQAS");
  };

  useEffect(() => {
    const options2 = {
      method: "get",
      url: `${process.env.REACT_APP_API_BASEURL}/api/admin/faqs/${props.match.params.id}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    };

    axios(options2)
      .then(function (response) {
        console.log("handle sucss");
        console.log(response.data);

        setResponse(response.data.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log("hande rror");
        console.log(error.response);
      });
  }, []);

  const submit = (values) => {
    console.log("Start");
    setFormLoading(true);
    const options = {
      method: "post",
      url: `${process.env.REACT_APP_API_BASEURL}/api/admin/faqs/${props.match.params.id}?_method=put`,
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
        setFormLoading(false);
      })
      .catch(function (err) {
        //handle error
        setServerMsg(err.response.data.data);
        console.log(err);
      });
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Container>
          <Col md={6} xs={12} className="py-5 mx-auto">
            <Formik
              initialValues={{
                enQuestion: response.question.en,
                arQuestion: response.question.ar,
                enAnswer: response.answer.en,
                arAnswer: response.answer.ar,
              }}
              validationSchema={CreateSchema}
              onSubmit={(values, actions) => {
                // console.log(values);

                submit(values);
              }}
            >
              {(FormikProps) => (
                <Form style={{ width: "100%" }}>
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
                    {FormikProps.touched.enAnswer &&
                    FormikProps.errors.enAnswer ? (
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
                    {FormikProps.touched.arAnswer &&
                    FormikProps.errors.arAnswer ? (
                      <small className="text-danger text-center">
                        {FormikProps.touched.arAnswer &&
                          FormikProps.errors.arAnswer}
                      </small>
                    ) : null}
                  </div>
                  <div>
                    <Button
                      type="submit"
                      disabled={formLoading}
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
                      {formLoading ? (
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
      )}
    </>
  );
}
