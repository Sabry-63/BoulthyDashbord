import {
  Alert,
  FormControl,
  InputGroup,
  Container,
  Col,
  Form as Forms,
} from "react-bootstrap";
import { Formik, Form } from "formik";

import { LoadingOutlined } from "@ant-design/icons";
import Button from "@mui/material/Button";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import CreateSchema from "../roleSchema/CreateSchema";
import { useHistory } from "react-router-dom";
import { message } from "antd";

import SaveIcon from "@mui/icons-material/Save";
import { Select } from "antd";
const { Option } = Select;

export default function CreateRole() {
  const user = useSelector((state) => state.user.data);

  const success = () => {
    message.success("You Created Role");
  };

  const [serverMsg, setServerMsg] = useState(null);

  const [permissions, setPermissions] = useState(null);
  const [SelectedPermissions, setSelectedPermissions] = useState(null);

  const [loading, setLoading] = useState("");

  const submit = (values) => {
    console.log("Start");
    setLoading(true);

    const options = {
      method: "post",
      url: `${process.env.REACT_APP_API_BASEURL}/api/admin/roles`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
      data: {
        name: values.name,
        guard_name: "api",
        permission_ids: SelectedPermissions,
        active: values.active === false ? 0 : 1,
      },
    };

    axios(options)
      .then(function (response) {
        success();
        setServerMsg(null);
        console.log(response);
        setLoading(false);
      })
      .catch(function (err) {
        //handle error
        console.log(err);
        setServerMsg(err.response.data.data);
      });
  };

  useEffect(() => {
    const options = {
      method: "get",
      url: `${process.env.REACT_APP_API_BASEURL}/api/admin/permissions`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    };

    axios(options)
      .then(function (response) {
        console.log("    handle success");
        setPermissions(response.data.data.data);

        setLoading(false);
        console.log("perr ", response.data.data.data);
      })
      .catch(function (error) {
        console.log("    hande error");
        console.log(error);
      });
  }, []);

  function handleChange(value) {
    console.log(`selected ${value}`);
    setSelectedPermissions(value);
  }

  return (
    <Container>
      <Col md={6} xs={12} className="py-5 mx-auto">
        <Formik
          initialValues={{
            name: "",
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
                    placeholder="Role Name"
                    name="name"
                    id="name"
                    onChange={FormikProps.handleChange("name")}
                    value={FormikProps.values.name}
                    onBlur={FormikProps.handleBlur}
                    required
                  />
                </InputGroup>
                {FormikProps.touched.name && FormikProps.errors.name ? (
                  <small className="text-danger text-center">
                    {FormikProps.touched.name && FormikProps.errors.name}
                  </small>
                ) : null}
              </div>

              <Select
                mode="tags"
                style={{ width: "100%" }}
                placeholder="Permissions ids"
                onChange={handleChange}
                className="pb-2"
              >
                {/* {children} */}
                {permissions &&
                  permissions.map((permission) => (
                    <Option key={permission.id}>{permission.name}</Option>
                  ))}
              </Select>

              <Forms.Group className="mb-3" controlId="formBasicCheckbox">
                <Forms.Check
                  type="checkbox"
                  label="active"
                  onChange={FormikProps.handleChange("active")}
                  name="active"
                  id="stoactiveck"
                  // onChange={FormikProps.handleChange("active")}
                  value={FormikProps.values.active}
                  onBlur={FormikProps.handleBlur}
                />
              </Forms.Group>

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
