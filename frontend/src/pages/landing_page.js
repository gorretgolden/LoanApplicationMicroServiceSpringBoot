import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('userToken'); 
    setIsLoggedIn(!!token); // Checking if token exists
  }, []);

  const handleApplyClick = () => {
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      navigate('loans/new-loan-application');
    }
  };

  return (
    <Container fluid className="text-center" style={{ height: '100vh' }}>
      <Row className="h-100 ">
        <Col
          style={{
            backgroundImage: `url('https://img.freepik.com/free-photo/two-confident-serious-african-american-businessmen-focused-paperwork_273609-9317.jpg?uid=R166256386&ga=GA1.2.1084094240.1727827442&semt=ais_hybrid-rr-similar')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
            color: '#fff',
            padding: '50px',
          }}
        >
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1,
          }}></div>
          <br />
          <br />
          <div style={{ position: 'relative', zIndex: 2, paddingTop: '20px' }}>
            <h2>In Need of a Quick Loan</h2>
            <br />
            <h5>At LoansPlus we give out all types of loans. Apply today!</h5>
            <br />
            <Button variant="success" size="lg" onClick={handleApplyClick}>
              Apply for a loan
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LandingPage;
