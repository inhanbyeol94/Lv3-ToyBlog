require('dotenv').config();
const { DEVURL, PORT } = process.env;
const express = require('express');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const app = express();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());

fs.readdirSync('./Routes').forEach((Route) => {
  app.use('/', require(`./Routes/${Route}`));
});

app.listen(PORT, (err) => {
  if (err) return console.log(err);
  console.log('서버가 구동되었습니다.');
  console.log(DEVURL);
});
