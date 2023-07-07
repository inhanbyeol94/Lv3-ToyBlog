const express = require('express');
const app = express.Router();

const { Post, Member } = require('../models');

/* 메인 */
app.get('/', async (req, res) => {
  try {
    res.status(200).json({ message: 'Hello Blog!' });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: '메인 페이지를 불러오는데 실패하였습니다.' });
  }
});

module.exports = app;
