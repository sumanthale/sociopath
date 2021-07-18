import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form } from 'reactstrap';
import styled from 'styled-components';
import ASInput from '../common/ASInput';
import { signIn } from '../../redux/user/user.actions.js';

class Login extends Component {
  state = {
    email: '',
    password: '',
  };
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handelSubmit = (e) => {
    const { signIn } = this.props;
    e.preventDefault();
    signIn(this.state);
  };

  render() {
    const { error, history } = this.props;
    return (
      <div className="container">
        <h2 className="text-danger font-weight-bolder display-4">
          Ask Osmanian.
        </h2>
        <h2 className="font-weight-bold">Welcome Back :)</h2>
        <p className="text-muted ">
          To Keep connected with us pleaase login with your personal information
          by email address and password
        </p>
        <Form
          className="w-100 d-flex flex-column align-items-center mt-4"
          onSubmit={this.handelSubmit}
        >
          {error && <div className="alert alert-danger">{error}</div>}
          <DIV>
            <ASInput
              icon="fa-envelope"
              label="Email Address"
              type="email"
              name="email"
              onChange={this.handleChange}
            />
            <ASInput
              icon="fa-unlock-alt"
              label="Password"
              onChange={this.handleChange}
              type="password"
              name="password"
            />
          </DIV>

          <ButtonGroup>
            <StyledButton color="#007bff" className="shadow" type="submit">
              Login Now
            </StyledButton>
            <StyledButton
              className="shadow"
              onClick={() => {
                history.push('/register');
              }}
            >
              Create Account
            </StyledButton>
          </ButtonGroup>
        </Form>
        <div className="text-center">
          <Link className="mt-3" to="/forgot-password">
            Forgotten password?
          </Link>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ user }) => ({
  error: user.error,
  user: user.currentUser,
});
export default connect(mapStateToProps, { signIn })(Login);
const DIV = styled.div`
  min-width: 350px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;
const ButtonGroup = styled.div`
  margin-top: 5px;
  display: flex;
  justify-content: space-between;
  @media only screen and (max-width: 440px) {
    flex-direction: column;
  }
`;
const StyledButton = styled.button`
  background-color: ${(props) => (props.color ? props.color : 'white')};
  color: ${(props) => (props.color ? 'white' : 'black')};
  border: none;
  border-radius: 30px;
  padding: 0.8rem 1.8rem;
  font-weight: bold;
  margin: 10px;
  @media only screen and (max-width: 440px) {
    width: 200px;
  }
`;
