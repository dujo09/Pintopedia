import axios from "axios";

const getAllBeers = async function () {
  const response = await axios.get("beers", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
}

export default {getAllBeers};