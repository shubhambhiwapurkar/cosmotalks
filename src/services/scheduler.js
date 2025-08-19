const cron = require('node-cron');
const User = require('../models/user.model');
const DailyContent = require('../models/dailyContent.model');
const { generateDailyContent } = require('./ai.service');

// Schedule a job to run every day at midnight
cron.schedule('0 0 * * *', async () => {
  console.log('Running daily content generation job...');
  
  try {
    const users = await User.find({}).populate('birthChart');
    
    for (const user of users) {
      if (user.birthChart) {
        console.log(`Generating content for user: ${user.displayName}`);
        
        const content = await generateDailyContent(user.birthChart);
        
        const newDailyContent = new DailyContent({
          user: user._id,
          date: new Date(),
          ...content,
        });
        
        await newDailyContent.save();
        console.log(`Content saved for user: ${user.displayName}`);
      }
    }
    
    console.log('Daily content generation job finished.');
  } catch (error) {
    console.error('Error during daily content generation job:', error);
  }
});

console.log('Daily content scheduler has been initialized.');