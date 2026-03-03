import { Pharmacy } from '../models/pharmacy.js';

export const getAllPharmacies = async (req, res) => {
  const pharmacies = await Pharmacy.find();
  res.status(200).json(pharmacies);
};
