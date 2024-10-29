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
  flavorDescription: {
    type: String,
  },
  manufacturer: {
    type: Schema.Types.ObjectId,
    ref: "Manufacturer",
  },
  userRatings: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      rating: { type: Number, required: true, min: 1, max: 5 },
    },
  ],
});

const Beer = mongoose.model("Beer", BeerSchema);

export default Beer;
