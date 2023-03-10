import Service from "../services"

const Products = async ({ isPublished = true, isAchieve = false }) => {
  try {
    const response = await Service.get('/products', {
      params: {
        published: !!isPublished,
        achieve: !!isAchieve
      }
    });
    const data = response?.data?.data || {};

    return { data, errors: null }
  } catch (err) {
    return { data: {}, errors: null }
  }
}

const ProductDetail = async ({ productId = "" }) => {
  try {
    const response = await Service.get(`/products/${productId}`);
    const data = response?.data?.data || [{ }];

    return { data, errors: null }
  } catch (err) {
    return { data: {}, errors: null }
  }
}

const Create = async (payload = {}) => {
  try {
    const response = await Service.post(`/products/create`, payload);
    const data = response?.data?.data || [{ }];

    return { data, errors: null }
  } catch (err) {
    return { data: {}, errors: err }
  }
}

const Publish = async (productId = "") => {
  try {
    const response = await Service.put(`/products/publish/${productId}`);

    return { data: response?.data, errors: null }
  } catch (err) {
    return { data: {}, errors: err }
  }
}

export default {
  Products,
  ProductDetail,
  Create,
  Publish
}
