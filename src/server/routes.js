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
export const getAllRiders = async () => {
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

export const addRiderApi = async (formData, partnerId) => {
  console.log(formData);

  try {
    const response = await apiClient.post(
      `/api/rider/add-rider/${partnerId}`,
      formData
    );
    console.log("rider api response", response);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const fetchOrders = async (zipCode, page) => {
  try {
    const response = await apiClient.get(
      `/api/partners/orders/zip/${zipCode}?page=${page}&limit=${10}`
    );
    // console.log(response);
    return response.data;
  } catch (err) {
    throw err;
  }
};
export const fetchPendingOrders = async (zipCode, page) => {
  try {
    const response = await apiClient.get(
      `/api/partners/orders/zip/${zipCode}/pending?page=${page}&limit=${10}`
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
export const getIncomeAndCountData = async (storeId) => {
  try {
    const response = await apiClient.get(
      `/api/partners/store/${storeId}/stats`
    );
    // console.log(response);
    return response.data;
  } catch (err) {
    throw err;
  }
};
export const getBestSeller = async () => {
  try {
    const response = await apiClient.get(`api/orders/best-seller/chart`);
    // console.log(response);
    return response.data;
  } catch (err) {
    throw err;
  }
};
export const getAllRidersOfTheStore = async (id) => {
  try {
    const response = await apiClient.get(`/api/partners/partner/rider/${id}`);
    // console.log(response);
    return response.data;
  } catch (err) {
    throw err;
  }
};
export const deleteRider = async (id) => {
  try {
    const response = await apiClient.delete(`/api/rider/delete/${id}`);
    // console.log(response);
    return response.data;
  } catch (err) {
    throw err;
  }
};
export const updatePartnerProfile = async (id, partner) => {
  try {
    const response = await apiClient.put(
      `/api/partners/update/profile/${id}`,
      partner
    );
    // console.log(response);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const getMyNotifications = async (zipCode) => {
  try {
    const response = await apiClient.get(
      `/api/store/notification/orders/${zipCode}`
    );
    // console.log(response);
    return response.data;
  } catch (err) {
    throw err;
  }
};
export const deleteMyNotifications = async (zipCode) => {
  try {
    const response = await apiClient.delete(
      `/api/store/notification/orders/${zipCode}`
    );
    // console.log(response);
    return response.data;
  } catch (err) {
    throw err;
  }
};
