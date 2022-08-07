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
import CreateSchema from "../productSchema/CreateSchema";
import { useHistory } from "react-router-dom";
import { message } from "antd";
import SaveIcon from "@mui/icons-material/Save";
export default function AddPartner() {
  const user = useSelector((state) => state.user.data);

  const success = () => {
    message.success("You added new partner logo");
  };

  const [serverMsg, setServerMsg] = useState(null);

  const [loading, setLoading] = useState("");
  const [selectedFile, setSelectedFile] = useState("");

  const onFileChange = (event) => {
    // Update the state
    setSelectedFile(event.target.files[0]);
    console.log("lej", selectedFile);
  };

  const submit = (values) => {
    setLoading(true);

    console.log("Start");
    // Create an object of formData
    const formDataa = new FormData();

    formDataa.append("active", 1);
    formDataa.append("image", selectedFile);

    const options = {
      method: "post",
      url: `${process.env.REACT_APP_API_BASEURL}/api/admin/partners`,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
      data: formDataa,
    };

    axios(options)
      .then(function (response) {
        success();
        console.log(response);
        setLoading(false);
        setServerMsg(null);
      })
      .catch(function (err) {
        //handle error
        setServerMsg(err.response.data.data);

        console.log(err);
      });
  };
  const fileData = () => {
    if (selectedFile) {
      return (
        <div>
          {console.log(selectedFile)}
          <h2>File Details:</h2>

          <p>File Name: {selectedFile.name}</p>

          <p>File Type: {selectedFile.type}</p>

          <p>Last Modified: {selectedFile.lastModifiedDate.toDateString()}</p>

          <div className="d-flex align-items-center justify-content-start">
            <p> File image :</p>

            <img
              src={URL.createObjectURL(selectedFile)}
              style={{ width: "100px" }}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  };

  return (
    <Container className="mx-auto py-3">
      <h1> Partner Logo</h1>

      {serverMsg !== null ? <Alert variant="primary">{serverMsg}</Alert> : null}
      <input
        type="file"
        onChange={(event) => onFileChange(event)}
        name="image"
        required
        className="mx-auto text-center py-5"
      />
      {fileData()}

      <Button
        onClick={() => submit()}
        disabled={loading}
        style={{ width: "100%", minHeight: "30px" }}
        // startIcon={<SaveIcon />}
        style={{
          borderRadius: 35,
          backgroundColor: "black",
          padding: "10px ",
          fontSize: "18px",
          width: "100%",
          minHeight: "30px",
          margin: "20px",
        }}
        variant="contained"
      >
        {loading ? (
          <>
            <LoadingOutlined /> <span className="px-2">Loading...</span>
          </>
        ) : (
          <>
            <SaveIcon /> <span className="px-2">Add</span>
          </>
        )}
      </Button>
    </Container>
  );
}
