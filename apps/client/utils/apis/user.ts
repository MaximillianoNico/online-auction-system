import Service from '../services'

const Info = async () => {
  try {
    const response = await Service.get('/user');

    const user = response?.data?.data;

    return { data: user, errors: null}
  } catch (err) {
    return { data: {}, errors: err}
  }
}

export default {
  Info
}
