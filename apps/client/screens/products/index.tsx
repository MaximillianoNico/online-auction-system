import moment from 'moment'
import ModalBid from '../../components/molecules/Modal'
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
import { useState } from 'react'

const Component = () => {
  const [isOpen, setOpenModal] = useState(false);
  const [currentItem, setCurrent] = useState({ name: '', id: '' })
  const { activeTab, onChangeTab, TABS, data } = useProducts();

  console.log('activeTab: ', activeTab);
  const toggleOpenModal = (name?: any, id?: any) => {
    setCurrent({ name: name ?? "", id: id ?? "" })
    setOpenModal(prev => !prev)
  }

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
            {!!data?.length && data.map(({ name, latestBid, price, lastTimeAuction, _id }, key) => {
              const lastBidTime = moment(lastTimeAuction).diff(
                moment(),
                'hours'
              )

              return (
                <TableRow key={key} border>
                  <Cell center>{name}</Cell>
                  <Cell center>$ {latestBid?.bidPrice || price}</Cell>
                  <Cell center>
                    {lastBidTime > 0 ? `${lastBidTime} h` : `${lastBidTime} h ago`}
                  </Cell>
                  <Cell center>
                    <Button disabled={activeTab === TABS.COMPLETED} onClick={() => toggleOpenModal(name, _id)}>Bid</Button>
                  </Cell>
                </TableRow>
              )
            })}
          </tbody>
          </Table>
      </div>
      <ModalBid
        isOpen={isOpen}
        onToggle={toggleOpenModal}
        title={`Item ${currentItem?.name}`}
        id={currentItem?.id}
      />
    </Wrapper>
  )
}

export default Component;
