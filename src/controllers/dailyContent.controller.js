const DailyContent = require('../models/dailyContent.model');

async function getDailyContent(req, res) {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const content = await DailyContent.findOne({
      user: req.user._id,
      date: {
        $gte: today,
      },
    });

    if (!content) {
      return res.status(404).json({ message: 'Daily content not found.' });
    }

    res.json(content);
  } catch (error) {
    console.error('Error fetching daily content:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  getDailyContent,
};