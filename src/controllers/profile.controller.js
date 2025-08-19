const User = require('../models/user.model');
const BirthChart = require('../models/birthChart.model');

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('birthChart');
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateBirthChart = async (req, res) => {
  const { sunSign, moonSign, risingSign } = req.body;

  try {
    let birthChart = await BirthChart.findOne({ user: req.user.id });

    if (birthChart) {
      birthChart.sunSign = sunSign;
      birthChart.moonSign = moonSign;
      birthChart.risingSign = risingSign;
    } else {
      birthChart = new BirthChart({
        sunSign,
        moonSign,
        risingSign,
        user: req.user.id,
      });
      const user = await User.findById(req.user.id);
      user.birthChart = birthChart._id;
      await user.save();
    }

    await birthChart.save();
    res.send(birthChart);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getProfile,
  updateBirthChart,
};