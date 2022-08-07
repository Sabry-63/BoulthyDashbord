import {
  Alert,
  FormControl,
  InputGroup,
  // Form as Select,
  Container,
  Col,
} from "react-bootstrap";
import { Formik, Form, Field, FieldArray } from "formik";

import CreateSchema from "../contentSchema/CreateSchema";
import { useEffect, useState } from "react";
// import { useRouter } from "next/router";
import { message } from "antd";

import axios from "axios";
import { useSelector } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";
import Button from "@mui/material/Button";
// import LoadingButton from "@mui/lab/LoadingButton";

import SaveIcon from "@mui/icons-material/Save";
import Loading from "../components/Loading";

export default function CreateContent() {
  const success = () => {
    message.success("You edited Content");
  };

  const user = useSelector((state) => state.user.data);

  const [serverMsg, setServerMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);

  const [response, setResponse] = useState("");

  const [data, setData] = useState([]);

  const submit = function name(params1, params2) {
    console.log(params1, "test ", params2);

    setFormLoading(true);
    const options = {
      method: "post",
      url: `${process.env.REACT_APP_API_BASEURL}/api/admin/static-content-by-key`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
      data: {
        items: {
          [params1]: { ar: params2.ar, en: params2.en },
        },
      },
      // key: params2,
      // text: { ar: params.ar, en: params.en },

      // key: params2,
    };
    // console.log(options);

    axios(options)
      .then(function (response) {
        // handle success

        let Create = async function () {
          console.log("    handle success2");
          console.log(response.data.data);

          setServerMsg("");
          setFormLoading(false);
          success();
        };
        Create();

        return response;
      })
      .catch((error) => {
        // handle error
        setLoading(false);
        setServerMsg(error.response.data);

        console.log("    handle error");

        console.log(error);
      });
  };

  useEffect(() => {
    const options = {
      method: "get",
      url: `${process.env.REACT_APP_API_BASEURL}/api/admin/static-content`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    };

    axios(options)
      .then(function (response) {
        console.log("handle success");
        setResponse(response.data.data);
        setLoading(false);

        console.log("dataaaa", response.data.data);
      })
      .catch(function (error) {
        console.log("hande error");
        console.log(error.response);
      });
  }, []);

  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <Col md={6} xs={12} className="py-5 mx-auto">
          {response.map((items) => (
            <Formik
              initialValues={{}}
              onSubmit={(values, actions) => {
                submit(items.key, values);
              }}
            >
              {(FormikProps) => (
                <Form style={{ width: "100%" }}>
                  {serverMsg && typeof serverMsg === "object"
                    ? serverMsg.map((msg) => (
                        <Alert variant="primary">{msg}</Alert>
                      ))
                    : null}
                  <div className="py-3">
                    <p>{items.key}</p>

                    <div className="mb-3">
                      <InputGroup>
                        <FormControl
                          name={"en"}
                          id={"en"}
                          onChange={FormikProps.handleChange("en")}
                          value={FormikProps.values[items.text.en]}
                          onBlur={FormikProps.handleBlur}
                          defaultValue={items.text.en}
                        />
                      </InputGroup>
                    </div>
                    <div className="mb-3">
                      <InputGroup>
                        <FormControl
                          name={"ar"}
                          id={"ar"}
                          onChange={FormikProps.handleChange("ar")}
                          value={FormikProps.values[items.text.ar]}
                          onBlur={FormikProps.handleBlur}
                          defaultValue={items.text.ar}
                        />
                      </InputGroup>
                    </div>
                  </div>
                  <div>
                    <Button
                      type="submit"
                      disabled={formLoading}
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
                          <LoadingOutlined />{" "}
                          <span className="px-2">Loading...</span>
                        </>
                      ) : (
                        <>
                          <SaveIcon /> <span className="px-2">save</span>
                        </>
                      )}
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          ))}

          {/* <Formik
            initialValues={
              {
                // navbarlinkhome: response.navbarlinkhome.text.en,
                // navbarlinkhome: response.navbarlinkhome.text.en,
                // home: response.navbarlinkhome,
                // navbarlinkhome: response.navbarlinkhome,
                // navbarlinkshop: response.navbarlinkshop,
                // navbarlinkabout: response.navbarlinkabout,
                // navbarlinkcontact: response.navbarlinkcontact,
                // navbarlinkpartners: response.navbarlinkpartners,
                // navbarlinkcareers: response.navbarlinkcareers,
                // navbarlinkblogs: response.navbarlinkblogs,
                // rights: response.rights,
                // bestsellerstitle: response.bestsellerstitle,
                // justforyoutitle: response.justforyoutitle,
                // showmore: response.showmore,
                // shortdes1: response.shortdes1,
                // shortdes2: response.shortdes2,
                // aboutdesc: response.aboutdesc,
                // establishmenttitle: response.establishmenttitle,
                // establishmentdesc: response.establishmentdesc,
                // our: response.our,
                // vision: response.vision,
                // visiondesc: response.visiondesc,
              }
            }
            // validationSchema={CreateSchema}
            onSubmit={(values, actions) => {
              console.log(values);

              // submit(values);
            }}
          >
            {(FormikProps) => (
              <Form style={{ width: "100%" }}>
                {serverMsg && typeof serverMsg === "object"
                  ? serverMsg.map((msg) => (
                      <Alert variant="primary">{msg}</Alert>
                    ))
                  : null}
                {console.log("dat2aaa", data)}

                <InputGroup>
                  <FormControl
                    type="text"
                    // placeholder={"en" + " " + input.key}
                    name="Home"
                    id="Home"
                    onChange={FormikProps.handleChange("Home")}
                    value={FormikProps.values["Home"]}
                    onBlur={FormikProps.handleBlur}
                    // defaultValue={"home"}
                  />
                </InputGroup> 
                {response.map((input) => (
                  <div>
                    <p>{input.key}</p>

                  

                    <div className="mb-3">
                      <InputGroup>
                        <FormControl
                          name={input.key}
                          id={input.key}
                          onChange={FormikProps.handleChange(input.key)}
                          value={FormikProps.values[input.text.en]}
                          onBlur={FormikProps.handleBlur}
                          defaultValue={input.text.en}
                        />
                      </InputGroup>



                      
                    </div>
                    <hr />
                  </div>
                ))}

               

                <div>
                  <Button
                    type="submit"
                    disabled={loading}
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
                        <SaveIcon /> <span className="px-2">save</span>
                      </>
                    )}
                  </Button>
                </div>
              </Form>
            )}
          </Formik> */}
        </Col>
      )}
    </Container>
  );
}

// items.map((key, value) => key, value.en)
