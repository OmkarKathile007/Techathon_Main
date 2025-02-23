
import mongoose from 'mongoose';

const donationStatsSchema = new mongoose.Schema({
  donorName: {
    type: String,
    required: true,
  },
  donateDate: {
    type: Date,
    default: Date.now,
  },
  donateTo: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('DonationStats', donationStatsSchema);