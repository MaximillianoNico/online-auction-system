import { useState } from "react";

const INPUT_TYPE = {
  NAME: 'name',
  START_PRICE: 'startPrice',
  TIME_WINDOW: 'timeWindow'
}

const initialState = {
  [INPUT_TYPE.NAME]: "",
  [INPUT_TYPE.START_PRICE]: 0,
  [INPUT_TYPE.TIME_WINDOW]: Date.now().toString()
}

const useCreateProduct = () => {
  const [product, setProduct] = useState(initialState);

  const handleOnChange = e => setProduct(
    prev => ({
      ...prev,
      [e?.target?.name]: e?.target?.value
    })
  )

  const handleOnSubmit = () => {
    // TODO: request bid product
  }

  return {
    product,
    onChange: handleOnChange,
    onSubmit: handleOnSubmit,
    TYPES: INPUT_TYPE
  }
}

export default useCreateProduct;
