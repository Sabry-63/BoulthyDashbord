// AddCategory

import { useState } from "react";
import { useSelector } from "react-redux";
import {
  Container,
  FormControl,
  InputGroup,
  Form as Select,
} from "react-bootstrap";
import { Formik, Form } from "formik";
import axios from "axios";
import { message } from "antd";
import Loading from "../../components/Loading";
import { useHistory } from "react-router-dom";

export default function CreateCity(props) {
  const user = useSelector((state) => state.user.data);
  let history = useHistory();

  const [serverMsg, setServerMsg] = useState([]);

  const [formLoading, setFormLoading] = useState(false);

  const success = () => {
    message.success("You Are Successfully Create Category");
  };

  const errors = () => {
    message.error("somthing wrong");
  };

  const Create = (values) => {
    setFormLoading(true);
    const formDataa = new FormData();
    formDataa.append("name[en]", values.English_Name);
    formDataa.append("name[ar]", values.Arabic_Name);
    formDataa.append("price", values.price);
    formDataa.append("active", values.active === false ? 0 : 1);

    const options = {
      method: "post",
      url: `${process.env.REACT_APP_API_BASEURL}/api/admin/cities`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
      data: formDataa,
    };

    axios(options)
      .then(function (response) {
        console.log(response.data);
        // console.log(response.data.data);
        success();

        setServerMsg([]);
        setFormLoading(false);
        history.push("/citylist");
      })

      .catch(function (error) {
        console.log(error.response.data.data);
        setServerMsg(error.response.data.data);
        errors();
        setFormLoading(false);
      });
  };

  return (
    <main className="w-100">
      <Container>
        <h1 className="text-center">Create Zone </h1>
        <Formik
          initialValues={{
            Arabic_Name: "",
            English_Name: "",
            price: "",
            active: false,
          }}
          enableReinitialize
          onSubmit={(values, actions) => {
            console.log(values);
            Create(values);
          }}
        >
          {(FormikProps) => (
            <Form className="formHolder">
              
              <div className="mb-3">
                <InputGroup>
                  <InputGroup.Text>
                    <i className="fas fa-language"></i>{" "}
                  </InputGroup.Text>
                  <FormControl
                    type="text"
                    placeholder="Arabic_Name"
                    name="Arabic_Name"
                    id="Arabic_Name"
                    onChange={FormikProps.handleChange("Arabic_Name")}
                    value={FormikProps.values.Arabic_Name}
                    onBlur={FormikProps.handleBlur}
                    required
                  />
                </InputGroup>
                {FormikProps.touched.Arabic_Name &&
                FormikProps.errors.Arabic_Name ? (
                  <small className="text-danger text-center">
                    {FormikProps.touched.Arabic_Name &&
                      FormikProps.errors.Arabic_Name}
                  </small>
                ) : null}
              </div>

              
              <div className="mb-3">
                <InputGroup>
                  <InputGroup.Text>
                    <i className="fas fa-language"></i>{" "}
                  </InputGroup.Text>
                  <FormControl
                    type="text"
                    placeholder="English_Name"
                    name="English_Name"
                    id="English_Name"
                    onChange={FormikProps.handleChange("English_Name")}
                    value={FormikProps.values.English_Name}
                    onBlur={FormikProps.handleBlur}
                    required
                  />
                </InputGroup>
                {FormikProps.touched.English_Name &&
                FormikProps.errors.English_Name ? (
                  <small className="text-danger text-center">
                    {FormikProps.touched.English_Name &&
                      FormikProps.errors.English_Name}
                  </small>
                ) : null}
              </div>


              
              <div className="mb-3">
                <InputGroup>
                  <InputGroup.Text>
                    <i className="fas fa-hand-holding-usd"></i>{" "}
                  </InputGroup.Text>
                  <FormControl
                    type="number"
                    placeholder="price"
                    name="price"
                    id="price"
                    onChange={FormikProps.handleChange("price")}
                    value={FormikProps.values.price}
                    onBlur={FormikProps.handleBlur}
                    required
                  />
                </InputGroup>
                {FormikProps.touched.price && FormikProps.errors.price ? (
                  <small className="text-danger text-center">
                    {FormikProps.touched.price && FormikProps.errors.price}
                  </small>
                ) : null}
              </div>

<Select.Group className="mb-3" controlId="formBasicCheckbox">
  <Select.Check
    type="checkbox"
    label="active"
    onChange={FormikProps.handleChange("active")}
    name="active"
    id="stoactiveck"
    value={FormikProps.values.active}
    onBlur={FormikProps.handleBlur}
  />
</Select.Group>


              <div className="  ">
                <button className="btn btn-primary w-100" type="submit">
                  {formLoading ? <Loading/> : "Create"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </Container>
    </main>
  );
}