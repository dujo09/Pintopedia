import mongoose, { Schema } from "mongoose";

const ManufacturerSchema = new Schema({
  name: {
    type: String,
  },
  yearEstablished: {
    type: Number,
  },
  country: {
    type: String,
  },
  city: {
    type: String,
  },
  description: {
    type: String,
  },
  website: {
    type: String,
  },
});

const Manufacturer = mongoose.model("Manufacturer", ManufacturerSchema);

export default Manufacturer;
