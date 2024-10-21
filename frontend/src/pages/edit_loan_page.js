import React from 'react';
import EditLoanApplicationForm from '../components/edit_loan_application_form';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { userToken } from '../constants/constants';

function EditLoanApplicationPage(props) {
    return (
        <Container className='mt-14 mb-10'>
            <Card>
                <Card.Header>
                    <h4>Edit Loan Application Form</h4>
                </Card.Header>
            </Card>

            <Row>
                <Col className='mt-5'>
                    <img
                        alt="Loan Application"
                        width="500"
                        height="600"
                        src='https://img.freepik.com/free-photo/money-saving-house-glass-bottle_1150-12782.jpg?ga=GA1.1.858364278.1724432012&semt=ais_hybrid-rr-similar'
                    />
                </Col>
                <Col>
                    <EditLoanApplicationForm userToken={userToken} />
                </Col>
            </Row>




        </Container>
    );
}

export default EditLoanApplicationPage;