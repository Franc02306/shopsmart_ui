import API from "./axios.config";

// SERVICIOS GET
export const getProducts = async () => {
  return API.get(`/products`);
};

export const getProductById = async (id) => {
  return API.get(`/products/${id}`);
};

export const getProductByName = async (name) => {
  return API.get(`/products/search`, {
    params: {
      name: name,
    },
  });
};

export const getProductByPriceRange = async (minPrice, maxPrice) => {
  return API.get(`/products/price`, {
    params: {
      minPrice: minPrice,
      maxPrice: maxPrice,
    },
  });
};


// SERVICIOS POST

export const createProduct = async (data) => {
  return API.post(`/products/`, data);
};
