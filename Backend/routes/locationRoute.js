import countryModel from "../models/location/Country.js";
import stateModel from "../models/location/State.js";
import cityModel from "../models/location/City.js";
import express from "express";

const locationRouter = express.Router();

locationRouter.get('/states', async (req, res) => {
  try {
    // India country_id is 101
    const states = await stateModel.find({ country_id: 101 }).select('id name');
    res.json(states);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch states', error: error.message });
  }
});

locationRouter.get('/cities', async (req, res) => {
  const { state_id } = req.query;
  if (!state_id) {
    return res.status(400).json({ message: 'state_id is required' });
  }
  try {
    const cities = await cityModel.find({ state_id: Number(state_id) }).select('id name');
    res.json(cities);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch cities', error: error.message });
  }
});

locationRouter.get('/country', async (req, res) => {
  try {
    const country = await countryModel.findOne({ id: 101 }); // India
    res.json(country);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch country', error: error.message });
  }
});

export default locationRouter;