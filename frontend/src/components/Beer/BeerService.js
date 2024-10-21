import axios from "axios";

const getAllBeers = async function () {
  const response = await axios.get("beers", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

const getBeerById = async function (beerId) {
  const response = await axios.get(`beers/${beerId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

const updateBeerById = async function (beerId, beerData) {
  const response = await axios.put(`beers/${beerId}`, beerData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

const createBeer = async function (beerData) {
  const response = await axios.post("beers", beerData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

const deleteBeerById = async function (beerId) {
  const response = await axios.delete(`beers/${beerId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

const getAllManufacturersForDropdown = async function () {
  const response = await axios.get("manufacturers", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

const likeBeerById = async function (beerId) {
  const response = await axios.put(`users/like-beer/${beerId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export default {
  getAllBeers,
  getBeerById,
  updateBeerById,
  createBeer,
  deleteBeerById,
  getAllManufacturersForDropdown,
  likeBeerById,
};
