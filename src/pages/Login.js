import {
    Alert,
    FormControl,
    InputGroup,
    Form as Select,
} from 'react-bootstrap';
import '../styles/Login.css';
import { Formik, Form } from 'formik';

import SignInSchema from '../authSchema/SignInSchema';
import { useState } from 'react';

import axios from 'axios';

import { useHistory } from 'react-router-dom';

import logo from '../Blogo.png';

// "redux";
import {
    //  useSelector,
    useDispatch,
} from 'react-redux';
import { SetUser } from '../redux/User';
// icons
import { LoadingOutlined } from '@ant-design/icons';

export default function Login() {
    let history = useHistory();
    let dispatch = useDispatch();

    const [serverMsg, setServerMsg] = useState('');
    const [loading, setLoading] = useState('');

    const submit = function name(params) {
        setLoading(true);
        console.log(params);
        const options = {
            method: 'post',
            url: `${process.env.REACT_APP_API_BASEURL}/api/admin/login`,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
                // Authorization: `Bearer ${token}`,
            },
            data: {
                email: params.Email,
                password: params.Password,
                type: 1,
            },
        };

        axios(options)
            .then(function (response) {
                // handle success

                let login = async function () {
                    console.log('    handle success');
                    setServerMsg(null);
                    localStorage.setItem(
                        'token',
                        JSON.stringify(response.data.data.token)
                    );
                    console.log(response.data);
                    dispatch(SetUser(response.data));
                    setLoading(false);
                    return response.data;
                };
                login().then((data) => history.push('/Users'));
            })
            .catch(function (error) {
                // handle error
                console.log('    handle error');
                setServerMsg(error.response.data.message);
                setLoading(false);

                console.log(error);
            });
    };

    return (
        <div className="loginPage ">
            <div className="body">
                <div className="login_name_wrapper">
                    <div className="d-flex justify-content-center">
                        Beaulthy
                    </div>
                </div>
                <div className="d-flex justify-content-center h-50">
                    <div className="user_card">
                        <div className="d-flex justify-content-center">
                            <div className="login_logo_container">
                                <img
                                    // src="https://crezzur.com/img/projects/27-home_default.png"
                                    src={logo}
                                    className="login_logo"
                                    alt="Logo"
                                />
                            </div>
                        </div>
                        <div className="d-flex justify-content-center form_container">
                            <Formik
                                initialValues={{
                                    Email: '',
                                    Password: '',
                                    type: '0',
                                }}
                                validationSchema={SignInSchema}
                                onSubmit={(values, actions) => {
                                    submit(values);
                                    // console.log(values);
                                }}
                            >
                                {(FormikProps) => (
                                    <Form style={{ width: '320px' }}>
                                        {serverMsg && (
                                            <Alert variant="primary">
                                                {serverMsg}
                                            </Alert>
                                        )}
                                        <div className="mb-3">
                                            <InputGroup>
                                                <InputGroup.Text className="input_group_text">
                                                    <i className="fas fa-key"></i>
                                                </InputGroup.Text>

                                                <Select.Select
                                                    name="type"
                                                    id="type"
                                                    className="form-control input_user"
                                                    onChange={FormikProps.handleChange(
                                                        'type'
                                                    )}
                                                    value={
                                                        FormikProps.values.type
                                                    }
                                                    onBlur={
                                                        FormikProps.handleBlur
                                                    }
                                                    required
                                                >
                                                    <option disabled>
                                                        Account Type{' '}
                                                    </option>
                                                    <option value={0}>
                                                        {' '}
                                                        Super Admin
                                                    </option>
                                                    <option value={1}>
                                                        Admin
                                                    </option>
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
                                                    placeholder="Email"
                                                    name="Email"
                                                    id="Email"
                                                    onChange={FormikProps.handleChange(
                                                        'Email'
                                                    )}
                                                    value={
                                                        FormikProps.values.Email
                                                    }
                                                    onBlur={
                                                        FormikProps.handleBlur
                                                    }
                                                    required
                                                />
                                            </InputGroup>
                                            {FormikProps.touched.Email &&
                                            FormikProps.errors.Email ? (
                                                <small className="text-danger text-center">
                                                    {FormikProps.touched
                                                        .Email &&
                                                        FormikProps.errors
                                                            .Email}
                                                </small>
                                            ) : null}
                                        </div>

                                        <div className="mb-3">
                                            <InputGroup>
                                                <InputGroup.Text className="input_group_text">
                                                    {' '}
                                                    <i className="fas fa-lock"></i>
                                                </InputGroup.Text>
                                                <FormControl
                                                    className="form-control input_pass"
                                                    placeholder="*********"
                                                    type="Password"
                                                    name="Password"
                                                    id="Password"
                                                    onChange={FormikProps.handleChange(
                                                        'Password'
                                                    )}
                                                    value={
                                                        FormikProps.values
                                                            .Password
                                                    }
                                                    onBlur={
                                                        FormikProps.handleBlur
                                                    }
                                                    required
                                                />
                                            </InputGroup>
                                            {FormikProps.touched.Password &&
                                            FormikProps.errors.Password ? (
                                                <small className="text-danger text-center ">
                                                    {FormikProps.touched
                                                        .Password &&
                                                        FormikProps.errors
                                                            .Password}
                                                </small>
                                            ) : null}
                                        </div>

                                        <div className="d-flex justify-content-center mt-3 login_container">
                                            <button
                                                type="submit"
                                                className="btn login_btn"
                                            >
                                                {loading ? (
                                                    <LoadingOutlined />
                                                ) : (
                                                    'Login'
                                                )}
                                            </button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>

                            {/* </form> */}
                        </div>
                        {/* <div className="mt-4">
          <div className="d-flex justify-content-center links">
            <a href="#">Forgot your password?</a>
          </div>
        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
}
