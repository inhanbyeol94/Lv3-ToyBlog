require('dotenv').config();

const Joi = require('joi');
const { user } = require('../../message.json');
const { Member } = require('../../models');
const crypto = require('crypto');
const { SECRET_KEY } = process.env;

const membersValidation = {
  signUpValidation: async (req, res, next) => {
    const body = req.body;
    const schema = Joi.object().keys({
      id: Joi.string()
        .min(6)
        .max(25)
        .empty()
        .regex(/^[A-Za-z0-9+]*$/)
        .required()
        .messages(user.id),
      nickname: Joi.string()
        .min(2)
        .max(15)
        .required()
        .empty()
        .regex(/^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,16}$/)
        .messages(user.nickname),
      password: Joi.string()
        .min(8)
        .max(20)
        .required()
        .empty()
        .regex(/^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])/)
        .messages(user.password),
      confirmPassword: Joi.string().required().empty().valid(Joi.ref('password')).messages(user.confirmPassword),
    });
    try {
      await schema.validateAsync(body);
    } catch (err) {
      return res.status(412).json({ message: err.message });
    }

    try {
      if (await Member.findOne({ where: { user_id: body.id } })) return res.status(412).json({ message: user.overlapId });
      if (await Member.findOne({ where: { nickname: body.nickname } })) return res.status(412).json({ message: user.overlapId });
    } catch (err) {
      console.error(err);
      return res.status(400).json({ message: '오류가 발생하였습니다.' });
    }

    next();
  },
  signInValidation: async (req, res, next) => {
    const body = req.body;
    const schema = Joi.object().keys({
      id: Joi.string()
        .min(6)
        .max(25)
        .empty()
        .regex(/^[A-Za-z0-9+]*$/)
        .required()
        .messages(user.id),
      password: Joi.string()
        .min(8)
        .max(20)
        .required()
        .empty()
        .regex(/^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])/)
        .messages(user.password),
    });
    try {
      await schema.validateAsync(body);
    } catch (err) {
      return res.status(412).json({ message: err.message });
    }
    const passwordToCrypto = crypto.pbkdf2Sync(body.password, SECRET_KEY.toString('hex'), 11524, 64, 'sha512').toString('hex');
    const signInUserValidation = await Member.findOne({ where: { user_id: body.id, password: passwordToCrypto } });

    try {
      if (!signInUserValidation) return res.status(412).json({ message: user.signInError });
    } catch (err) {
      console.error(err);
      return res.status(400).json({ message: '오류가 발생하였습니다.' });
    }

    next();
  },
};

module.exports = membersValidation;
