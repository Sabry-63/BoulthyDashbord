import { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import Loading from "../components/Loading";
// import { ExclamationCircleOutlined } from "@ant-design/icons";

import {
  Table,
  Space,
  //  Popconfirm, message, Modal, Button
} from "antd";
import { Container } from "react-bootstrap";
import DeleteDiscountBtn from "../components/DeleteDiscountBtn.js";
import { Pagination } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
export default function DiscountsList() {
  const user = useSelector((state) => state.user.data);

  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Product Id",
      dataIndex: "product_id",
      key: "product_id",
      render: (text) => <>{text}</>,
    },
    {
      title: "Discount Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <>{text}</>,
    },

    {
      title: "Percentage",
      dataIndex: "percentage",
      key: "percentage",
    },
    {
      title: "Start Date",
      dataIndex: "start_date",
      key: "start_date",
    },
    {
      title: "End Date",
      dataIndex: "end_date",
      key: "end_date",
    },
    {
      title: "Status",
      dataIndex: "active",
      key: "active",
      render: (text) => (text === 1 ? "Active" : "Non Active"),
    },

    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle" key={record.id}>
          <Link to={`/EditDiscount/${record.id}`}>Edit</Link>
          <DeleteDiscountBtn
            info={record}
            user={user}
            update={setResponse}
            setPages={setPages}
          />
        </Space>
      ),
    },
  ];

  const [response, setResponse] = useState("");
  const [Pending, setPending] = useState(true);
  const [Pages, setPages] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const options = {
      method: "get",
      url: `${process.env.REACT_APP_API_BASEURL}/api/admin/discounts`,
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
      url: `${process.env.REACT_APP_API_BASEURL}/api/admin/discounts?page=${id}`,
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
