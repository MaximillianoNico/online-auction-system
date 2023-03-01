import styled from "styled-components";

const Container = styled.div`
  padding: 1rem 3rem;
`;

const FlexSpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Avatar = styled.div`
  width: 30px;
  height: 30px;
  border: 1px solid black;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
`

const Logo = styled.div`
  width: 100px;
  height: 30px;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Component = ({ children }) => {
  return (
    <div>
      <div className="wrapper">
        <Container className="container">
          <FlexSpaceBetween>
            <Logo>Logo</Logo>
            <FlexSpaceBetween style={{ columnGap: 20 }}>
              <div>Balance: $ 100</div>
              <Avatar>A</Avatar>
            </FlexSpaceBetween>
          </FlexSpaceBetween>
        </Container>
      </div>
      {children}
    </div>
  )
}

export default Component;
