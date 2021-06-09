const mongoose = require('mongoose');


//mongoose.connect('mongodb://localhost:27017/mongoexe)

const connectToDB = () => {

  const connectionString = process.env.CONNECTION_STRING;

const db = mongoose.connection;
db.on('connected', () => {
  console.log(`DB connected with ${connectionString}`)
});

db.on('error', (error) => {
  console.log('DB connection failed');
  console.log(error.message);
  process.exit(1); //人工非正常关闭（非零状态）
});

db.on('disconnected', () => {
  console.log('disconnected');
})
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
}

module.exports = connectToDB;