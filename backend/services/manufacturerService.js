import { ObjectId } from "mongodb";
import Manufacturer from "../models/Manufacturer.js";

const getAllManufacturersDb = async function () {
  const manufacturers = await Manufacturer.find({});
  return manufacturers;
};

const getManufacturerByIdDb = async function (id) {
  if (!ObjectId.isValid(id)) return null;

  const beer = await Manufacturer.findOne({ _id: id });
  return beer;
};

const updateManufacturerByIdDb = async function (id, manufacturerData) {
  if (!ObjectId.isValid(id)) return null;

  let manufacturer = await Manufacturer.findOne({ _id: id });
  Object.keys(manufacturerData).forEach((key) => {
    manufacturer[key] = manufacturerData[key];
  });
  await manufacturer.save();
  return manufacturer;
};

const deleteManufacturerByIdDb = async function (id) {
  if (!ObjectId.isValid(id)) return null;

  const result = await Manufacturer.deleteOne({ _id: id });
  return result.deletedCount;
};

export default {
  getAllManufacturersDb,
  getManufacturerByIdDb,
  updateManufacturerByIdDb,
  deleteManufacturerByIdDb,
};
