import Service from "../services"

const Products = async ({ isPublished = true }) => {
  try {
    const response = await Service.get('/products', {
      params: {
        published: !!isPublished
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

export default {
  Products,
  ProductDetail
}
