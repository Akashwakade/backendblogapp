// index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/users');
const blogRoutes = require('./routes/blogs');


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/users', userRoutes);
app.use('/blogs', blogRoutes);

app.listen(PORT, () => {
   
  console.log(`Server is running on port ${PORT}`);
});
