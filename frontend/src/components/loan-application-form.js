import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Container, Form, Button, Card, Row, Col, Spinner } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { baseUri } from '../constants/constants';

const customToastStyle = {
    width: '800px',
    margin: '0 auto',
};

// Validation schema
const validationSchema = Yup.object({
    loan_amount: Yup.number()
        .required('Loan Amount is required')
        .positive('Loan Amount must be a positive number')
        .integer('Loan Amount must be an integer')
        .min(100000, 'Minimum loan amount is UGX 100,000')
        .max(8000000, 'Maximum loan amount is UGX 8,000,000'),
    repayment_period: Yup.number()
        .required('Repayment Period is required')
        .positive('Repayment Period must be a positive number')
        .integer('Repayment Period must be an integer'),
    loan_purpose: Yup.string().required('Loan Purpose is required'),
});

const LoanApplicationForm = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false); 

    const formik = useFormik({
        initialValues: {
            loan_amount: '',
            repayment_period: '',
            loan_purpose: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            const token = localStorage.getItem('userToken');
            if (!token) {
                toast.error('User not authenticated.', {
                    position: "top-right",
                    autoClose: 7000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    style: customToastStyle,
                });
                return;
            }

            const userId = localStorage.getItem('userId');

            // Defining the request body
            const requestBody = {
                customer_id: userId,
                loan_amount: values.loan_amount,
                repayment_period: values.repayment_period,
                loan_purpose: values.loan_purpose,
            };

            setLoading(true); // Start loading

            try {
                const response = await fetch(`${baseUri}/loans/apply`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                        'X-Requested-With': 'XMLHttpRequest',
                    },
                    body: JSON.stringify(requestBody),
                });

                const responseData = await response.json();

                if (!response.ok) {
                    throw new Error(responseData.message || 'Network response was not ok');
                }

                if (responseData.success) {
                    toast.success(responseData.message, {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });

                    setTimeout(() => {
                        navigate('/customer/all-loan-applications');
                    }, 3000);
                } else {
                    throw new Error('Unexpected response');
                }

            } catch (error) {
                console.error('Error:', error);

                toast.error(
                    error.message || 'Loan application failed, try again later', {
                    position: "top-center",
                    autoClose: 8000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            } finally {
                setLoading(false); // Stop loading
            }
        },
    });

    return (
        <Container className="mt-4">
            <ToastContainer />
            <Row className="p-4">
                <Col>
                    <img
                        alt="Loan Application"
                        width="500"
                        height="500"
                        src='https://img.freepik.com/free-vector/bank-loan-concept-illustration_114360-17863.jpg?uid=R166256386&ga=GA1.1.1084094240.1727827442&semt=ais_hybrid'
                    />
                </Col>
                <Col>
                    <Card style={{ width: '30rem' }} className="shadow">
                        <Card.Body>
                            <h5 className="text-center mt-3">Loan Application Form</h5>
                            <hr />
                            <Form onSubmit={formik.handleSubmit} className="mt-4" style={{ maxWidth: '500px', margin: '0 auto' }}>
                                <div className='text-left'>
                                    <Form.Group controlId="formLoanAmount">
                                        <Form.Label>Loan Amount</Form.Label>
                                        <Form.Control
                                            type="number"
                                            min='100000'
                                            name="loan_amount"
                                            onChange={formik.handleChange}
                                            placeholder='Enter the loan amount'
                                            onBlur={formik.handleBlur}
                                            value={formik.values.loan_amount}
                                            isInvalid={formik.touched.loan_amount && formik.errors.loan_amount}
                                            style={{ width: '100%' }}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.loan_amount}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </div>
                                <br />

                                <div className='text-left'>
                                    <Form.Group controlId="formRepaymentPeriod">
                                        <Form.Label>Repayment Period (in months)</Form.Label>
                                        <Form.Control
                                            type="number"
                                            min="1"
                                            max='20'
                                            name="repayment_period"
                                            placeholder='Enter the repayment period'
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.repayment_period}
                                            isInvalid={formik.touched.repayment_period && formik.errors.repayment_period}
                                            style={{ width: '100%', textAlign: 'left' }}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.repayment_period}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </div>
                                <br />

                                <div className='text-left'>
                                    <Form.Group controlId="formLoanPurpose">
                                        <Form.Label>Loan Purpose</Form.Label>
                                        <Form.Select
                                            name="loan_purpose"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.loan_purpose}
                                            isInvalid={formik.touched.loan_purpose && formik.errors.loan_purpose}
                                            style={{ width: '100%', textAlign: 'left' }}
                                        >
                                            <option value="">Select Loan Purpose</option>
                                            <option value="Personal Loan">Personal Loan</option>
                                            <option value="Education Loan">Education Loan</option>
                                            <option value="Home Improvement">Home Improvement</option>
                                            <option value="Business Loan">Business Loan</option>
                                            <option value="Auto Loan">Auto Loan</option>
                                            <option value="Medical Loan">Medical Expenses</option>
                                            <option value="Vacation Loan">Vacation Expenses</option>
                                            <option value="Debt Consolidation">Debt Consolidation</option>
                                            <option value="Wedding Loan">Wedding Expenses</option>
                                            <option value="Travel Loan">Travel Expenses</option>
                                            <option value="Equipment Financing">Equipment Financing</option>
                                            <option value="Home Purchase">Home Purchase</option>
                                            <option value="Rent Payment">Rent Payment</option>
                                            <option value="Emergency Fund">Emergency Fund</option>
                                            <option value="Refinancing">Refinancing Existing Loans</option>
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.loan_purpose}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </div>

                                <Row className='mt-3 mb-3'>
                                    <Col>
                                        <Button variant="success" type="submit" className="w-100 mt-3" disabled={loading}>
                                            {loading ? (
                                                <>
                                                    <Spinner animation="border" size="sm" />
                                                    <span className="ms-2">Loading...</span>
                                                </>
                                            ) : (
                                                'Apply'
                                            )}
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Button variant="secondary" className="w-100 mt-3" onClick={() => navigate('/')}>
                                            Cancel
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default LoanApplicationForm;
