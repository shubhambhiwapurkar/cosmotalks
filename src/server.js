const { init } = require('./app');

const PORT = process.env.PORT || 8080;

init().then(app => {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
    // require('./services/scheduler');
  });
});