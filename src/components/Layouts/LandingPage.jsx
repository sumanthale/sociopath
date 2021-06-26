import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import './Home.css';
import HomeBg from '../../assets/3081629.jpg';
import Registration from '../Registration/Registration';
import Login from '../Login/Login';
import { useHistory, useLocation } from 'react-router';

const LandingPage = () => {
  const location = useLocation();
  const history = useHistory();

  return (
    <div className="Home">
      <Container fluid className="Home__container">
        <Row>
          <Col lg="7" className="d-none d-lg-block Home__col-1">
            <img src={HomeBg} alt="" className="img-fluid " />
          </Col>
          <Col lg="5" className="Home__col-2">
            {location.pathname === '/login' ? (
              <Login history={history} />
            ) : (
              <Registration history={history} />
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;
