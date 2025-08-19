const mongoose = require('mongoose');

const birthChartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  ascendant: String,
  sun: { sign: String, house: Number },
  moon: { sign: String, house: Number, nakshatra: String },
  mercury: { sign: String, house: Number },
  venus: { sign: String, house: Number },
  mars: { sign: String, house: Number },
  jupiter: { sign: String, house: Number },
  saturn: { sign: String, house: Number },
  rahu: { sign: String, house: Number },
  ketu: { sign: String, house: Number },
  // We can add divisional charts and dasha periods later as needed
});

const BirthChart = mongoose.model('BirthChart', birthChartSchema);

module.exports = BirthChart;