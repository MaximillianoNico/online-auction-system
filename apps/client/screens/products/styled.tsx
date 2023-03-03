import styled from 'styled-components';

interface ICell {
  center?: boolean
}

interface ITableRow {
  border?: boolean
}

export const Wrapper = styled.div`
  padding: 20px 40px;
`

export const Category = styled.div`
  display: flex;
  column-gap: 25px;

  h4 {
    margin: 6px 0px;
  }
`
export const Underline = styled.div`
  height: 3px;
  width: 100%;
  background-color: black;
`

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-spacing: 1em;
`

export const TableRow = styled.tr`
  height: 100px;
  border: ${(props: ITableRow) => props?.border ? '1px solid black' : 'unset'};
  border: 1px solid black;
  margin-top: 10px;
`

export const Button = styled.button`
  padding: 10px 20px;
  border: 1px solid black;
  cursor: pointer;
`

export const Cell = styled.td`
  text-align: ${(props: ICell) => props?.center ? "center" : "left" };
`;
