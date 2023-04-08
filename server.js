require('dotenv').config();
const express = require('express');

const { default: mongoose } = require('mongoose');

const userRoute = require('./routes/user');
const bannerRoute = require('./routes/banner');
const categoryRoute = require('./routes/categories');

// Express app
const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use('/api/user', userRoute);
app.use('/api/banner', bannerRoute); 
app.use('/api/category', categoryRoute);

mongoose.set('strictQuery', false);

// connect to DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // Listen for request

    app.listen(process.env.PORT, () => {
      console.log('Connected to DB Listening on port ', process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });

process.env;
