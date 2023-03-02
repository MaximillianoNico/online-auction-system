import { useState } from "react";

const useDeposit = () => {
  const [errors, setErrors] = useState("");
  const [deposit, setDeposit] = useState(0);

  const handleOnChange = (event: { target: HTMLInputElement; }) => setDeposit(+event?.target?.value);
  const handleSubmit = () => {
    if (deposit <= 0) {
      setErrors("Deposit should be more than 0")

      return;
    }
    // TODO:
  }

  return [
    handleSubmit,
    { deposit, onChange: handleOnChange, onSubmit: handleSubmit, errors }
  ] as const
}

export default useDeposit;
