import { useRouter } from "next/router";
import { useState } from "react";
import Transaction from '../../utils/apis/transactions'

const useDeposit = () => {
  const router = useRouter();
  const [errors, setErrors] = useState("");
  const [deposit, setDeposit] = useState(0);

  const handleOnChange = (event: { target: HTMLInputElement; }) => setDeposit(+event?.target?.value);
  const handleSubmit = async() => {
    if (deposit <= 0) {
      setErrors("Deposit should be more than 0")

      return;
    }

    const { errors } = await Transaction.Deposit({ deposit: +deposit });

    if (errors) {
      setErrors(errors?.response?.data?.message);

      return;
    }

    alert(`Success deposit: ${deposit}`);

    setTimeout(() => {
      router.push({
        pathname: '/products',
        query: router.query
      });
    }, 1000)
  }

  return [
    handleSubmit,
    { deposit, onChange: handleOnChange, onSubmit: handleSubmit, errors }
  ] as const
}

export default useDeposit;
