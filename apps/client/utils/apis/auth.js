import Service from '../services'
import { setCookie } from 'nookies'

const SignIn = async (email = '', password = '') => {
  try {
    const response = await Service.post('/auth/sign-in', {
      email,
      password
    });
    const token = response?.data?.data?.token || "";

    if (token) setCookie(null, "tkn", response?.data?.data?.token)

    return { success: true, err: null }
  } catch (err) {
    console.error(err);
    return { success: false, err }
  }
}

const Register = async (payload) => {
  try {
    const response = await Service.post('/auth/register', payload);

    if (response?.status === 201 || response?.status === 200) return {
      success: true,
      err: null
    }
  } catch (err) {
    console.error(err)
    return { success: false, err }
  }
}

export default {
  SignIn,
  Register
}
