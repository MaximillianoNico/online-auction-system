import { Children } from "react";
import styled from "styled-components";

export const Category = styled.div`
  display: flex;
  column-gap: 25px;

  h4 {
    margin: 6px 0px;
  }
`

const Component = ({ children }) => {
  return (
    <Category>
      {Children.map(children, child => child)}
    </Category>
  )
}

export default Component;
