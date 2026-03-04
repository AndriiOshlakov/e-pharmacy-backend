import { NearestPharmacy } from '../models/nearestPharmacies.js';
import { Pharmacy } from '../models/pharmacy.js';

export const getAllPharmacies = async (req, res) => {
  const { page = 1, perPage = 9 } = req.query;
  const skip = (page - 1) * perPage;
  const pharmaciesQuery = Pharmacy.find();
  const [totalPharmacies, pharmacies] = await Promise.all([
    pharmaciesQuery.clone().countDocuments(),
    pharmaciesQuery.skip(skip).limit(perPage),
  ]);
  const totalPages = Math.ceil(totalPharmacies / perPage);
  res
    .status(200)
    .json({ page, perPage, totalPages, totalPharmacies, pharmacies });
};

export const getNearestPharmacies = async (req, res) => {
  const nearestPharmacies = await NearestPharmacy.find();
  res.status(200).json(nearestPharmacies);
};
