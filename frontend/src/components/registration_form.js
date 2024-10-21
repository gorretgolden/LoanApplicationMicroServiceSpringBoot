import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Container, Form, Button, Card, Row, Col, InputGroup, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import { baseUri } from '../constants/constants';
import logo from '../assets/images/logo.png';
const RegistrationForm = () => {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);//state for password toggle
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); //state for  confirm password toggle
    const [loading, setLoading] = useState(false); // state for loader

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            contact: '',
            gender: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            contact: Yup.string()
                .required('Contact number is required')
                .matches(/^[0-9]+$/, 'Contact number must be digits only')
                .length(10, 'Contact number must be exactly 10 digits'),
            gender: Yup.string().required('Gender is required'),
            password: Yup.string()
                .required('Password is required')
                .min(6, 'Password must be at least 6 characters'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('Confirm password is required'),
        }),
        onSubmit: async (values) => {
            setLoading(true); 


            try {
                const response = await fetch(`${baseUri}/auth/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                 
                    },
                    body: JSON.stringify({
                        name: values.name,
                        email: values.email,
                        contact: values.contact,
                        gender: values.gender,
                        password: values.password,
                        confirm_password: values.confirmPassword,
                    }),
                });

                const data = await response.json();
                console.log(data,'testing')

                if (!response.ok || data.success === false) {
                    toast.error(data.message || 'Registration failed', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });
                } else {
                    toast.success('Registration successful! Redirecting to login...', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });

                    setTimeout(() => navigate('/login'), 2000);
                }
            } catch (error) {
             console.log(error)
                toast.error('Registration failed', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            } finally {
                // Updating  the loading state after request
                setLoading(false); 
            }
        },
    });

    return (
        <Container className="mt-4 mb-4">
            <ToastContainer />
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card className="shadow">
                        <Card.Body>
                        <img src={logo} alt="Logo" width="40" height="40" className="d-inline-block align-top" />
                            <h5 className="text-center mb-4">Create a new Account</h5>
                            <hr/>
                            <Form onSubmit={formik.handleSubmit}>
                                <div className='text-left'>
                                    <Form.Group controlId="formName">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="name"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.name}
                                            isInvalid={formik.touched.name && formik.errors.name}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.name}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </div>

                                <div className='text-left'>
                                    <Form.Group controlId="formEmail" className="mt-3">
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

                                <div className='text-left'>
                                    <Form.Group controlId="formContact" className="mt-3">
                                        <Form.Label>Contact</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="contact"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.contact}
                                            isInvalid={formik.touched.contact && formik.errors.contact}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.contact}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </div>
                                <div className='text-left'>
                                    <Form.Group controlId="formGender" className="mt-3">
                                        <Form.Label>Gender</Form.Label>
                                        <Form.Select
                                            name="gender"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.gender}
                                            isInvalid={formik.touched.gender && formik.errors.gender}
                                        >
                                            <option value="">Select Gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.gender}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </div>

                                <div className='text-left'>
                                    <Form.Group controlId="formPassword" className="mt-3">
                                        <Form.Label>Password</Form.Label>
                                        <InputGroup>
                                            <Form.Control
                                                type={showPassword ? 'text' : 'password'}
                                                name="password"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.password}
                                                isInvalid={formik.touched.password && formik.errors.password}
                                            />
                                            <Button
                                                variant="outline-secondary"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                                            </Button>
                                            <Form.Control.Feedback type="invalid">
                                                {formik.errors.password}
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Form.Group>
                                </div>

                                <div className='text-left'>
                                    <Form.Group controlId="formConfirmPassword" className="mt-3">
                                        <Form.Label>Confirm Password</Form.Label>
                                        <InputGroup>
                                            <Form.Control
                                                type={showConfirmPassword ? 'text' : 'password'}
                                                name="confirmPassword"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.confirmPassword}
                                                isInvalid={formik.touched.confirmPassword && formik.errors.confirmPassword}
                                            />
                                            <Button
                                                variant="outline-secondary"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            >
                                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                            </Button>
                                            <Form.Control.Feedback type="invalid">
                                                {formik.errors.confirmPassword}
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Form.Group>
                                </div>

                                <Button variant="success" type="submit" className="mt-4 w-100" block disabled={loading}>
                                    {loading ? (
                                        <>
                                            <Spinner animation="border" size="sm" /> 
                                            <span className="ms-2">Registering...</span>
                                        </>
                                    ) : (
                                        'Register'
                                    )}
                                </Button>
                            </Form>
                            <p className="mt-3 text-center">
                                Already have an account? <Link to="/login" className='text-decoration-none text-success'>Login here</Link>
                            </p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default RegistrationForm;
