import { useState } from "react";

const useDeposit = () => {
  const [deposit, setDeposit] = useState(0);

  const handleOnChange = (event: { target: HTMLInputElement; }) => setDeposit(+event?.target?.value);
  const handleSubmit = () => {
    // TODO:
  }

  return [
    handleSubmit,
    { deposit, onChange: handleOnChange, onSubmit: handleSubmit }
  ] as const
}

export default useDeposit;
