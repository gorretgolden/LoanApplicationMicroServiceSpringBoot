import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Spinner, Container, Row, Col } from 'react-bootstrap';
import { baseUri } from '../constants/constants';
import LoanApplicationDetailsCard from '../components/view_loan_application_details';
import loanDetailsImage from '../assets/images/loan-details.png'

function LoanApplicationDetails() {
    const { loanId } = useParams();
    const [loan, setLoan] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLoanDetails = async () => {
            try {
                const token = localStorage.getItem('userToken');
                const response = await axios.get(`${baseUri}/loans/${loanId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                // Setting the loan details after the response
                setLoan(response.data);
                console.log('check data',response.data)
                setLoading(false);
            } catch (error) {
                console.error("Error fetching loan details", error);
                setLoading(false);
            }
        };

        fetchLoanDetails();
    }, [loanId]);

    return (
        <Container>


            {loading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                    <Spinner animation="border" role="status" className='text-success'>
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : (
                loan ? (
                   <Container className='mt-10'>
                     <Row>
                        <Col lg={6}>
                        <img src={loanDetailsImage} alt="LoanImage"  className="d-inline-block" />
                        </Col>
                        <Col lg={5}>
                            <LoanApplicationDetailsCard loan={loan} /></Col>
                        <Col>
                        </Col>
                    </Row>
                   </Container>
                ) : (
                    <p>Loan not found.</p>
                )
            )}
        </Container>
    );
}

export default LoanApplicationDetails;
