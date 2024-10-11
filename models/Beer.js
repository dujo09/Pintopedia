import mongoose, { Schema } from "mongoose";

const BeerSchema = new Schema({
  name: {
    type: String,
  },
  alcoholPercentage: {
    type: Number,
  },
  color: {
    type: String,
  },
  averagePrice: {
    type: String,
  },
  rating: {
    type: Number,
  },
  flavorDescription: {
    type: String,
  },
  manufacturer: {
    type: Schema.Types.ObjectId,
    ref: "Manufacturer",
  },
});

const Beer = mongoose.model("Beer", BeerSchema);

export default Beer;
