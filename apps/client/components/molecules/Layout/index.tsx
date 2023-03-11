import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";
import { destroyCookie } from 'nookies'
import useUserInfo from "../../../utils/hooks/useUserInfo";
import { Dropdown, DropdownItem } from './styled'
import useOutsideClick from "../../../utils/hooks/useOutsideAlert";
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
  text-decoration: none;
  cursor: pointer;
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
  const { user } = useUserInfo();
  const router = useRouter();
  const [isOpenDropdown, setOpenDropdown] = useState(false);
  const { ref } = useOutsideClick({
    onClickOutside: () => setOpenDropdown(false)
  })

  const deposit = user?.deposit || 0;

  const firstChar = (user?.email || "")?.split('')?.[0]

  const handleToggleDropdown = () => setOpenDropdown(prev => !prev)

  const handleLogOut = () => {
    destroyCookie(null, 'tkn');

    setTimeout(() => {
      router.push({
        pathname: '/sign-in',
        query: router.query
      })
    }, 1500)
  }
  const handleGoToPage = (page = '/') => {
    router.push({
      pathname: page,
      query: router.query
    })
  }

  return (
    <div>
      <div className="wrapper">
        <Container className="container">
          <FlexSpaceBetween>
            <Logo>Logo</Logo>
            <FlexSpaceBetween style={{ columnGap: 20, position: 'relative' }}>
              <div>Balance: $ {deposit}</div>
              <Avatar onClick={handleToggleDropdown}>{firstChar?.toUpperCase()}</Avatar>
              {isOpenDropdown && (
                <Dropdown ref={ref}>
                  <DropdownItem onClick={() => handleGoToPage('/product/create')}>Create New Item</DropdownItem>
                  <DropdownItem onClick={() => handleGoToPage('/user/deposit')}>Deposit</DropdownItem>
                  <DropdownItem onClick={handleLogOut}>Logout</DropdownItem>
                </Dropdown>
              )}
            </FlexSpaceBetween>
          </FlexSpaceBetween>
        </Container>
      </div>
      {children}
    </div>
  )
}

export default Component;
