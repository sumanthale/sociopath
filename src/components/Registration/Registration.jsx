import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form } from 'reactstrap';
import styled from 'styled-components';
import ASInput from '../common/ASInput';
import { signUp } from '../../redux/user/user.actions.js';

class Registration extends Component {
  state = {
    email: '',
    password: '',
    repassword: '',
  };
  handelChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handelSubmit = (e) => {
    const { signUp } = this.props;
    e.preventDefault();
    signUp(this.state);
  };
  render() {
    const { error, history } = this.props;
    return (
      <div className="container ">
        <h1 className="text-danger font-weight-bolder display-4">
          Ask Osmanian.
        </h1>
        <h2 className="font-weight-bold">Welcome to Family</h2>
        <p className="text-muted ">
          Ask Osmanian platform to ask questions and connect with people who
          contribute unique insights and quality answers.
        </p>
        {error && <div className="alert alert-danger">{error}</div>}
        <Form
          className="w-100 d-flex flex-column align-items-center mt-5"
          onSubmit={this.handelSubmit}
        >
          <DIV>
            <ASInput
              icon="fa-envelope"
              label="Email Address"
              type="email"
              name="email"
              onChange={this.handelChange}
              value={this.state.email}
            />
            <ASInput
              icon="fa-unlock-alt"
              label="Password"
              type="password"
              onChange={this.handelChange}
              name="password"
              value={this.state.password}
            />
            <ASInput
              icon="fa-unlock-alt"
              label="Repeat Password"
              type="password"
              onChange={this.handelChange}
              name="repassword"
              value={this.state.repassword}
            />
          </DIV>
          <ButtonGroup>
            <StyledButton color="#007bff" className="shadow">
              Sign Up Now
            </StyledButton>

            <StyledButton
              className="shadow"
              onClick={() => {
                history.push('/login');
              }}
            >
              Get Login
            </StyledButton>
          </ButtonGroup>
        </Form>
      </div>
    );
  }
}
const mapStateToProps = ({ user }) => ({
  error: user.error,
});

export default connect(mapStateToProps, { signUp })(Registration);

const DIV = styled.div`
  min-width: 350px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 20px 20px 0 0;
`;
const ButtonGroup = styled.div`
  margin-top: 5px;
  display: flex;
  justify-content: space-between;
  @media only screen and (max-width: 440px) {
    flex-direction: column;
    width: fit-content;
  }
`;
const StyledButton = styled.button`
  background-color: ${(props) => (props.color ? props.color : 'white')};
  color: ${(props) => (props.color ? 'white' : 'black')};
  border: none;
  border-radius: 5px;
  padding: 0.8rem 1.8rem;
  font-weight: bold;
  margin: 10px;
  @media only screen and (max-width: 440px) {
    width: 200px;
  }
`;
