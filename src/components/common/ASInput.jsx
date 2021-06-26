import React from 'react';
import styled from 'styled-components';

const ASInput = ({ icon, label, type, onChange, value, name }) => {
  return (
    <DIV>
      <Icon>
        <i className={`fas ${icon} fa-2x `}></i>
      </Icon>
      <SInput
        type={type}
        onChange={onChange}
        name={name}
        value={value}
        required
        placeholder={label}
      />
    </DIV>
  );
};

export default ASInput;
const DIV = styled.div`
  min-width: 350px;
  height: 75px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;
  border-bottom: 2px solid rgba(78, 78, 78, 0.219);
  margin-bottom: 10px;
  background-color: white;

  :hover {
    border-bottom: 2px solid #007bff;
  }
`;
const Icon = styled.div`
  width: 50px;
  height: 50px;
  padding-left: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SInput = styled.input`
  min-width: 250px;
  height: 50px;
  border: none;
  padding: 10px 0;
  font-size: 16px;
  outline: none;
  caret-color: #007bff;
`;
