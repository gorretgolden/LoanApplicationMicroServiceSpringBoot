import React, {useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import customerAvatar from '../assets/images/customer-avatar.png'


function LoanApplicationDetailsCard({ loan }) {
   
    const [userDetails, setUserDetails] = useState({
        name: localStorage.getItem('userName'),
        email: localStorage.getItem('userEmail'),
        contact: localStorage.getItem('userContact')
    });

    return (
        <Card className="mb-3 shadow px-4">
            <Card.Header className="last-loan-card-header">
                <h5>Loan Application Details</h5>
            </Card.Header>
            <Card.Body>
                <Row>
                    <Col ms={12}>
                        <div className="mb-3 d-flex justify-content-center">
                            <img
                                src={customerAvatar}
                                alt="User Avatar"
                                className="rounded-circle"
                                style={{ width: '70px', height: '70px' }}
                            />
                        </div>
                    </Col>
                </Row>
                <div className="mb-2 py-2 text-left">
                    <h6 className='text-success'>Applicant Details</h6>
                    <strong>Name:</strong> {userDetails.name}<br />
                    <strong>Email:</strong> {userDetails.email}<br />
                    <strong>Contact:</strong> {userDetails.contact}<br />
                </div>
                <hr />
                <div className="text-left">
                    <h6  className='text-success'>Loan Application Details</h6>
                    <p><strong>Loan Application Number:</strong> LN.{loan.loanId}</p>
                    <p><strong>Loan Amount:</strong> UGX {loan.loanAmount.toLocaleString()}</p>
                    <p><strong>Repayment Period:</strong> {loan.repaymentPeriod} months</p>
                    <p><strong>Loan Purpose:</strong> {loan.loanPurpose}</p>
                    <p><strong>Status:</strong> {loan.status}</p>
                    <p><strong>Applied Date:</strong> {loan.createdAt}</p>
                    <p><strong>Updated Date:</strong> {loan.updatedAt}</p>
                </div>
            </Card.Body>
        </Card>
    );
}

export default LoanApplicationDetailsCard;


