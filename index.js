const express = require('express');
const app = express();
const PORT = process.env.API_PORT || 3000;
const bodyParser = require('body-parser');
require('dotenv').config();
const connectDB = require('./config/connectDB');
const errorHandler = require('./middlewares/errorHandler');
const userRoutes = require('./routes/userRoutes');

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(errorHandler);

// DB Connection
connectDB();

// Routes
app.use('/api/user', userRoutes)

app.get('/', (req,res) => {
  req.send('/ routes');
});

app.listen(PORT, () => {
  console.log(`API is running on PORT ${PORT}`);
})