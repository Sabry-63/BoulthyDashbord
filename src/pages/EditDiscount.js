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
import CreateSchema from "../DiscountSchema/CreateSchema";
import { LoadingOutlined } from "@ant-design/icons";
import Button from "@mui/material/Button";

import { Formik, Form } from "formik";
import SaveIcon from "@mui/icons-material/Save";
import { useHistory } from "react-router-dom";
import { message } from "antd";
export default function EditDiscount(props) {
  const user = useSelector((state) => state.user.data);
  const success = () => {
    message.success("You Edited Discount");
  };
  let history = useHistory();

  const [response, setResponse] = useState("");
  const [Pending, setPending] = useState(true);
  const [serverMsg, setServerMsg] = useState(null);
  const [serverMsgs, setServerMsgs] = useState(null);
  const [loading, setLoading] = useState("");

  useEffect(() => {
    const options2 = {
      method: "get",
      url: `${process.env.REACT_APP_API_BASEURL}/api/admin/discounts/${props.match.params.id}`,
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

  const submit = (values) => {
    const options = {
      method: "post",
      url: `${process.env.REACT_APP_API_BASEURL}/api/admin/discounts/${props.match.params.id}?_method=put`,
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

    // console.log(options);

    axios(options)
      .then(function (response) {
        success();
        setServerMsg(null);

        // console.log(response.data.data.data);
      })
      .catch(function (error) {
        //handle error
        setServerMsg(error.response.data.data);
        console.log(error);
      });
  };
  return (
    <Container>
      {Pending ? (
        <Loading />
      ) : (
        <Col md={6} xs={12} className="py-5 mx-auto">
          <Formik
            enableReinitialize
            initialValues={{
              en: response.name.en,
              ar: response.name.ar,
              percentage: response.percentage,
              start_date: response.start_date,
              end_date: response.end_date,
              product_id: response.product_id,
              active: response.active === 1 ? true : false,
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
                  {FormikProps.touched.end_date &&
                  FormikProps.errors.end_date ? (
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
                    checked={FormikProps.values.active}
                  />
                </Select.Group>

                <div>
                  <Button
                    type="submit"
                    // disabled={loading}
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
                        <SaveIcon /> <span className="px-2">edit</span>
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
