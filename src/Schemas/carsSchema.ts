import mongoose from 'mongoose';

const carsSchema = new mongoose.Schema({
  id: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, min: 1, max: 2023 },
  color: { type: String, required: true },
  status: { type: Boolean, default: false },
  buyValue: { type: Number, require: true },
  doorsQty: { type: Number, require: true },
  seatsQty: { type: Number, require: true },
});

export default carsSchema;