import React from 'react';

import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Loading from "../../components/Loading";
import { useSelector } from "react-redux";
import axios from "axios";
import { Pagination } from "antd";
import { Card } from "antd";
import DeleteSliderbtn from './DeleteSlider.jsx';

const { Meta } = Card;

export default function Sliderlist() {
  const user = useSelector((state) => state.user.data);

  const [response, setResponse] = useState("");
  const [Pending, setPending] = useState(true);
  const [Pages, setPages] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const options = {
    method: "get",
    url: `  ${process.env.REACT_APP_API_BASEURL}/api/admin/sliders`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
    },
  };

  useEffect(() => {
    axios(options)
      .then(function (response) {
        console.log("handle success");
        console.log(response.data.data);
        setResponse(response.data.data.data);
        setPages(response.data.data.meta);
        setPending(false);
      })
      .catch(function (error) {
        console.log("hande rror");
        console.log(error);
      });

    // return () => {
    //   null;
    // };
    console.log("heello", response, Pages, Pending);
  }, []);
  const onPagination = (id) => {
    setCurrentPage(id);
    setPending(true);
    const options = {
      method: "get",
      url: ` ${process.env.REACT_APP_API_BASEURL}/api/admin/sliders?page=${id}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    };
    axios(options)
      .then(function (response) {
        console.log("handle success");

        console.log(response.data.data);
        setResponse(response.data.data.data);
        setPages(response.data.data.meta);
        setPending(false);
      })
      .catch(function (error) {
        console.log("hande rror");
        console.log(error);
      });
  };

  return (
    <Container className="my-3">
      <Row>
        {Pending ? (
          <Loading />
        ) : (
          <Container className="py-5">
            <Row className="align-items-stretch">
              {response.map((info) => (
                <Col lg={3} md={6} xs={12} className="mx-auto mb-3 ">
                  <Card
                    cover={
                      <img
                        alt="example"
                        src={info.photo}
                      />
                    }
                    actions={[
                      <DeleteSliderbtn
                        info={info}
                        user={user}
                        update={setResponse}
                      />,
                    ]}
                  >
                  </Card>
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
      </Row>
    </Container>
  );
}
