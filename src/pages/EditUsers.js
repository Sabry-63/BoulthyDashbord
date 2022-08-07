import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
    Alert,
    FormControl,
    InputGroup,
    Form as Select,
    Container,
    Col,
} from 'react-bootstrap';
import { Formik, Form } from 'formik';
import { message } from 'antd';

import EditSchema from '../authSchema/EditSchema';
import { useHistory } from 'react-router-dom';

import axios from 'axios';
import { LoadingOutlined } from '@ant-design/icons';
import Button from '@mui/material/Button';
// import LoadingButton from "@mui/lab/LoadingButton";

import SaveIcon from '@mui/icons-material/Save';
import Loading from '../components/Loading';

import { Select as Selects } from 'antd';
const { Option } = Selects;

export default function EditUsers(props) {
    let history = useHistory();
    const [roles, setRoles] = useState(null);
    const [selectedRoles, setSelectedRoles] = useState([]);

    function handleChange(value) {
        console.log(`selected ${value}`);
        setSelectedRoles(value);
    }
    useEffect(() => {
        const options = {
            method: 'get',
            url: `${process.env.REACT_APP_API_BASEURL}/api/admin/roles`,
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
                console.log('    handle success');
                setRoles(response.data.data.data);

                setLoading(false);
                console.log('roles ', response.data.data.data);
            })
            .catch(function (error) {
                console.log('    hande error');
                console.log(error);
            });
    }, []);

    const success = () => {
        message.success('You Edited the User');
    };

    const user = useSelector((state) => state.user.data);

    const [response, setResponse] = useState('');
    const [Pending, setPending] = useState(true);
    const options = {
        method: 'get',
        url: `${process.env.REACT_APP_API_BASEURL}/api/admin/users/${props.match.params.id}`,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
            Authorization: `Bearer ${JSON.parse(
                localStorage.getItem('token')
            )}`,
        },
    };

    const [serverMsg, setServerMsg] = useState('');
    const [loading, setLoading] = useState('');

    useEffect(() => {
        axios(options)
            .then(function (response) {
                setResponse(response.data.data);
                setPending(false);
            })
            .catch(function (error) {});
    }, []);
    const submit = function name(params) {
        // let roles_id = selectedRoles.map((item) => item.key);
        setLoading(true);
        const options2 = {
            method: 'post',
            url: `${process.env.REACT_APP_API_BASEURL}/api/admin/users/${props.match.params.id}?_method=put`,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
                Authorization: `Bearer ${JSON.parse(
                    localStorage.getItem('token')
                )}`,
            },
            data: {
                name: params.FName,
                email: params.email,
                phone: params.phone,
                type: params.type,
                active: 1,
                role_ids:
                    selectedRoles !== null
                        ? selectedRoles.map((item) => item.key)
                        : null,
            },
        };
        // console.log(options);

        axios(options2)
            .then(function (response) {
                // handle success

                let edit = async function () {
                    setLoading(false);
                    success();
                    return response;
                };

                edit();
            })
            .catch((error) => {
                // handle error
                setLoading(false);
                // setServerMsg(response.data.data);
            });
    };

    const children = [];

    if (response) {
        for (let i = 0; i < response.roles.length; i++) {
            children.push({
                value: response.roles[i].id,
                label: response.roles[i].name,
                key: response.roles[i].id,
            });
            console.log(i, children);
        }
    }

    return (
        <Container>
            {Pending ? (
                <Loading />
            ) : (
                <Col md={6} xs={12} className="py-5 mx-auto">
                    <Formik
                        initialValues={{
                            type: response.type,
                            FName: response.name,
                            email: response.email,
                            phone: response.phone,
                        }}
                        enableReinitialize
                        onSubmit={(values, actions) => {
                            console.log(values, 'asdsad');

                            submit(values);
                        }}
                    >
                        {(FormikProps) => (
                            <Form style={{ width: '100%' }}>
                                {serverMsg && typeof serverMsg === 'object'
                                    ? serverMsg.map((msg) => (
                                          <Alert variant="primary">{msg}</Alert>
                                      ))
                                    : null}

                                {serverMsg && typeof serverMsg === 'string' ? (
                                    <Alert variant="primary">{serverMsg}</Alert>
                                ) : null}

                                <div className="mb-3">
                                    <InputGroup>
                                        <InputGroup.Text>
                                            {' '}
                                            <i className="fas fa-key"></i>
                                        </InputGroup.Text>

                                        <Select.Select
                                            name="type"
                                            id="type"
                                            onChange={FormikProps.handleChange(
                                                'type'
                                            )}
                                            value={FormikProps.values.type}
                                            onBlur={FormikProps.handleBlur}
                                            required
                                        >
                                            <option disabled>
                                                Account Type{' '}
                                            </option>
                                            <option value="1">Admin</option>
                                            <option value="2">User</option>
                                        </Select.Select>
                                    </InputGroup>
                                    {FormikProps.touched.email &&
                                    FormikProps.errors.email ? (
                                        <small className="text-danger text-center ">
                                            {FormikProps.touched.email &&
                                                FormikProps.errors.email}
                                        </small>
                                    ) : null}
                                </div>

                                <div className="mb-3">
                                    <InputGroup>
                                        <InputGroup.Text className="input_group_text">
                                            <i className="fas fa-user"></i>
                                        </InputGroup.Text>
                                        <FormControl
                                            className="form-control input_user"
                                            type="text"
                                            placeholder="First Name"
                                            name="FName"
                                            id="FName"
                                            onChange={FormikProps.handleChange(
                                                'FName'
                                            )}
                                            value={FormikProps.values.FName}
                                            onBlur={FormikProps.handleBlur}
                                            required
                                        />
                                    </InputGroup>
                                    {FormikProps.touched.FName &&
                                    FormikProps.errors.FName ? (
                                        <small className="text-danger text-center">
                                            {FormikProps.touched.FName &&
                                                FormikProps.errors.FName}
                                        </small>
                                    ) : null}
                                </div>

                                <div className="mb-3">
                                    <InputGroup>
                                        <InputGroup.Text>
                                            {' '}
                                            <i className="fas fa-at"></i>{' '}
                                        </InputGroup.Text>
                                        <FormControl
                                            placeholder="email"
                                            type="email"
                                            name="email"
                                            id="email"
                                            onChange={FormikProps.handleChange(
                                                'email'
                                            )}
                                            value={FormikProps.values.email}
                                            onBlur={FormikProps.handleBlur}
                                            required
                                        />
                                    </InputGroup>
                                    {FormikProps.touched.email &&
                                    FormikProps.errors.email ? (
                                        <small className="text-danger text-center ">
                                            {FormikProps.touched.email &&
                                                FormikProps.errors.email}
                                        </small>
                                    ) : null}
                                </div>

                                <div className="mb-3">
                                    <InputGroup>
                                        <InputGroup.Text>
                                            <i className="fas fa-phone"></i>{' '}
                                        </InputGroup.Text>
                                        <FormControl
                                            type="phone"
                                            placeholder="phone"
                                            name="phone"
                                            id="phone"
                                            onChange={FormikProps.handleChange(
                                                'phone'
                                            )}
                                            value={FormikProps.values.phone}
                                            onBlur={FormikProps.handleBlur}
                                            required
                                        />
                                    </InputGroup>
                                    {FormikProps.touched.phone &&
                                    FormikProps.errors.phone ? (
                                        <small className="text-danger text-center">
                                            {FormikProps.touched.phone &&
                                                FormikProps.errors.phone}
                                        </small>
                                    ) : null}
                                </div>

                                <Selects
                                    mode="tags"
                                    style={{ width: '100%' }}
                                    placeholder="Permissions ids"
                                    onChange={handleChange}
                                    className="pb-2"
                                    labelInValue
                                    defaultValue={children}
                                >
                                    {/* {children} */}
                                    {roles &&
                                        roles.map((permission) => (
                                            <Option key={permission.id}>
                                                {permission.name}
                                            </Option>
                                        ))}
                                </Selects>

                                <Button
                                    type="submit"
                                    value="Submit"
                                    disabled={loading}
                                    style={{ width: '100%', minHeight: '30px' }}
                                    variant="contained"
                                >
                                    {loading ? (
                                        <>
                                            <LoadingOutlined />{' '}
                                            <span className="px-2">
                                                Loading...
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                            <SaveIcon />{' '}
                                            <span className="px-2">Save</span>
                                        </>
                                    )}
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Col>
            )}
        </Container>
    );
}
