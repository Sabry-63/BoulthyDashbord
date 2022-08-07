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
import Loading from "../components/Loading";
const { Option } = Select;

export default function EditRole(props) {
  const user = useSelector((state) => state.user.data);

  const success = () => {
    message.success("You Edited Role");
  };

  const [serverMsg, setServerMsg] = useState(null);

  const [role, setRole] = useState(null);
  const [permissions, setPermissions] = useState(null);
  const [SelectedPermissions, setSelectedPermissions] = useState(null);

  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);

  const submit = (values) => {
    console.log("Start");
    setLoading(true);

    const options = {
      method: "put",
      url: `${process.env.REACT_APP_API_BASEURL}/api/admin/roles/${props.match.params.id}?_method=put`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
      data: {
        name: values.name,
        guard_name: "api",
        permission_ids: SelectedPermissions.map((item) => item.key),
        active: values.active === false ? 0 : 1,
      },
    };

    axios(options)
      .then(function (response) {
        setServerMsg(null);
        console.log(response);
        success();
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

    const options2 = {
      method: "get",
      url: `${process.env.REACT_APP_API_BASEURL}/api/admin/roles/${props.match.params.id}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    };

    axios(options2)
      .then(function (response) {
        console.log("    handle success");
        setRole(response.data.data);

        setLoading2(false);
        console.log("role ", response.data.data);
      })
      .catch(function (error) {
        console.log("    hande error");
        console.log(error);
      });
  }, []);

  function handleChange(value) {
    console.log("selected", value.key);

    setSelectedPermissions(value);

    // setSelectedPermissions(value);
    console.log("hello", SelectedPermissions);
  }

  const children = [];

  if (role) {
    for (let i = 0; i < role.permissions.length; i++) {
      children.push({
        value: role.permissions[i].id,
        label: role.permissions[i].name,
        key: role.permissions[i].id,
      });
      console.log(i, children);
    }
  }

  return (
    <>
      {loading & loading2 ? (
        <Loading />
      ) : role ? (
        <Container>
          <Col md={6} xs={12} className="py-5 mx-auto">
            <Formik
              initialValues={{
                name: role.name,
                active: role.active === 1 ? true : false,
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
                    onChange={(e) => handleChange(e)}
                    className="pb-2"
                    labelInValue
                    defaultValue={children}
                  >
                    {permissions &&
                      permissions.map((permission) => (
                        <Option key={permission.id} value={permission.id}>
                          {permission.name}
                        </Option>
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
                      checked={FormikProps.values.active}
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
      ) : (
        <Loading />
      )}
    </>
  );
}
