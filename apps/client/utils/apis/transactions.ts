import Service from "../services"

const Bid = async ({ bid = 0, productId = "" }) => {
  try {
    const response = await Service.get(`/transaction/${productId}`, {
      data: { bid }
    });
    const data = response?.data?.data || {};

    return { data, errors: null }
  } catch (err) {
    return { data: {}, errors: null }
  }
}

export default { Bid }
