import React from 'react';
import { useEffect, useState } from 'react';
import Loading from '../../components/Loading';
import { Table, Space } from 'antd';
import { Container } from 'react-bootstrap';
import axios from 'axios';

export default function Order(props) {
    const [response, setResponse] = useState('');
    const [Pending, setPending] = useState(true);

    useEffect(() => {
        const options = {
            method: 'get',
            url: `${process.env.REACT_APP_API_BASEURL}/api/admin/orders/${props.match.params.id}`,
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
                setResponse(response.data.data);
                setPending(false);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    // const finishOrder = () => {
    //     const options = {
    //         method: 'POST',
    //         url: `${process.env.REACT_APP_API_BASEURL}/api/admin/orders/finalize/${props.match.params.id}`,
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json;charset=UTF-8',
    //             Authorization: `Bearer ${JSON.parse(
    //                 localStorage.getItem('token')
    //             )}`,
    //         },
    //         data: response,
    //     };

    //     axios(options)
    //         .then(function (response) {
    //             console.log(response);
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // };

    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Order Id',
            dataIndex: 'order_id',
            key: 'order_id',
            render: (text) => <>{text}</>,
        },
        {
            title: 'Product Name',
            dataIndex: 'product_name',
            key: 'product_name',
            render: (text) => <>{text}</>,
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (number) => <>{number}</>,
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (number) => <>{number}</>,
        },

        {
            title: 'Image',
            dataIndex: 'product_image',
            key: 'product_image',
            render: (img) => <img src={img} width="100" height="100" />,
        },
        // {
        //     title: 'Action',
        //     key: 'action',
        //     render: (text, record) => (
        //         <Space size="middle" key={record.id}>
        //             <button
        //                 className="btn btn-success"
        //                 onClick={() => finishOrder()}
        //                 disabled={
        //                     response.status === 'In Transit' ? false : true
        //                 }
        //             >
        //                 Finish
        //             </button>
        //         </Space>
        //     ),
        // },
    ];

    return (
        <div>
            {Pending ? (
                <Loading />
            ) : (
                <Container className="py-5">
                    {response && (
                        <Table
                            bordered
                            columns={columns}
                            dataSource={response.items}
                            pagination={false}
                            expandable={{
                                expandedRowRender: (record) =>
                                    console.log('res', record),
                                rowExpandable: (record) =>
                                    record.children !== null,
                            }}
                        />
                    )}
                </Container>
            )}
        </div>
    );
}
