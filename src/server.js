const appModule = require('./app');

const PORT = process.env.PORT || 8080;

appModule.init().then(app => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Listening on port ${PORT}`);
    // require('./services/scheduler');
  });
});