import axios from "axios";

const getUserById = async function (userId) {
  const response = await axios.get(`users/${userId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

const updateUserById = async function (userId, userData) {
  const response = await axios.put(`users/${userId}`, userData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export default {
  getUserById,
  updateUserById,
};
