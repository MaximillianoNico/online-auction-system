import moment from 'moment'
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
  const { activeTab, onChangeTab, TABS, data } = useProducts();

  console.log('data: ', data);

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
      <div style={{ marginTop: 20 }}>
        <Table>
          <thead>
            <TableRow>
              <th>Name</th>
              <th>Current Price</th>
              <th>Duration</th>
              <th>Bid</th>
            </TableRow>
          </thead>
          <tbody>
            {!!data?.length && data.map(({ name, price, lastTimeAuction }, key) => {
              const lastBidTime = moment(lastTimeAuction).diff(
                moment(),
                'hours'
              )

              console.log(+lastBidTime)

              return (
                <TableRow key={key} border>
                  <Cell center>{name}</Cell>
                  <Cell center>$ {price}</Cell>
                  <Cell center>
                    {lastBidTime > 0 ? `${lastBidTime} h` : `${lastBidTime} h ago`}
                  </Cell>
                  <Cell center>
                    <Button disabled={activeTab === TABS.COMPLETED}>Bid</Button>
                  </Cell>
                </TableRow>
              )
            })}
          </tbody>
          </Table>
      </div>
    </Wrapper>
  )
}

export default Component;
