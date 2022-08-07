import { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import Loading from "../components/Loading";

import {
  Table,
  Space,
  //  Popconfirm, message, Modal, Button
} from "antd";
import { Container } from "react-bootstrap";
// import DeleteBtn from "../components/DeleteUserBtn.js";
import { Pagination } from "antd";
// import { Link } from "react-router-dom";
import axios from "axios";
// import DeleteCategoryBtn from "../components/DeleteCategoryBtn";

export default function TransactionsList() {
  const user = useSelector((state) => state.user.data);

  useEffect(() => {
    const options = {
      method: "get",
      url: `${process.env.REACT_APP_API_BASEURL}/api/admin/transactions`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    };

    axios(options)
      .then(function (response) {
        console.log("    handle success");
        console.log(response.data);
        setResponse(response.data.data.data);
        setPages(response.data.data.meta);

        setPending(false);
        console.log(response.data.data.data);
        console.log(response.data.data.data[1].user.name);
      })
      .catch(function (error) {
        console.log("    hande error");
        console.log(error);
      });
  }, []);

  const columns = [

    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "user id",
      dataIndex: "user{name}",
      key: "user{name}",
      render: (text) => <>{text}</>,
    },
    {
      title: "Order Id",
      dataIndex: "order_id",
      key: "user_id",
      render: (text) => <>{text}</>,
    },
    {
      title: "Entry",
      dataIndex: "entry",
      key: "entry",
      render: (text) => (text === 1 ? "Credit" : text === 2 ? "debit" : null),
    },

    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (text) =>
        text === 1
          ? "SALES "
          : text === 2
          ? "REFUND "
          : text === 3
          ? "COMMISSION  "
          : text === 4
          ? "REVERSION   "
          : null,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (text) => <>{text}</>,
    },
    {
      title: "Note",
      dataIndex: "note",
      key: "note",
      render: (text) => <>{text}</>,
    },
    {
      title: "Deleted At",
      dataIndex: "deleted_at",
      key: "deleted_at",
      render: (text) => <>{text}</>,
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (text) => <>{text}</>,
    },
    {
      title: "Updated At",
      dataIndex: "updated_at",
      key: "updated_at",
      render: (text) => <>{text}</>,
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
      url: `${process.env.REACT_APP_API_BASEURL}/api/admin/transactions?page=${id}`,
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

  return (
    <div>
      {Pending ? (
        <Loading />
      ) : (
        <Container className="py-5">
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
