import {
    Alert,
    FormControl,
    InputGroup,
    Form as Select,
    Container,
    Col,
} from 'react-bootstrap';
import { Formik, Form } from 'formik';

import CreateSchema from '../authSchema/CreateSchema';
import { useEffect, useState } from 'react';
// import { useRouter } from "next/router";
import { message } from 'antd';

import axios from 'axios';
import { LoadingOutlined } from '@ant-design/icons';
import Button from '@mui/material/Button';
// import LoadingButton from "@mui/lab/LoadingButton";

import SaveIcon from '@mui/icons-material/Save';
import { Select as Selects } from 'antd';
const { Option } = Selects;

export default function CreateUser() {
    const success = () => {
        message.success('You Created Account');
    };

    const [serverMsg, setServerMsg] = useState(null);
    const [serverMsgs, setServerMsgs] = useState(null);
    const [roles, setRoles] = useState(null);
    const [selectedRoles, setSelectedRoles] = useState(null);

    const [loading, setLoading] = useState('');
    function handleChange(value) {
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
                setRoles(response.data.data.data);

                setLoading(false);
            })
            .catch(function (error) {
                console.log('    hande error');
                console.log(error);
            });
    }, []);

    const submit = function name(params) {
        setLoading(true);
        const options = {
            method: 'post',
            url: `${process.env.REACT_APP_API_BASEURL}/api/admin/users`,
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
                password: params.password,
                password_confirmation: params.confirmPassword,
                role_ids: selectedRoles,
            },
        };
        // console.log(options);

        axios(options)
            .then(function (response) {
                // handle success
                setServerMsgs(null);
                setServerMsg(null);

                let create = async function () {
                    console.log('    handle success2');
                    console.log(response);
                    // history.push("/Users");
                    setLoading(false);
                    success();
                    // if (
                    //   response.data.status_code !== 200 &&
                    //   response.data.status_code !== 201
                    // ) {
                    //   setServerMsgs(response.data.data);
                    //   setLoading(false);
                    // } else {
                    //   // function someFunc() {
                    //   setServerMsg(response.data.message);
                    //   history.push("/Users");
                    //   setLoading(false);
                    //   success();
                    // }
                    return response;
                };

                create();
            })
            .catch((error) => {
                // handle error
                setLoading(false);
                // setServerMsg(error.response.data);

                console.log('    handle error');
                setServerMsg(error.response.data.data);

                console.log(error.response.data.data);
            });
    };

    return (
        <Container>
            <Col md={6} xs={12} className="py-5 mx-auto">
                <Formik
                    initialValues={{
                        type: '1',
                        FName: '',
                        email: '',
                        phone: '',
                        password: '',
                        confirmPassword: '',
                    }}
                    validationSchema={CreateSchema}
                    onSubmit={(values, actions) => {
                        console.log(values);

                        submit(values);
                    }}
                >
                    {(FormikProps) => (
                        <Form style={{ width: '100%' }}>
                            {serverMsgs !== null
                                ? serverMsgs.map((msg) => (
                                      <Alert variant="primary">{msg}</Alert>
                                  ))
                                : null}

                            {serverMsg !== null ? (
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
                                        <option disabled>Account Type </option>
                                        <option value="1">Admin</option>
                                        <option value="2">User</option>
                                    </Select.Select>
                                </InputGroup>
                                {FormikProps.touched.type &&
                                FormikProps.errors.type ? (
                                    <small className="text-danger text-center ">
                                        {FormikProps.touched.type &&
                                            FormikProps.errors.type}
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
                            <div className="mb-3">
                                <InputGroup>
                                    <InputGroup.Text>
                                        <i className="fas fa-lock"></i>{' '}
                                    </InputGroup.Text>
                                    <FormControl
                                        type="password"
                                        placeholder="password"
                                        name="password"
                                        id="password"
                                        onChange={FormikProps.handleChange(
                                            'password'
                                        )}
                                        value={FormikProps.values.password}
                                        onBlur={FormikProps.handleBlur}
                                        required
                                    />
                                </InputGroup>
                                {FormikProps.touched.password &&
                                FormikProps.errors.password ? (
                                    <small className="text-danger text-center">
                                        {FormikProps.touched.password &&
                                            FormikProps.errors.password}
                                    </small>
                                ) : null}
                            </div>

                            <div className="mb-3">
                                <InputGroup>
                                    <InputGroup.Text>
                                        <i className="fas fa-user-lock"></i>
                                    </InputGroup.Text>
                                    <FormControl
                                        type="password"
                                        placeholder="confirmPassword"
                                        name="confirmPassword"
                                        id="confirmPassword"
                                        onChange={FormikProps.handleChange(
                                            'confirmPassword'
                                        )}
                                        value={
                                            FormikProps.values.confirmPassword
                                        }
                                        onBlur={FormikProps.handleBlur}
                                        required
                                    />
                                </InputGroup>
                                {FormikProps.touched.confirmPassword &&
                                FormikProps.errors.confirmPassword ? (
                                    <small className="text-danger text-center">
                                        {FormikProps.touched.confirmPassword &&
                                            FormikProps.errors.confirmPassword}
                                    </small>
                                ) : null}
                            </div>

                            <Selects
                                mode="tags"
                                style={{ width: '100%' }}
                                placeholder="Permissions ids"
                                onChange={handleChange}
                                className="pb-2"
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
                                disabled={loading}
                                style={{ width: '100%', minHeight: '30px' }}
                                variant="contained"
                            >
                                {loading ? (
                                    <>
                                        <LoadingOutlined />
                                        <span className="px-2">Loading...</span>
                                    </>
                                ) : (
                                    <>
                                        <SaveIcon />{' '}
                                        <span className="px-2">Create</span>
                                    </>
                                )}
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Col>
        </Container>
    );
}
