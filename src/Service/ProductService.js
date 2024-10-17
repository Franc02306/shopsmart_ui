import API from "./axios.config";

// SERVICIOS GET
export const getProducts = async () => {
  return API.get(`/api/v1/products/all`);
};

export const getProductById = async (id) => {
  return API.get(`/api/v1/products/${id}`);
};

export const getProductByName = async (name) => {
  return API.get(`/api/v1/products/products/${name}/products`);
};

export const getProductByPriceRange = async (minPrice, maxPrice) => {
  return API.get(`/api/v1/products/product/by-price-range`, {
    params: {
      minPrice: minPrice,
      maxPrice: maxPrice,
    },
  });
};

export const getProductsByCategory = async (category) => {
  return API.get(`/api/v1/products/product/${category}/all/products`);
};

// SERVICIOS POST
export const createProduct = async (data) => {
  return API.post(`/api/v1/products/add`, data);
};