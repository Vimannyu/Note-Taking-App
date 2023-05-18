 require('dotenv').config();
 const express = require('express')

 //console.log('hello world');

 const db = require('./config/dbConnection.js');
//console.log(process.env.MONGODB_URI);

//------------------------------------------------------------




const app = express();


const port = process.env.PORT;

const server = app.listen(port, () => {
  console.log(`App running on port ${port}!!`);
});

app.use(bodyParser.json());

