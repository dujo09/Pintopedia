import { ObjectId } from "mongodb";
import Manufacturer from "../models/Manufacturer.js";

const getAllManufacturersDb = async function () {
  try {
    const manufacturers = await Manufacturer.find({});
    return manufacturers;
  } catch (err) {
    throw new Error(err.message);
  }
};

const getManufacturerByIdDb = async function (manufacturerId) {
  try {
    if (!ObjectId.isValid(manufacturerId))
      throw new Error("manufacturerId not valid ObjectId type");

    const manufacturer = await Manufacturer.findOne({ _id: manufacturerId });
    return manufacturer;
  } catch (err) {
    throw new Error(err.message);
  }
};

const updateManufacturerByIdDb = async function (
  manufacturerId,
  manufacturerData,
) {
  const { name, country, city, yearEstablished, website, description } =
    manufacturerData;

  try {
    if (!ObjectId.isValid(manufacturerId))
      throw new Error("manufacturerId not valid ObjectId type");

    const updatedManufacturer = await Manufacturer.findOneAndUpdate(
      { _id: new ObjectId(manufacturerId) },
      {
        $set: {
          name,
          country,
          city,
          yearEstablished,
          website,
          description,
        },
      },
      {
        new: true,
      },
    ).lean();

    if (!updatedManufacturer) return null;

    return updatedManufacturer;
  } catch (err) {
    throw new Error(err.message);
  }
};

const createManufacturerDb = async function (manufacturerData) {
  const { name, country, city, yearEstablished, website, description } =
    manufacturerData;

  try {
    const manufacturer = await Manufacturer.create({
      name,
      country,
      city,
      yearEstablished,
      website,
      description,
    });
    return manufacturer;
  } catch (err) {
    throw new Error(err.message);
  }
};

const deleteManufacturerByIdDb = async function (manufacturerId) {
  try {
    if (!ObjectId.isValid(manufacturerId))
      throw new Error("manufacturerId not valid ObjectId type");

    const result = await Manufacturer.deleteOne({ _id: manufacturerId });
    return result.deletedCount;
  } catch (err) {
    throw new Error(err.message);
  }
};

export default {
  getAllManufacturersDb,
  getManufacturerByIdDb,
  updateManufacturerByIdDb,
  deleteManufacturerByIdDb,
  createManufacturerDb,
};
