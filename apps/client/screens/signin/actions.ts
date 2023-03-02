import { useState } from "react"
import Auth from "../../utils/apis/auth";
import { useRouter } from "next/router";

const INPUT_TYPE = {
  EMAIL: 'email',
  PASSWORD: 'password'
}

export const useSignIn = () => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [errors, setErrors] = useState("");
  const [userSignIn, setMailPass] = useState({
    [INPUT_TYPE.EMAIL]: "",
    [INPUT_TYPE.PASSWORD]: ""
  });

  const onChange = e => {
    if (e?.target?.name) {
      setMailPass(
        prev => ({
          ...prev,
          [e?.target?.name]: e?.target?.value
        })
      )
    }
  }

  const onSubmit = async () => {
    setLoading(true);
    if (!userSignIn[INPUT_TYPE.EMAIL] || !userSignIn[INPUT_TYPE.PASSWORD]) {
      setErrors("Email or Password is required")
      return;
    }

    const { err } = await Auth.SignIn(
      userSignIn[INPUT_TYPE.EMAIL],
      userSignIn[INPUT_TYPE.PASSWORD]
    );

    if (err) {
      setLoading(false);
      setErrors(err.response.data?.errors || "")

      return;
    }

    const rediret = {
      pathname: '/products',
      query: router?.query
    };

    setLoading(false);
    setErrors("");
    setSuccess(true);

    setTimeout(() => {
      router.push(rediret)
    }, 1500)
  }

  return {
    onChange,
    onSubmit,
    values: userSignIn,
    types: INPUT_TYPE,
    isSuccess,
    isLoading,
    errors
  }
}
