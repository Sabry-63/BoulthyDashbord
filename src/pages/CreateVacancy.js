import {
  Alert,
  FormControl,
  InputGroup,
  Form as Select,
  Container,
  Col,
  FormText,
} from "react-bootstrap";
import { Formik, Form } from "formik";

import { LoadingOutlined } from "@ant-design/icons";
import Button from "@mui/material/Button";

import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import CreateSchema from "../VacancySchema/CreateSchema";
import { message } from "antd";
import SaveIcon from "@mui/icons-material/Save";
export default function CreateVacancy() {
  const user = useSelector((state) => state.user.data);
  const [serverMsg, setServerMsg] = useState(null);

  const [loading, setLoading] = useState("");

  const success = () => {
    message.success("You added vacancy");
  };

  const submit = (values) => {
    console.log("Start");
    setLoading(true);
    const options = {
      method: "post",
      url: `${process.env.REACT_APP_API_BASEURL}/api/admin/vacancies`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
      data: {
        title: { en: values.enTitle, ar: values.arTitle },
        short_description: {
          en: values.enShortDescription,
          ar: values.arShortDescription,
        },

        description: { en: values.enDescription, ar: values.arDescription },
        active: values.active === false ? 0 : 1,
      },
    };

    axios(options)
      .then(function (response) {
        success();
        setServerMsg(null);
        setLoading(false);

        console.log(response);
      })
      .catch(function (err) {
        //handle error
        console.log(err);
        setServerMsg(err.response.data.data);
        setLoading(true);
      });
  };

  return (
    <Container>
      <Col md={6} xs={12} className="py-5 mx-auto">
        <Formik
          initialValues={{
            enTitle: "",
            arTitle: "",
            enShortDescription: "",
            arShortDescription: "",
            enDescription: "",
            arDescription: "",

            active: false,
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

              <div className="mb-3">
                <InputGroup>
                  <FormControl
                    type="text"
                    placeholder="Vacancy English Title"
                    name="enTitle"
                    id="enTitle"
                    onChange={FormikProps.handleChange("enTitle")}
                    value={FormikProps.values.enTitle}
                    onBlur={FormikProps.handleBlur}
                    required
                  />
                </InputGroup>
                {FormikProps.touched.enTitle && FormikProps.errors.enTitle ? (
                  <small className="text-danger text-center">
                    {FormikProps.touched.enTitle && FormikProps.errors.enTitle}
                  </small>
                ) : null}
              </div>

              <div className="mb-3">
                <InputGroup>
                  <FormControl
                    type="text"
                    placeholder="Vacancy Arabic title"
                    name="arTitle"
                    id="arTitle"
                    onChange={FormikProps.handleChange("arTitle")}
                    value={FormikProps.values.arTitle}
                    onBlur={FormikProps.handleBlur}
                    required
                  />
                </InputGroup>
                {FormikProps.touched.arTitle && FormikProps.errors.arTitle ? (
                  <small className="text-danger text-center">
                    {FormikProps.touched.arTitle && FormikProps.errors.arTitle}
                  </small>
                ) : null}
              </div>

              <div className="mb-3">
                <InputGroup>
                  <FormControl
                    type="text"
                    as="textarea"
                    rows={3}
                    placeholder="Vacancy English Short description"
                    name="enShortDescription"
                    id="enShortDescription"
                    onChange={FormikProps.handleChange("enShortDescription")}
                    value={FormikProps.values.enShortDescription}
                    onBlur={FormikProps.handleBlur}
                    required
                  />
                </InputGroup>
                {FormikProps.touched.enShortDescription &&
                FormikProps.errors.enShortDescription ? (
                  <small className="text-danger text-center">
                    {FormikProps.touched.enShortDescription &&
                      FormikProps.errors.enShortDescription}
                  </small>
                ) : null}
              </div>

              <div className="mb-3">
                <InputGroup>
                  <FormControl
                    type="text"
                    as="textarea"
                    rows={3}
                    placeholder="Vacancy Arabic Short description"
                    name="arShortDescription"
                    id="arShortDescription"
                    onChange={FormikProps.handleChange("arShortDescription")}
                    value={FormikProps.values.arShortDescription}
                    onBlur={FormikProps.handleBlur}
                    required
                  />
                </InputGroup>
                {FormikProps.touched.arShortDescription &&
                FormikProps.errors.arShortDescription ? (
                  <small className="text-danger text-center">
                    {FormikProps.touched.arShortDescription &&
                      FormikProps.errors.arShortDescription}
                  </small>
                ) : null}
              </div>

              <div className="mb-3">
                <InputGroup>
                  <FormControl
                    type="text"
                    as="textarea"
                    rows={3}
                    placeholder="Vacancy English description"
                    name="enDescription"
                    id="enDescription"
                    onChange={FormikProps.handleChange("enDescription")}
                    value={FormikProps.values.enDescription}
                    onBlur={FormikProps.handleBlur}
                    required
                  />
                </InputGroup>
                {FormikProps.touched.enDescription &&
                FormikProps.errors.enDescription ? (
                  <small className="text-danger text-center">
                    {FormikProps.touched.enDescription &&
                      FormikProps.errors.enDescription}
                  </small>
                ) : null}
              </div>

              <div className="mb-3">
                <InputGroup>
                  <FormControl
                    type="text"
                    as="textarea"
                    rows={3}
                    placeholder="Vacancy Arabic description"
                    name="arDescription"
                    id="arDescription"
                    onChange={FormikProps.handleChange("arDescription")}
                    value={FormikProps.values.arDescription}
                    onBlur={FormikProps.handleBlur}
                    required
                  />
                </InputGroup>
                {FormikProps.touched.arDescription &&
                FormikProps.errors.arDescription ? (
                  <small className="text-danger text-center">
                    {FormikProps.touched.arDescription &&
                      FormikProps.errors.arDescription}
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
                  // onChange={FormikProps.handleChange("active")}
                  value={FormikProps.values.active}
                  onBlur={FormikProps.handleBlur}
                />
              </Select.Group>

              <div>
                <Button
                  type="submit"
                  disabled={loading}
                  // style={{ width: "100%", minHeight: "30px" }}
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
