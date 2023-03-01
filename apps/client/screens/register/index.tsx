import Link from 'next/link';
import { useRegister } from './actions';
import {
  Wrapper,
  Title,
  Input,
  InputGroup,
  InputLabel,
  Center,
  Button,
  ErrorAlert,
  SuccessAlert
} from './styled'

const Component = () => {
  const {
    onChange,
    onSubmit,
    values,
    types,
    isLoading,
    errors,
    isSuccess
  } = useRegister();

  return (
    <Wrapper>
      <div>
        <Title>Register</Title>
        {!!errors && <ErrorAlert>{errors}</ErrorAlert>}
        {isSuccess && <SuccessAlert>Success</SuccessAlert>}
        <InputGroup>
          <InputLabel>Email</InputLabel>
          <Input name={types?.EMAIL} type="email" onChange={onChange} value={values.EMAIL} />
        </InputGroup>

        <InputGroup>
          <InputLabel>Password</InputLabel>
          <Input name={types?.PASSWORD} type="password" onChange={onChange} value={values.PASSWORD} />
        </InputGroup>

        <Center>
          <Button disabled={isLoading} onClick={onSubmit}>Register</Button>
        </Center>

        <Center>
          <Link href={"/sign-in"}>
            Login?
          </Link>
        </Center>
      </div>
    </Wrapper>
  )
}

export default Component;
