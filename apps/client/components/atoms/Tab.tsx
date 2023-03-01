import styled from "styled-components"

export const Underline = styled.div`
  height: 3px;
  width: 100%;
  background-color: black;
`

export const Heading = styled.h4`
  cursor: pointer;
`

interface ITab {
  isActive?: boolean;
  name: string;
  onClick?: (name: string) => void
}

const Component = ({ isActive, name = "", onClick }: ITab) => {
  const handleClick = () => {
    if (typeof onClick === 'function' && name) {
      onClick(name)
    }
  }
  return (
    <div>
      <Heading onClick={handleClick}>{name}</Heading>
      {isActive && <Underline />}
    </div>
  )
}

export default Component;
