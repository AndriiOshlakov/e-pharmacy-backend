import { Schema } from 'mongoose';
import { model } from 'mongoose';

const nearestPharmacySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

export const NearestPharmacy = model(
  'NearestPharmacy',
  nearestPharmacySchema,
  'nearest',
);
