import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import Loading from '../components/Loading';
// import { ExclamationCircleOutlined } from "@ant-design/icons";

import {
    Table,
    Space,
    //  Popconfirm, message, Modal, Button
} from 'antd';
import { Container } from 'react-bootstrap';
import DeleteUserBtn from '../components/DeleteUserBtn.js';
import { Pagination } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function UsersList() {
    const user = useSelector((state) => state.user.data);

    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'full Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <>{text}</>,
        },

        {
            title: 'email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            render: (text, action) =>
                action.roles !== []
                    ? action.roles.map((item) => (
                          <>
                              {item.name} <br />
                          </>
                      ))
                    : 'no role',
        },

        {
            title: 'type',
            dataIndex: 'type',
            key: 'type',
            render: (text) =>
                text === 0
                    ? 'Super Admin'
                    : text === 1
                    ? 'Admin'
                    : text === 2
                    ? 'User'
                    : null,
        },

        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle" key={record.id}>
                    <Link to={`/EditUser/${record.id}`}>Edit</Link>
                    <DeleteUserBtn
                        info={record}
                        user={user}
                        update={setResponse}
                        setPages={setPages}
                    />
                </Space>
            ),
        },
    ];

    const [response, setResponse] = useState('');
    const [Pending, setPending] = useState(true);
    const [Pages, setPages] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const options = {
            method: 'get',
            url: `${process.env.REACT_APP_API_BASEURL}/api/admin/users`,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
                Authorization: `Bearer ${JSON.parse(
                    localStorage.getItem('token')
                )}`,
            },
        };

        axios(options)
            .then(function (response) {
                setResponse(response.data.data.data);
                setPages(response.data.data.meta);

                setPending(false);
            })
            .catch(function (error) {});
    }, []);

    const onPagination = (id) => {
        setCurrentPage(id);
        setPending(true);
        const options = {
            method: 'get',
            url: `${process.env.REACT_APP_API_BASEURL}/api/admin/users?page=${id}`,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
                Authorization: `Bearer ${JSON.parse(
                    localStorage.getItem('token')
                )}`,
            },
        };
        axios(options)
            .then(function (response) {
                setResponse(response.data.data.data);
                setPages(response.data.data.meta);
                setPending(false);
            })
            .catch(function (error) {});
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
