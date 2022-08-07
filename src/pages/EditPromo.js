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
import CreateSchema from "../promosSchema/CreateSchema";
import { useHistory } from "react-router-dom";
import { message } from "antd";
import SaveIcon from "@mui/icons-material/Save";
import Loading from "../components/Loading";
export default function EditPromo(props) {
  const user = useSelector((state) => state.user.data);

  const success = () => {
    message.success("You Edited Promo");
  };

  const [response, setResponse] = useState("");
  const [Pending, setPending] = useState(true);
  const [serverMsg, setServerMsg] = useState(null);
  const [serverMsgs, setServerMsgs] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const options2 = {
      method: "get",
      url: `${process.env.REACT_APP_API_BASEURL}/api/admin/promos/${props.match.params.id}`,
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
        console.log(error);
      });
  }, []);

  const submit = (values) => {
    console.log("Start");
    const options = {
      method: "post",
      url: `${process.env.REACT_APP_API_BASEURL}/api/admin/promos/${props.match.params.id}?_method=put`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
      data: {
        name: { en: values.nameEn, ar: values.nameAr },
        description: { en: values.descriptionEn, ar: values.descriptionAr },
        short_description: {
          en: values.shortDescriptionEn,
          ar: values.shortDescriptionAr,
        },
        percentage: values.percentage,
        start_date: values.start_date,
        end_date: values.end_date,
        active: values.active,
        code: values.code,
        type: values.type,
        user_id: values.user,
      },
    };

    axios(options)
      .then(function (response) {
        setServerMsg(null);

        success();
        console.log(response);
      })
      .catch(function (err) {
        //handle error
        console.log(err.response);
        setServerMsg(err.response.data.data);
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
                nameEn: response.name.en,
                nameAr: response.name.ar,
                descriptionAr: response.description.ar,
                descriptionEn: response.description.en,
                shortDescriptionAr: response.short_description.ar,
                shortDescriptionEn: response.short_description.en,
                percentage: response.percentage,
                start_date: response.start_date,
                end_date: response.end_date,
                code: response.code,
                user: response.user_id,
                type: response.type,
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

                  <div className="mb-3">
                    <InputGroup>
                      <FormControl
                        type="text"
                        placeholder="Promos English Name"
                        name="nameEn"
                        id="nameEn"
                        onChange={FormikProps.handleChange("nameEn")}
                        value={FormikProps.values.nameEn}
                        onBlur={FormikProps.handleBlur}
                        required
                      />
                    </InputGroup>
                    {FormikProps.touched.nameEn && FormikProps.errors.nameEn ? (
                      <small className="text-danger text-center">
                        {FormikProps.touched.nameEn &&
                          FormikProps.errors.nameEn}
                      </small>
                    ) : null}
                  </div>

                  <div className="mb-3">
                    <InputGroup>
                      <FormControl
                        type="text"
                        placeholder="Promos Arabic Name"
                        name="nameAr"
                        id="nameAr"
                        onChange={FormikProps.handleChange("nameAr")}
                        value={FormikProps.values.nameAr}
                        onBlur={FormikProps.handleBlur}
                        required
                      />
                    </InputGroup>
                    {FormikProps.touched.nameAr && FormikProps.errors.nameAr ? (
                      <small className="text-danger text-center">
                        {FormikProps.touched.nameAr &&
                          FormikProps.errors.nameAr}
                      </small>
                    ) : null}
                  </div>

                  <div className="mb-3">
                    <InputGroup>
                      <FormControl
                        type="text"
                        placeholder="Promos English description"
                        name="descriptionEn"
                        id="descriptionEn"
                        onChange={FormikProps.handleChange("descriptionEn")}
                        value={FormikProps.values.descriptionEn}
                        onBlur={FormikProps.handleBlur}
                        required
                      />
                    </InputGroup>
                    {FormikProps.touched.descriptionEn &&
                    FormikProps.errors.descriptionEn ? (
                      <small className="text-danger text-center">
                        {FormikProps.touched.descriptionEn &&
                          FormikProps.errors.descriptionEn}
                      </small>
                    ) : null}
                  </div>

                  <div className="mb-3">
                    <InputGroup>
                      <FormControl
                        type="text"
                        placeholder="Promos Arabic description"
                        name="descriptionAr"
                        id="descriptionAr"
                        onChange={FormikProps.handleChange("descriptionAr")}
                        value={FormikProps.values.descriptionAr}
                        onBlur={FormikProps.handleBlur}
                        required
                      />
                    </InputGroup>
                    {FormikProps.touched.descriptionAr &&
                    FormikProps.errors.descriptionAr ? (
                      <small className="text-danger text-center">
                        {FormikProps.touched.descriptionAr &&
                          FormikProps.errors.descriptionAr}
                      </small>
                    ) : null}
                  </div>

                  <div className="mb-3">
                    <InputGroup>
                      <FormControl
                        type="text"
                        placeholder="Promos Arabic short description"
                        name="shortDescriptionAr"
                        id="shortDescriptionAr"
                        onChange={FormikProps.handleChange(
                          "shortDescriptionAr"
                        )}
                        value={FormikProps.values.shortDescriptionAr}
                        onBlur={FormikProps.handleBlur}
                        required
                      />
                    </InputGroup>
                    {FormikProps.touched.shortDescriptionAr &&
                    FormikProps.errors.shortDescriptionAr ? (
                      <small className="text-danger text-center">
                        {FormikProps.touched.shortDescriptionAr &&
                          FormikProps.errors.shortDescriptionAr}
                      </small>
                    ) : null}
                  </div>

                  <div className="mb-3">
                    <InputGroup>
                      <FormControl
                        type="text"
                        placeholder="Promos English short description"
                        name="shortDescriptionEn"
                        id="shortDescriptionEn"
                        onChange={FormikProps.handleChange(
                          "shortDescriptionEn"
                        )}
                        value={FormikProps.values.shortDescriptionEn}
                        onBlur={FormikProps.handleBlur}
                        required
                      />
                    </InputGroup>
                    {FormikProps.touched.shortDescriptionEn &&
                    FormikProps.errors.shortDescriptionEn ? (
                      <small className="text-danger text-center">
                        {FormikProps.touched.shortDescriptionEn &&
                          FormikProps.errors.shortDescriptionEn}
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
                        placeholder="Code"
                        name="code"
                        id="code"
                        onChange={FormikProps.handleChange("code")}
                        value={FormikProps.values.code}
                        onBlur={FormikProps.handleBlur}
                        required
                      />
                    </InputGroup>
                    {FormikProps.touched.code && FormikProps.errors.code ? (
                      <small className="text-danger text-center">
                        {FormikProps.touched.code && FormikProps.errors.code}
                      </small>
                    ) : null}
                  </div>

                  <div className="mb-3">
                    <InputGroup>
                      <Select.Select
                        name="type"
                        id="type"
                        onChange={FormikProps.handleChange("type")}
                        value={FormikProps.values.type}
                        onBlur={FormikProps.handleBlur}
                        required
                      >
                        <option disabled>Promo type </option>
                        <option value="1"> GENERIC</option>
                        <option value="2">EXCLUSIVE </option>
                        <option value="3">ASSOCIATE </option>
                      </Select.Select>
                    </InputGroup>
                    {FormikProps.touched.type && FormikProps.errors.type ? (
                      <small className="text-danger text-center ">
                        {FormikProps.touched.type && FormikProps.errors.type}
                      </small>
                    ) : null}
                  </div>

                  {FormikProps.values.type == 2 ||
                  FormikProps.values.type == 3 ? (
                    <div className="mb-3">
                      <InputGroup>
                        <FormControl
                          type="text"
                          placeholder="User id"
                          name="user"
                          id="user"
                          onChange={FormikProps.handleChange("user")}
                          value={FormikProps.values.user}
                          onBlur={FormikProps.handleBlur}
                          required
                        />
                      </InputGroup>
                      {FormikProps.touched.user && FormikProps.errors.user ? (
                        <small className="text-danger text-center">
                          {FormikProps.touched.user && FormikProps.errors.user}
                        </small>
                      ) : null}
                    </div>
                  ) : null}

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
      )}
    </>
  );
}
