import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Form, Row, Col, Spinner } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import * as Yup from 'yup';
import { Formik } from 'formik';
import 'react-toastify/dist/ReactToastify.css';
import { baseUri } from '../constants/constants';

const EditLoanApplicationForm = ({ userToken }) => {
    const { loanId } = useParams();
    const navigate = useNavigate();
    const [initialValues, setInitialValues] = useState({
        loan_amount: '',
        repayment_period: '',
        loan_purpose: ''
    });
    const [loading, setLoading] = useState(false); // New loading state

    // Fetch loan details when the component mounts
    useEffect(() => {
        const fetchLoanDetails = async () => {
            try {
                const response = await axios.get(`${baseUri}/loans/${loanId}`, {
                    headers: { Authorization: `Bearer ${userToken}` }
                });
                const loanData = response.data;
                setInitialValues({
                    loan_amount: loanData.loanAmount,
                    repayment_period: loanData.repaymentPeriod,
                    loan_purpose: loanData.loanPurpose
                });
                console.log('Loan data fetched successfully:', loanData);
            } catch (error) {
                console.error('Error fetching loan details:', error);
                toast.error('Failed to fetch loan details.');
            }
        };

        fetchLoanDetails();
    }, [loanId, userToken]);

    // Validation schema
    const validationSchema = Yup.object({
        loan_amount: Yup.number().required('Loan amount is required').positive('Loan amount must be a positive number'),
        repayment_period: Yup.number().required('Repayment period is required').positive('Repayment period must be a positive number').integer('Repayment period must be an integer'),
        loan_purpose: Yup.string().required('Loan purpose is required'),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        setLoading(true); // Set loading to true on form submission
        try {
            const response = await axios.put(`${baseUri}/loans/${loanId}`, values, {
                headers: { Authorization: `Bearer ${userToken}` }
            });
            
            // Displaying success message and delay navigation
            toast.success(response.data.message || 'Loan updated successfully');
            setTimeout(() => {
                navigate('/customer/all-loan-applications');
            }, 5000); 
            
        } catch (error) {
            console.error('Error updating loan:', error);
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Failed to update loan application.');
            }
        } finally {
            setLoading(false); // Set loading to false after submitting
            setSubmitting(false);
        }
    };
    
    return (
        <div className="d-flex justify-content-center mt-5">
            <Card style={{ width: '600px' }}>
                <Card.Header className="text-success text-left">
                    <h5>Loan Application No (LN.{loanId})</h5>
                </Card.Header>
                <Card.Body>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                        enableReinitialize
                    >
                        {({ handleSubmit, handleChange, handleBlur, values, errors, touched }) => (
                            <Form onSubmit={handleSubmit}>
                                <div className='py-3 text-left'>
                                    <Form.Group controlId="formLoanAmount">
                                        <Form.Label className='text-left'>Loan Amount</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="loan_amount"
                                            value={values.loan_amount}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isInvalid={touched.loan_amount && !!errors.loan_amount}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.loan_amount}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </div>

                                <div className='py-3 text-left'>
                                    <Form.Group controlId="formRepaymentPeriod">
                                        <Form.Label>Repayment Period (months)</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="repayment_period"
                                            value={values.repayment_period}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isInvalid={touched.repayment_period && !!errors.repayment_period}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.repayment_period}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </div>

                                <div className='py-3 text-left'>
                                    <Form.Group controlId="formLoanPurpose">
                                        <Form.Label>Loan Purpose</Form.Label>
                                        <Form.Select
                                            name="loan_purpose"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.loan_purpose}
                                            isInvalid={touched.loan_purpose && !!errors.loan_purpose}
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
                                            {errors.loan_purpose}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </div>

                                <Row>
                                    <Col>
                                        <Button variant="success" type="submit" className="w-100 mt-3" disabled={loading}>
                                            {loading ? <Spinner animation="border" size="sm" /> : 'Update Loan'}
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Button variant="secondary" className="w-100 mt-3" onClick={() => navigate('/customer/all-loan-applications')}>
                                            Cancel
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        )}
                    </Formik>
                </Card.Body>
            </Card>
            <ToastContainer />
        </div>
    );
};

export default EditLoanApplicationForm;
