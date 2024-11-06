import manufacturerService from "../services/manufacturerService.js";

const getAllManufacturers = async function (req, res) {
  try {
    const manufacturers = await manufacturerService.getAllManufacturersDb();
    return res.status(200).json(manufacturers);
  } catch (err) {
    console.log("Error getting all Manufacturers: ", err);
    return res.status(500).json({ message: "Error getting all Manufacturers" });
  }
};

const getManufacturerById = async function (req, res) {
  const manufacturerId = req.params.manufacturerId;
  try {
    const manufacturer =
      await manufacturerService.getManufacturerByIdDb(manufacturerId);
    if (!manufacturer)
      return res.status(404).json({ message: "Error Manufacturer not found" });

    return res.status(200).json(manufacturer);
  } catch (err) {
    console.log("Error getting Manufacturer: ", err);
    return res.status(500).json({ message: "Error getting Manufacturer" });
  }
};

const updateManufacturerById = async function (req, res) {
  const manufacturerId = req.params.manufacturerId;
  const manufacturerData = req.body;
  const userRole = res.locals.user.role;
  try {
    if (userRole !== "admin")
      return res
        .status(403)
        .json({ message: "Error User doesn't have permission" });

    const manufacturer = await manufacturerService.updateManufacturerByIdDb(
      manufacturerId,
      manufacturerData,
    );
    if (!manufacturer)
      return res.status(404).json({ message: "Error Manufacturer not found" });

    return res.status(200).json(manufacturer);
  } catch (err) {
    console.log("Error updating Manufacturer: ", err);
    return res.status(500).json({ message: "Error updating Manufacturer" });
  }
};

const createManufacturer = async function (req, res) {
  const manufacturerData = req.body;
  const userRole = res.locals.user.role;
  try {
    if (userRole !== "admin")
      return res
        .status(403)
        .json({ message: "Error User doesn't have permission" });

    const manufacturer =
      await manufacturerService.createManufacturerDb(manufacturerData);

    return res.status(200).json(manufacturer);
  } catch (err) {
    console.log("Error creating Manufacturer: ", err.message);
    return res.status(500).json({ message: "Error creating Manufacturer" });
  }
};

const deleteManufacturerById = async function (req, res) {
  const manufacturerId = req.params.manufacturerId;
  const userRole = res.locals.user.role;
  try {
    if (userRole !== "admin")
      return res
        .status(403)
        .json({ message: "Error User doesn't have permission" });

    const deletedCount =
      await manufacturerService.deleteManufacturerByIdDb(manufacturerId);
    if (!deletedCount)
      return res.status(404).json({ message: "Error Manufacturer not found" });

    return res.status(200).json(deletedCount);
  } catch (err) {
    console.log("Error deleting Manufacturer: ", err);
    return res.status(500).json({ message: "Error deleting Manufacturer" });
  }
};

export default {
  getAllManufacturers,
  getManufacturerById,
  updateManufacturerById,
  deleteManufacturerById,
  createManufacturer,
};
