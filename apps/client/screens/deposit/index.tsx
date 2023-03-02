import { Button, Center, Input, InputGroup, InputLabel } from '../signin/styled';
import useDeposit from './actions';
import {
  Wrapper,
  Title
} from './styled'

const Component = () => {
  const [onSubmit, { onChange, deposit }] = useDeposit();
  return (
    <Wrapper>
      <div style={{ minWidth: '480px'}}>
        <Title>Deposit</Title>
        <InputGroup>
          <InputLabel>Amont</InputLabel>
          <Input
            name={"deposit"}
            type="number"
            onChange={onChange}
            value={deposit}
          />
        </InputGroup>
        <Center>
          <Button onClick={onSubmit}>Submit</Button>
        </Center>
      </div>
    </Wrapper>
  )
}

export default Component;
