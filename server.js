const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

process.on('uncaughtException', err => {
  console.log(err);

  console.log('Server is shutting down');
  process.exit(1);
});

const app = require('./app');

const db = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(con => {
    console.log('DB connection successful');
  });

const port = process.env.PORT || 8000;
const server = app.listen(port, () => console.log(`App is running at ${port}`));

//All possible unhandledRejection error handler
process.on('unhandledRejection', err => {
  console.log(err);

  console.log('Server is shutting down');
  server.close(() => {
    process.exit(1);
  });
});
