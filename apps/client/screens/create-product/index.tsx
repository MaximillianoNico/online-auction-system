import {
  Wrapper,
  Title,
  Input,
  InputGroup,
  InputLabel,
  Center,
  Button
} from "../signin/styled";
import useCreateProduct from "./actions";

const Component = () => {
  const {
    product,
    onChange,
    onSubmit,
    TYPES: types
  } = useCreateProduct();

  return (
    <Wrapper>
      <div>
        <Title>Create new product</Title>
        <InputGroup>
          <InputLabel>Name</InputLabel>
          <Input
            name={types?.NAME}
            type="name"
            onChange={onChange}
            value={product[types?.NAME]}
          />
        </InputGroup>

        <InputGroup>
          <InputLabel>Start Price</InputLabel>
          <Input
            type="number"
            name={types?.START_PRICE}
            onChange={onChange}
            value={product[types?.START_PRICE]}
          />
        </InputGroup>

        <InputGroup>
          <InputLabel>Time window</InputLabel>
          <Input
            type="date"
            name={types?.TIME_WINDOW}
            onChange={onChange}
            value={product[types?.TIME_WINDOW]}
          />
        </InputGroup>

        <Center>
          <Button onClick={onSubmit}>Bid</Button>
        </Center>
      </div>
    </Wrapper>
  )
}

export default Component;
