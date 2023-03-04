import { useEffect, useState } from "react";
import User from '../apis/user';

const initialState = {
  _id: "",
  deposit: 0,
  email: "",
}

const useUserInfo = () => {
  const [user, setUser] = useState(initialState);

  useEffect(() => {
    const GetUserInfo = async () => {
      const { data, errors } = await User.Info();

      if (errors) {
        alert(errors?.response?.data?.message)

        return;
      }

      setUser(data)
    }

    GetUserInfo();
  }, [])

  return { user, }
}

export default useUserInfo;
