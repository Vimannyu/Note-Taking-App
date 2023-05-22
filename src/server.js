require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const db = require('./config/dbConnection.js');

const userRoutes = require('./routes/userRoutes');
const noteRoutes = require('./routes/noteRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const cors = require('./middleware/cors')
const errorHandler = require('./middleware/error-handler');
const logger = require('./middleware/logger.js');
//console.log(process.env.MONGODB_URI);

app.use(cors);
app.use(errorHandler);
app.use(bodyParser.json());

app.use(userRoutes);
app.use(noteRoutes);
app.use(categoryRoutes);

//------------------------------------------------------------


const port = process.env.PORT;

const server = app.listen(port, () => {
  logger.info(`App running on port ${port}!!`);
});


module.exports = server;