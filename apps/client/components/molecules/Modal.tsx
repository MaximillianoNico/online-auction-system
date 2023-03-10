import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { useState } from 'react';

import {
  Input,
  InputGroup,
  InputLabel,
} from "../../screens/signin/styled";
import Transactions from '../../utils/apis/transactions'
import { Button } from '../../screens/signin/styled'

interface IModal {
  isOpen: boolean;
  onToggle: () => void;
  title: string;
  id: string
}

const Component = (props: IModal) => {
  const {
  id = "",
  isOpen = false,
  title = "",
  onToggle,
  } = props;

  const [bid, setBid] = useState(0);

  const handleOnBid = e => setBid(+e?.target?.value)
  const handleSubmit = async () => {
    // TODO: submit
    const payload = { bid, productId: id }
    const { errors } = await Transactions.Bid(payload)
    const errorMessage = errors?.response?.data?.errors || ""

    if (!errorMessage) {
      alert('Success Bid item ' + id)

      onToggle();

      return;
    }

    alert('Failed bid item: ' + errorMessage)
  }

  return (
    <Modal isOpen={isOpen} onClose={onToggle}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Item {title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <InputGroup>
            <InputLabel>Bid price</InputLabel>
            <Input
              name="bid"
              type="number"
              value={bid}
              onChange={handleOnBid}
            />
          </InputGroup>
        </ModalBody>

        <ModalFooter style={{ columnGap: 10 }}>
          <Button onClick={onToggle}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default Component;
