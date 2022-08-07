import { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import Loading from "../components/Loading";

import {
  Table,
  Space,
  //  Popconfirm, message, Modal, Button
} from "antd";
import { Container } from "react-bootstrap";
import DeleteBtn from "../components/DeleteUserBtn.js";
import { Pagination } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";

export default function ApplicationsList() {
  const user = useSelector((state) => state.user.data);

  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "vacancy",
      dataIndex: "vacancy",
      key: "vacancy",
      render: (text) => <>{text.title}</>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <>{text}</>,
    },

    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => <>{text}</>,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      render: (text) => <>{text}</>,
    },
    {
      title: "Note",
      dataIndex: "note",
      key: "note",
      render: (text) => <>{text}</>,
    },
    {
      title: "Cv",
      dataIndex: "cv",
      key: "cv",
      render: (text) => (
        <a href={text} target="_blank">
          view
        </a>
      ),
    },
  ];

  const [response, setResponse] = useState("");
  const [Pending, setPending] = useState(true);
  const [Pages, setPages] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const onPagination = (id) => {
    setCurrentPage(id);
    setPending(true);
    const options = {
      method: "get",
      url: `${process.env.REACT_APP_API_BASEURL}/api/admin/job-applications?page=${id}`,
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

  useEffect(() => {
    const options = {
      method: "get",
      url: `${process.env.REACT_APP_API_BASEURL}/api/admin/job-applications`,
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
  return (
    <div>
      {Pending ? (
        <Loading />
      ) : (
        <Container className="py-5">
          {console.log("test")}
          <Table
            bordered
            columns={columns}
            dataSource={response}
            pagination={false}
          />

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
