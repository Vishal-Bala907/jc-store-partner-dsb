import apiClient from "./config";

export const loginStorePartner = async (cred) => {
  console.log(cred);

  try {
    const response = await apiClient.post(`/api/customer/login-stp`, cred);
    // console.log(response);
    return response.data;
  } catch (err) {
    throw err;
  }
};
export const getAllOrders = async (zipCode) => {
  try {
    const response = await apiClient.get(
      `/api/partners/orders/zip-5/${zipCode}`
    );
    // console.log(response);
    return response.data;
  } catch (err) {
    throw err;
  }
};
export const getAllRiders = async (zipCode) => {
  try {
    const response = await apiClient.get(`/api/rider/get-all-riders`);
    // console.log(response);
    return response.data;
  } catch (err) {
    throw err;
  }
};
export const assignOrderToRider = async (orderId, riderId, shopId) => {
  try {
    const response = await apiClient.get(
      `/api/rider/assign-rider/${orderId}/${riderId}/${shopId}`
    );
    // console.log(response);
    return response.data;
  } catch (err) {
    throw err;
  }
};
export const fetchOrders = async (zipCode, page) => {
  try {
    const response = await apiClient.get(
      `/api/partners/orders/zip/${zipCode}?page=${page}&limit=${25}`
    );
    // console.log(response);
    return response.data;
  } catch (err) {
    throw err;
  }
};
export const updateOrder = async (id, status) => {
  try {
    const response = await apiClient.put(`/api/partners/update/${id}`, status);
    // console.log(response);
    return response.data;
  } catch (err) {
    throw err;
  }
};
