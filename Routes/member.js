require('dotenv').config;
const { SECRET_KEY, SESSION_SECRET_KEY } = process.env;

const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const express = require('express');
const app = express.Router();
const { signUpValidation, signInValidation } = require('../middlewares/Validations/usersValidation');

const { Member } = require('../models');

//all read
app.post('/signup', signUpValidation, async (req, res) => {
  try {
    const { id, password, nickname } = req.body;
    const passwordToCrypto = crypto.pbkdf2Sync(password, SECRET_KEY.toString('hex'), 11524, 64, 'sha512').toString('hex');
    await Member.create({ id, nickname, password: passwordToCrypto });

    res.status(201).json({ message: '정상 등록되었습니다.' });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: '오류가 발생했습니다.' });
  }
});

app.post('/signin', signInValidation, async (req, res) => {
  try {
    const { id, password } = req.body;

    const payloadData = { userId: validationToUser.userId, nickname: validationToUser.nickname };
    const token = await jwt.sign(payloadData, SESSION_SECRET_KEY);

    res.cookie('auth', `Bearer ${token}`);
    return res.status(200).json({ message: '로그인 성공' });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: '로그인 도중 오류가 발생하였습니다.' });
  }
});

module.exports = app;
