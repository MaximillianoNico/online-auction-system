import Tabs from '../../components/atoms/Tabs'
import Tab from '../../components/atoms/Tab'
import {
  Wrapper,
  Cell,
  TableRow,
  Table,
  Button
} from '../products/styled'
import useProducts from './actions'

const Component = () => {
  const { activeTab, onChangeTab, TABS } = useProducts();

  return (
    <Wrapper>
      <Tabs>
        <Tab
          name='Ongoing'
          onClick={onChangeTab}
          isActive={activeTab === TABS.ONGOING}
        />
        <Tab
          name='Completed'
          onClick={onChangeTab}
          isActive={activeTab === TABS.COMPLETED}
        />
      </Tabs>
      <div>
        <Table>
          <TableRow>
            <th>Name</th>
            <th>Current Price</th>
            <th>Duration</th>
            <th>Bid</th>
          </TableRow>
          <TableRow border>
            <Cell center>Shopee 1</Cell>
            <Cell center>$ 100</Cell>
            <Cell center>1h 3s</Cell>
            <Cell center>
              <Button>Bid</Button>
            </Cell>
          </TableRow>
          <TableRow border>
            <Cell center>Shopee 1</Cell>
            <Cell center>$ 100</Cell>
            <Cell center>1h 3s</Cell>
            <Cell center>
              <Button>Bid</Button>
            </Cell>
          </TableRow>
          <TableRow border>
            <Cell center>Shopee 1</Cell>
            <Cell center>$ 100</Cell>
            <Cell center>1h 3s</Cell>
            <Cell center>
              <Button>Bid</Button>
            </Cell>
          </TableRow>
        </Table>
      </div>
    </Wrapper>
  )
}

export default Component;
