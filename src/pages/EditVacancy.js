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

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import CreateSchema from "../VacancySchema/CreateSchema";
import { message } from "antd";
import SaveIcon from "@mui/icons-material/Save";
import Loading from "../components/Loading";

export default function EditVacancy(props) {
  const user = useSelector((state) => state.user.data);
  const [serverMsg, setServerMsg] = useState(null);

  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState("");

  const [data, setData] = useState("");

  const success = () => {
    message.success("You edited vacancy");
  };

  useEffect(() => {
    setLoading(true);
    const options2 = {
      method: "get",
      url: `${process.env.REACT_APP_API_BASEURL}/api/admin/vacancies/${props.match.params.id}`,
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

        setData(response.data.data);
        // setSelectedFile(response.data.data.image)
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
      method: "put",
      url: `${process.env.REACT_APP_API_BASEURL}/api/admin/vacancies/${props.match.params.id}`,
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
        setFormLoading(false);

        console.log(response);
      })
      .catch(function (err) {
        //handle error
        console.log(err.response);
        setServerMsg(err.response.data.data);
        setFormLoading(true);
      });
  };

  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <Col md={6} xs={12} className="py-5 mx-auto">
          <Formik
            initialValues={{
              enTitle: data.title.en,

              arTitle: data.title.ar,
              enShortDescription: data.short_description.en,
              arShortDescription: data.short_description.ar,
              enDescription: data.description.en,
              arDescription: data.description.ar,

              active: data.active === 1 ? true : false,
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
                      {FormikProps.touched.enTitle &&
                        FormikProps.errors.enTitle}
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
                      {FormikProps.touched.arTitle &&
                        FormikProps.errors.arTitle}
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
                    onChange={FormikProps.handleChange("active")}
                    value={FormikProps.values.active}
                    onBlur={FormikProps.handleBlur}
                    checked={FormikProps.values.active}
                  />
                </Select.Group>

                <div>
                  <Button
                    type="submit"
                    disabled={formLoading}
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
      )}
    </Container>
  );
}
