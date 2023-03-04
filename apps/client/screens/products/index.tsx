import moment from 'moment'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'

import {
  Input,
  InputGroup,
  InputLabel,
} from "../signin/styled";

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
import Transactions from '../../utils/apis/transactions'
import { useState } from 'react'

const Component = () => {
  const [isOpen, setOpenModal] = useState(false);
  const [currentItem, setCurrent] = useState({ name: '', id: '' })
  const { activeTab, onChangeTab, TABS, data } = useProducts();

  const onBidItem = async ({ bid = 0, itemId }) => {
    const { data, errors } = await Transactions.Bid({ bid })

    if (data) {
      alert('Success Bid item ' + itemId)

      return;
    }

    alert('Failed bid item: ' + errors)
  }

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
            {!!data?.length && data.map(({ name, price, lastTimeAuction, _id }, key) => {
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
                    <Button disabled={activeTab === TABS.COMPLETED} onClick={() => toggleOpenModal(name, _id)}>Bid</Button>
                  </Cell>
                </TableRow>
              )
            })}
          </tbody>
          </Table>
      </div>
      <Modal isOpen={isOpen} onClose={toggleOpenModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Item {currentItem.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <InputGroup>
              <InputLabel>Bid price</InputLabel>
              <Input
                name={"bid"}
                type="number"
                value={""}
              />
            </InputGroup>
          </ModalBody>

          <ModalFooter>
            <Button onClick={toggleOpenModal}>
              Cancel
            </Button>
            <Button>Submit</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Wrapper>
  )
}

export default Component;
