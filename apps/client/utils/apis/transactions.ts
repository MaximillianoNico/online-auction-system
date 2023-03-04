import Service from "../services"

const Bid = async ({ bid = 0, productId = "" }) => {
  try {
    const response = await Service.post(
      `/transaction/${productId}`,
      { bid}
    );
    const data = response?.data?.data || {};

    return { data, errors: null }
  } catch (err) {
    return { data: {}, errors: err }
  }
}

const Deposit = async ({ deposit = 0 }) => {
  try {
    const response = await Service.post(
      `/transaction/deposit`,
      { deposit }
    );
    const data = response?.data?.data || {};

    return { data, errors: null }
  } catch (err) {
    return { data: {}, errors: err }
  }
}

export default { Bid, Deposit }
