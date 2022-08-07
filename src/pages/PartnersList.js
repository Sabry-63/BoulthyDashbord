import { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import Loading from "../components/Loading";

import {
  Table,
  Space,
  //  Popconfirm, message, Modal, Button
} from "antd";
import { Col, Container, Row } from "react-bootstrap";
import DeleteBtn from "../components/DeleteUserBtn.js";
import { Pagination } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import { message } from "antd";

export default function PartnersList() {
  const user = useSelector((state) => state.user.data);

  const [response, setResponse] = useState("");
  const [Pending, setPending] = useState(true);
  const [Pages, setPages] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const options = {
      method: "get",
      url: `${process.env.REACT_APP_API_BASEURL}/api/admin/partners`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    };

    axios(options)
      .then(function (response) {
        console.log("    handle success");
        setResponse(response.data.data.data);
        setPages(response.data.data.meta);

        setPending(false);
        console.log(response.data.data.data);
      })
      .catch(function (error) {
        console.log("    hande error");
        console.log(error);
      });
  }, []);
  const onPagination = (id) => {
    setCurrentPage(id);
    setPending(true);
    const options = {
      method: "get",
      url: `${process.env.REACT_APP_API_BASEURL}/api/admin/partners?page=${id}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    };
    axios(options)
      .then(function (response) {
        console.log("    handle success");
        setResponse(response.data.data.data);
        setPages(response.data.data.meta);

        setPending(false);
        console.log(response.data.data.data);
      })
      .catch(function (error) {
        console.log("    hande error");
        console.log(error);
      });
  };

  const success = () => {
    message.success("You deleted partner logo");
  };

  const DeleteImg = (id) => {
    setPending(true);
    const options = {
      method: "delete",
      url: `${process.env.REACT_APP_API_BASEURL}/api/admin/partners/${id}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    };
    axios(options)
      .then(function (response) {
        console.log("    handle success");
        setResponse(response.data.data.data);
        setPages(response.data.data.meta);

        setPending(false);
        success();
        console.log(response.data.data.data);
      })
      .catch(function (error) {
        console.log("    hande error");
        console.log(error);
      });
  };

  return (
    <div>
      {Pending ? (
        <Loading />
      ) : (
        <Container className="py-5 text-center">
          <Row>
            {response && response.length === 0 ? <h1>no data</h1> : null}
            {response &&
              response.map((partner) => (
                <Col sm={12} md={6} lg={4}>
                  <img
                    src={partner.image}
                    alt="partner-logo"
                    className="img-fluid"
                  />
                  <button
                    onClick={() => DeleteImg(partner.id)}
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      //   width: "80%",
                    }}
                  >
                    <i class="fas fa-window-close fa-2x py-2"></i>
                  </button>
                </Col>
              ))}
          </Row>

          <div className="d-flex align-items-center justify-content-center py-3">
            <Pagination
              defaultCurrent={currentPage}
              total={Pages.total}
              onChange={(e) => onPagination(e)}
              showSizeChanger={false}
            />
          </div>
        </Container>
      )}
    </div>
  );
}
