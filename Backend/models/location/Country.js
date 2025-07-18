import mongoose from "mongoose";

const timezoneSchema = new mongoose.Schema({
  zoneName: String,
  gmtOffset: Number,
  gmtOffsetName: String,
  abbreviation: String,
  tzName: String,
}, { _id: false });

const countrySchema = new mongoose.Schema({
  id: Number,
  name: String,
  iso3: String,
  iso2: String,
  numeric_code: String,
  phonecode: String,
  capital: String,
  currency: String,
  currency_name: String,
  currency_symbol: String,
  tld: String,
  native: String,
  region: String,
  region_id: Number,
  subregion: String,
  subregion_id: Number,
  nationality: String,
  timezones: [timezoneSchema],
  translations: mongoose.Schema.Types.Mixed, // Accepts any object
  latitude: String,
  longitude: String,
  emoji: String,
  emojiU: String,
}, { collection: "countries" });

const countryModel =  mongoose.model("Country", countrySchema);
export default countryModel;
