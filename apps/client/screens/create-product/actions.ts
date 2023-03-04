import { useRouter } from "next/router";
import { useState } from "react";
import Product from "../../utils/apis/products";

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
  const router = useRouter();
  const [product, setProduct] = useState(initialState);
  const [error, setError] = useState();

  const handleOnChange = e => setProduct(
    prev => ({
      ...prev,
      [e?.target?.name]: e?.target?.value
    })
  )

  const handleOnSubmit = async () => {
    const payload = {
      name: product[INPUT_TYPE.NAME],
      lastTimeAuction: product[INPUT_TYPE.TIME_WINDOW],
      price: product[INPUT_TYPE.START_PRICE]
    }

    const { errors } = await Product.Create(payload);

    if (errors) {
      setError(errors?.response?.data?.message);

      return;
    }

    alert('Success create new item');

    setTimeout(() => {
      router.push({
        pathname: "/products",
        query: router.query
      })
    }, 1500)
  }

  return {
    product,
    error,
    onChange: handleOnChange,
    onSubmit: handleOnSubmit,
    TYPES: INPUT_TYPE
  }
}

export default useCreateProduct;
