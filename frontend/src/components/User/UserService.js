import axios from "axios";

const getAllUsers = async function () {
  const response = await axios.get("users", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

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

const updateUserPasswordById = async function (userId, userData) {
  const response = await axios.put(`users/${userId}/update-password`, userData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export default {
  getUserById,
  updateUserById,
  getAllUsers,
  updateUserPasswordById
};
