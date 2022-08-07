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
import CreateSchema from "../DiscountSchema/CreateSchema";
import { useHistory } from "react-router-dom";
import { message } from "antd";
import SaveIcon from "@mui/icons-material/Save";
export default function CreateDiscount() {
  const user = useSelector((state) => state.user.data);

  const success = () => {
    message.success("You added discount");
  };

  const [serverMsg, setServerMsg] = useState(null);
  const [serverMsgs, setServerMsgs] = useState(null);

  const [loading, setLoading] = useState("");

  const submit = (values) => {
    console.log("Start");

    const options = {
      method: "post",
      url: `${process.env.REACT_APP_API_BASEURL}/api/admin/discounts`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
      data: {
        name: { en: values.en, ar: values.ar },
        percentage: values.percentage,
        start_date: values.start_date,
        end_date: values.end_date,
        active: values.active === false ? 0 : 1,
        product_id: values.product_id,
      },
    };

    axios(options)
      .then(function (response) {
        success();
        setServerMsg(null);
        console.log(response);
      })
      .catch(function (err) {
        //handle error
        console.log(err);
        setServerMsg(err.response.data.data);
      });
  };

  return (
    <Container>
      <Col md={6} xs={12} className="py-5 mx-auto">
        <Formik
          initialValues={{
            en: "",
            ar: "",
            percentage: "",
            start_date: "",
            end_date: "",
            product_id: "",
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
                    placeholder="discount English Name"
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
                  <FormControl
                    type="text"
                    placeholder="discount Arabic Name"
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

              <div className="mb-3">
                <InputGroup>
                  <FormControl
                    type="text"
                    placeholder="Percentage"
                    name="percentage"
                    id="percentage"
                    onChange={FormikProps.handleChange("percentage")}
                    value={FormikProps.values.percentage}
                    onBlur={FormikProps.handleBlur}
                    required
                  />
                </InputGroup>
                {FormikProps.touched.percentage &&
                FormikProps.errors.percentage ? (
                  <small className="text-danger text-center">
                    {FormikProps.touched.percentage &&
                      FormikProps.errors.percentage}
                  </small>
                ) : null}
              </div>

              <div className="mb-3">
                <InputGroup>
                  <FormControl
                    type="date"
                    name="start_date"
                    id="start_date"
                    onChange={FormikProps.handleChange("start_date")}
                    value={FormikProps.values.start_date}
                    onBlur={FormikProps.handleBlur}
                    required
                  />
                </InputGroup>
                {FormikProps.touched.start_date &&
                FormikProps.errors.start_date ? (
                  <small className="text-danger text-center">
                    {FormikProps.touched.start_date &&
                      FormikProps.errors.start_date}
                  </small>
                ) : null}
              </div>

              <div className="mb-3">
                <InputGroup>
                  <FormControl
                    type="date"
                    name="end_date"
                    id="end_date"
                    onChange={FormikProps.handleChange("end_date")}
                    value={FormikProps.values.end_date}
                    onBlur={FormikProps.handleBlur}
                    required
                  />
                </InputGroup>
                {FormikProps.touched.end_date && FormikProps.errors.end_date ? (
                  <small className="text-danger text-center">
                    {FormikProps.touched.end_date &&
                      FormikProps.errors.end_date}
                  </small>
                ) : null}
              </div>

              <div className="mb-3">
                <InputGroup>
                  <FormControl
                    type="text"
                    placeholder="Product Id"
                    name="product_id"
                    id="product_id"
                    onChange={FormikProps.handleChange("product_id")}
                    value={FormikProps.values.product_id}
                    onBlur={FormikProps.handleBlur}
                    required
                  />
                </InputGroup>
                {FormikProps.touched.product_id &&
                FormikProps.errors.product_id ? (
                  <small className="text-danger text-center">
                    {FormikProps.touched.product_id &&
                      FormikProps.errors.product_id}
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
