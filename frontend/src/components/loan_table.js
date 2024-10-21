import React, { useEffect, useState } from 'react';
import { Table, Card, Button, Badge, Spinner } from 'react-bootstrap'; 
import axios from 'axios';
import { FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { baseUri } from '../constants/constants';
import noLoanApplicationImage from '../assets/images/no-loan-applications.png'

const LoanTable = ({ customerId, userToken }) => {
    const [loans, setLoans] = useState([]);
    const [loading, setLoading] = useState(true); 
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLoans = async () => {
            setLoading(true); // Set loading to true before fetching
            try {
                const response = await axios.get(`${baseUri}/loans/customer/${customerId}`, {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    },
                });

                const loanData = response.data;
                setLoans(loanData['all-loan-applications'] || []); 
            } catch (error) {
                console.error('Error fetching loans:', error);
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        fetchLoans();
    }, [customerId, userToken]); 

    return (
        <div className="d-flex justify-content-center mt-8">
            <Table striped bordered hover className="w-76 text-center">
                {loans.length > 0 && !loading && ( 
                    // Only rendering the table header if there are loan applications and 
                    //not loading state
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Loan Amount</th>
                            <th>Repayment Period</th>
                            <th>Loan Purpose</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                )}
                <tbody>
                    {loading ? (
                        <>
                            <tr>
                                <td colSpan="6" className="text-center">
                                    <Spinner animation="border" role="status" className="me-2">
                                        <span className="visually-hidden">Loading...</span>
                                    </Spinner>
                                    <p>Loading loan applications...</p>
                                </td>
                            </tr>
                            {/* Default table structure */}
                            {Array.from({ length: 5 }).map((_, index) => (
                                <tr key={index}>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            ))}
                        </>
                    ) : loans.length > 0 ? (
                        loans.map((loan) => (
                            <tr key={loan.id}>
                                <td>LN.{loan.id}</td>
                                <td>UGX {loan.loan_amount.toLocaleString()}</td>
                                <td>{loan.repayment_period} months</td>
                                <td>{loan.loan_purpose}</td>
                                <td>
                                    <Badge pill bg={
                                        loan.status === 'APPROVED' ? 'success' :
                                        loan.status === 'REJECTED' ? 'danger' :
                                        loan.status === 'PENDING' ? 'primary' : ''
                                    }>
                                        {loan.status}
                                    </Badge>
                                </td>
                                <td>
                                    <Button variant="link" className='text-decoration-none' onClick={() => editLoan(loan.id)}>
                                        <FaEdit className='text-warning' /> Edit
                                    </Button>
                                    <Button variant="link" className='text-decoration-none text-success' onClick={() => viewLoanStatus(loan.id)}>
                                        View Loan
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <Card className="text-center w-80 mt-5 mx-auto text-success">
                            <Card.Body>
                            <img src={noLoanApplicationImage} alt="No data" width="300" height="300" className="d-inline-block align-top" />
                                <h6>You haven't made any Loan Applications</h6>
                      
                               
                            </Card.Body>
                        </Card>
                    )}
                </tbody>
            </Table>
        </div>
    );

    function editLoan(loanId) {
        navigate(`/edit-loan-application/${loanId}`);

    }

    function viewLoanStatus(loanId) {
        navigate(`/loan-application/${loanId}/details`);
      
    }
};

export default LoanTable;
