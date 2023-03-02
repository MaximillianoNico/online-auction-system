import Link from 'next/link';
import { ErrorAlert, SuccessAlert } from '../register/styled';
import { useSignIn } from './actions';
import {
  Wrapper,
  Title,
  Input,
  InputGroup,
  InputLabel,
  Center,
  Button
} from './styled'

const Component = () => {
  const {
    onChange,
    onSubmit,
    values,
    types,
    errors,
    isSuccess,
    isLoading
  } = useSignIn();

  return (
    <Wrapper>
      <div>
        <Title>Login</Title>
        {!!errors && <ErrorAlert>{errors}</ErrorAlert>}
        {isSuccess && <SuccessAlert>Success</SuccessAlert>}
        <InputGroup>
          <InputLabel>Email</InputLabel>
          <Input
            name={types?.EMAIL}
            type="email"
            onChange={onChange}
            value={values[types?.EMAIL]}
          />
        </InputGroup>

        <InputGroup>
          <InputLabel>Password</InputLabel>
          <Input
            name={types?.PASSWORD}
            type="password"
            onChange={onChange}
            value={values[types?.PASSWORD]}
          />
        </InputGroup>

        <Center>
          <Button disabled={isLoading} onClick={onSubmit}>Login</Button>
        </Center>

        <Center>
          <Link href={"/register"}>
            Register?
          </Link>
        </Center>
      </div>
    </Wrapper>
  )
}

export default Component;
