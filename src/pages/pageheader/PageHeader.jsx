import "./style.css";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Pagination, Space, Table } from "antd";

import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import FetchDataApi from "../api/inedx.jsx";

export default function PageHeader() {
  const user = useSelector((state) => state.user.data);
  const [data, setData] = useState("");
  const [dataLoading, setDataLoading] = useState(true);
  const [serverMsg, setServerMsg] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const options = {
    method: "get",
    url: `${process.env.REACT_APP_API_BASEURL}/api/admin/pageHeaders?${currentPage}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
    },
  };

  useEffect(() => {
    FetchDataApi(options, setData, setDataLoading, setServerMsg);
    console.log(data, dataLoading, serverMsg);
  }, [currentPage]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Key",
      dataIndex: "key",
      key: "key",
    },

    {
      title: "Photo",
      dataIndex: "photo",
      key: "photo",
      width: "100px",

      render: (t, r) => <img src={`${r.photo}`} alt="Header" />,
    },

    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle" key={record.id}>
          <Link
            to={`/EditPageHeader/${record.id}`}
            className="btn btn btn-info text-white text-center"
          >
            <i className="fa fa-edit me-1" aria-hidden="true"></i>
            Edit
          </Link>
        </Space>
      ),
    },
  ];
  return (
    <main className="mx-auto py-3 w-90 pageheader">
      {console.log(columns)}
      <Container>
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="fw-bold">Page Header</h1>
        </div>
        <h1>{serverMsg}</h1>
        <Table
          dataSource={data.data}
          columns={columns}
          bordered
          loading={dataLoading}
          pagination={false}
          rowClassName={"colSpan"}
          scroll={{ x: 400 }}
          size={"small"}
        />
        <div className="d-flex align-items-center justify-content-center py-3">
          <Pagination
            defaultCurrent={currentPage}
            total={data !== "" ? data.meta.total : 1}
            onChange={(e) => setCurrentPage(e)}
            showSizeChanger={false}
          />
        </div>
      </Container>
    </main>
  );
}
