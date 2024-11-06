import axios from "axios";

const getAllManufacturers = async function () {
  const response = await axios.get("manufacturers", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

const getManufacturerById = async function (manufacturerId) {
  const response = await axios.get(`manufacturers/${manufacturerId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

const updateManufacturerById = async function (
  manufacturerId,
  manufacturerData,
) {
  const response = await axios.put(
    `manufacturers/${manufacturerId}`,
    manufacturerData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  return response.data;
};

const createManufacturer = async function (manufacturerData) {
  const response = await axios.post("manufacturers", manufacturerData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

const deleteManufacturerById = async function (manufacturerId) {
  const response = await axios.delete(`manufacturers/${manufacturerId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export default {
  getAllManufacturers,
  getManufacturerById,
  updateManufacturerById,
  createManufacturer,
  deleteManufacturerById,
};
