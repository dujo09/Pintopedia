import axios from "axios";

const getAllBeers = async function () {
  const response = await axios.get("beers", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
}

const getBeerById = async function (beerId) {
  const response = await axios.get(`beers/${beerId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
}


export default {getAllBeers, getBeerById};