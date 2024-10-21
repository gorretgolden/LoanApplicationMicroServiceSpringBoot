import {React, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Container, Form, Button, Card, Row, Col,Spinner } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import { baseUri } from '../constants/constants';

const LoginForm = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false); 
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('Email is required'),
            password: Yup.string()
                .required('Password is required')
                .min(6, 'Password must be at least 6 characters'),
        }),
        onSubmit: async (values) => {
            setLoading(true); //Updating the loading state to true
            
            try {
                const response = await fetch(`${baseUri}/auth/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Login failed');
                }

                const data = await response.json();

                // Checking if the login was successful
                if (data.success) {
                    const userData = data.data; // Obtaining the nested respone

                    toast.success(data.message, {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });

                    // Storing the customer details in the localStorage 
                     //for now (am not using customer details endpoint)
                    localStorage.setItem('userToken', userData.token);
                    localStorage.setItem('userId', userData.id);
                    localStorage.setItem('userName', userData.name);
                    localStorage.setItem('userEmail', userData.email);
                    localStorage.setItem('userContact', userData.contact);

                    // Delay navigation to allow the toast to be shown
                    setTimeout(() => {
                        navigate('/loans/new-loan-application');
                    }, 3000); // Delaying for 3 seconds
                } else {
                    throw new Error('Unexpected response');
                }
            } catch (error) {
                console.error('Error:', error);

                // Showing the error toast message
                toast.error(error.message || 'Login failed', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            }finally{

                 //Updating the loading state to false after the request
                setLoading(false);
            }
        },
    });

    return (
        <Container className="mt-4">
            <ToastContainer />
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card className="shadow p-4">
                        <Card.Body>
                        <img src={logo} alt="Logo" width="50" height="50" className="d-inline-block align-top" />
                            <h4 className="mb-4 text-center mt-3">Sign Into Your Account</h4>
                            <Form onSubmit={formik.handleSubmit}>
                                {/* Email Field */}
                             <div className='text-left'>
                             <Form.Group controlId="formEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.email}
                                        isInvalid={formik.touched.email && formik.errors.email}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.email}
                                    </Form.Control.Feedback>
                                </Form.Group>
                             </div>

                                <br />

                                {/* Password Field */}
                        <div className='text-left'>
                        <Form.Group controlId="formPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.password}
                                        isInvalid={formik.touched.password && formik.errors.password}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.password}
                                    </Form.Control.Feedback>
                                </Form.Group>


                        </div>
                                <Button variant="success" type="submit" className="mt-4 w-100">
                                {loading ? (
                                        <>
                                            <Spinner animation="border" size="sm" /> 
                                            <span className="ms-2">Logging In...</span>
                                        </>
                                    ) : (
                                        'Login'
                                    )}
                                </Button>
                            </Form>

                            <div className="text-center mt-3">
                                <small>Don't have an account? <a href="/register" className='text-decoration-none text-success'>Register here</a></small>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default LoginForm;
