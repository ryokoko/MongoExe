require('dotenv').config();


const express = require('express');
const morgan = require('morgan');
const cors = require('./src/middleware/cors');
const router = require('./src/routers');
const connectToDB = require('./src/utils/db');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(morgan(process.env.NODE_DEV === 'production'? 'common' : 'dev'))
app.use(cors);
app.use('/api', router);

//SERVER TRIES TO CONNECT TO DB
connectToDB();

app.listen(PORT, ()=> {
  console.log(`server listening on port ${PORT}`);
});

