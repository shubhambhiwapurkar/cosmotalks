const mongoose = require('mongoose');

const dailyContentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  dailyAffirmation: String,
  keyTransits: [
    {
      symbol: String,
      title: String,
      description: String,
    },
  ],
  dailyChartInsight: String,
  exploreTopic: {
    title: String,
    content: String,
  },
});

const DailyContent = mongoose.model('DailyContent', dailyContentSchema);

module.exports = DailyContent;