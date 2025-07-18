import mongoose from "mongoose";

const stateSchema = new mongoose.Schema({
  id: Number,
  name: String,
  country_id: Number,
  country_code: String,
  country_name: String,
  state_code: String,
  type: String,
  latitude: String,
  longitude: String,
}, { collection: "states" });

const stateModel = mongoose.model("State", stateSchema);
export default stateModel;