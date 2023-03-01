import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`
export const Title = styled.h1`
  font-weight: 400;
  font-size: 32px;
`

export const InputGroup = styled.div`
  display: inline-block;
  width: 100%;
  margin-top: 20px;

  span {
    margin: 10px 0px;
  }
`

export const InputLabel = styled.span`
  font-weight: 500;
`

export const Input = styled.input`
  border-radius: 5px;
  height: 40px;
  width: 100%;
  border: 1px solid black;
`
export const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`
export const Button = styled.button`
  padding: 5px 25px;
  border: 1px solid black;
  border-radius: 5px;
`

export const ErrorAlert = styled.div`
  border: 1px solid red;
  padding: 5px;
  font-size: 13px;
  border-radius: 5px;
  width: auto;
  background-color: #f8d7da;
  color: #721c24;
`

export const SuccessAlert = styled.div`
  border: 1px solid #c3e6cb;
  padding: 5px;
  font-size: 13px;
  border-radius: 5px;
  width: auto;
  background-color: #d4edda;
  color: #155724;
`
