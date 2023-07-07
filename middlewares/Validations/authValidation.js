require('dotenv').config();

const { SESSION_SECRET_KEY } = process.env;
const jwt = require('jsonwebtoken');
const { Member } = require('../../models');
const { user } = require('../../message.json');

module.exports = async (req, res, next) => {
  const { auth } = req.cookies;
  const [authType, authToken] = (auth ?? '').split(' ');

  if (authType !== 'Bearer' || !authToken) return res.status(403).json({ message: user.signInValidation });

  try {
    const { id } = jwt.verify(authToken, SESSION_SECRET_KEY);

    const user = await Member.findOne({ attributes: ['user_id', 'id', 'nickname'], where: { id } });
    res.locals.user = user;

    next();
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: '전달된 쿠키에서 오류가 발생하였습니다.' });
  }
};
