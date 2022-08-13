import React from 'react';
import { useEffect, useState } from 'react';
import Loading from '../../components/Loading';
import { Table, Space } from 'antd';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Pagination } from 'antd';

export default function OrdersList() {
    const [response, setResponse] = useState('');
    const [Pending, setPending] = useState(true);
    const [page, setPage] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const options = {
            method: 'get',
            url: `${process.env.REACT_APP_API_BASEURL}/api/admin/orders?page=${currentPage}`,
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
                setPending(false);
                setCurrentPage(response.data.data.meta.current_page);
                setPage(response.data.data.meta.total);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [currentPage, page]);

    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text) => <>{text}</>,
        },
        {
            title: 'Total Promos',
            dataIndex: 'total_promos',
            key: 'total_promos',
            render: (number) => <>{number}</>,
        },
        {
            title: 'Sub Total',
            dataIndex: 'sub_total',
            key: 'sub_total',
            render: (number) => <>{number}</>,
        },
        {
            title: 'Final Total',
            dataIndex: 'final_total',
            key: 'final_total',
            render: (number) => <>{number}</>,
        },
        {
            title: 'Fees',
            dataIndex: 'fees',
            key: 'fees',
            render: (number) => <>{number}</>,
        },
        {
            title: 'Payment Method',
            dataIndex: 'payment_method',
            key: 'payment_method',
            render: (number) => (
                <>
                    {+number === 1
                        ? 'Credit Card'
                        : +number === 2
                        ? 'Cash On Delivery'
                        : +number === 3
                        ? 'Visa On Delivery'
                        : ''}
                </>
            ),
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            render: (text) => <>{text}</>,
        },

        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle" key={record.id}>
                    <Link
                        to={`/order/${record.id}`}
                        className="btn btn-info text-white"
                    >
                        Show
                    </Link>
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
                    />

                    <div className="d-flex align-items-center justify-content-center py-3">
                        <Pagination
                            defaultCurrent={currentPage}
                            total={page}
                            onChange={(e) => setCurrentPage(e)}
                            showSizeChanger={false}
                        />
                    </div>
                </Container>
            )}
        </div>
    );
}
