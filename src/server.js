require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');

const app = express();

//console.log('hello world');

const db = require('./config/dbConnection.js');

const userRoutes = require('./routes/userRoutes');
const noteRoutes = require('./routes/noteRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
//console.log(process.env.MONGODB_URI);


app.use(bodyParser.json());

app.use(userRoutes);
app.use(noteRoutes);
app.use(categoryRoutes);

//------------------------------------------------------------


const port = process.env.PORT;

const server = app.listen(port, () => {
  console.log(`App running on port ${port}!!`);
});
