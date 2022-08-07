import React from 'react';
import { ExclamationCircleOutlined } from "@ant-design/icons";

import { Modal, message } from "antd";
import axios from "axios";
import { DeleteOutlined } from "@ant-design/icons";

export default function DeleteSliderbtn({ info, user, update }) {
  const { confirm } = Modal;

  const success = () => {
    message.success("You Deleted the product");
  };

  // const error = () => {
  //   message.error('This is an error message');
  // };

  const warning = () => {
    message.warning("You Clicked No");
  };

  const options = {
    method: "delete",
    url: `${process.env.REACT_APP_API_BASEURL}/api/admin/products/${info.id}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
    },
  };

  const showDeleteConfirm = function () {
    confirm({
      title: "Are you sure delete this product?",
      icon: <ExclamationCircleOutlined />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        axios(options)
          .then(function (response) {
            // handle success

            console.log("    handle sccess");
            console.log(response.data);
            if (response.data.data.length !== 0) {
              update(response.data.data.data);
            }
            // hooks(response.data);
            success();
          })
          .catch(function (error) {
            console.log("    handle error");

            console.log(error);
          });
      },
      onCancel() {
        console.log("Cancel");
        warning();
      },
    });
  };
  return <DeleteOutlined key="delete" onClick={() => showDeleteConfirm()} />;
}
