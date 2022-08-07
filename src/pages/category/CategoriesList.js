import React from 'react';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../../components/Loading";
import {Table,Space} from "antd";
import { Container } from "react-bootstrap";
import DeleteCategoryBtn from "./DeleteCategoryBtn.js";
import { Link } from "react-router-dom";
import axios from "axios";


export default function CategoriesList() {
  
  const [response, setResponse] = useState("");
  const [Pending, setPending] = useState(true);

  const user = useSelector((state) => state.user.data);

  useEffect(() => {
    const options = {
      method: "get",
      url: `${process.env.REACT_APP_API_BASEURL}/api/admin/categories`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    };

    axios(options)
      .then(function (response) {
        console.log("handle success");
        setResponse(response.data.data.data);
        setPending(false);
        console.log(response.data.data);
      })
      .catch(function (error) {
        console.log("hande error");
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
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <>{text}</>,
    },
    {
      title: "active",
      dataIndex: "active",
      key: "active",
      render: (text) =>
        text === 0 ? "Not Active" : text === 1 ? "Active" : null,
    },

    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle" key={record.id}>
          <Link to={`/addcategory/${record.id}`} className="btn btn-success">Add Sub Category in This Category</Link>
          <Link to={`/EditCategory/${record.id}`} className="btn btn-primary">Edit</Link>
          <DeleteCategoryBtn
            info={record}
            user={user}
            update={setResponse}
            />
        </Space>
      ),
    },
  ];


  


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
            expandable={{
              expandedRowRender: (record) =>
                console.log("res", record),
              rowExpandable: (record) => record.children === null,
            }}
          />

        </Container>
      )}
    </div>
  )
}
