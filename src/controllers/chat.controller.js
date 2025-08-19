const { GoogleGenerativeAI } = require('@google/generative-ai');
const User = require('../models/user.model');
const BirthChart = require('../models/birthChart.model');
const Chat = require('../models/chat.model');
const Sentiment = require('sentiment');
const sentiment = new Sentiment();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.chat = async (req, res) => {
  try {
    const { message } = req.body;
    const user = await User.findById(req.user.id);
    const birthChart = await BirthChart.findOne({ user: req.user.id });

    if (!birthChart) {
      return res.status(404).json({ error: 'Birth chart not found for this user.' });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const context = `The user has their Sun in ${birthChart.sunSign}, Moon in ${birthChart.moonSign}, and Ascendant in ${birthChart.ascendantSign}.`;
    const prompt = `${context}\n\nUser: ${message}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const aiMessage = response.text();

    const sentimentResult = sentiment.analyze(message);
    let emotion = 'neutral';
    if (sentimentResult.score > 0) {
      emotion = 'positive';
    } else if (sentimentResult.score < 0) {
      emotion = 'negative';
    }

    const chat = new Chat({
      user: req.user.id,
      messages: [
        {
          sender: 'user',
          text: message,
        },
        {
          sender: 'ai',
          text: aiMessage,
        },
      ],
      emotion: emotion,
    });

    await chat.save();

    res.json({ response: aiMessage });
  } catch (error) {
    console.error('Error in chat controller:', error);
    res.status(500).json({ error: 'Something went wrong.' });
  }
};

exports.getChatHistory = async (req, res) => {
  try {
    const chats = await Chat.find({ user: req.user.id });
    res.json(chats);
  } catch (error) {
    console.error('Error in getChatHistory controller:', error);
    res.status(500).json({ error: 'Something went wrong.' });
  }
};