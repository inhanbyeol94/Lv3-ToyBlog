require('dotenv').config();

const Joi = require('joi');
const { like } = require('../../message.json');
const { Post } = require('../../models');

const likesValidation = {
  likeValidation: async (req, res, next) => {
    const { postId } = req.params;

    const schema = Joi.object().keys({
      postId: Joi.number().empty().required().messages(like.postId),
    });
    try {
      await schema.validateAsync({ postId });
    } catch (err) {
      return res.status(412).json({ message: err.message });
    }

    try {
      const postValidation = await Post.findOne({ where: { post_id: postId } });
      if (!postValidation) return res.status(412).json({ message: '게시글이 존재하지 않습니다.' });
    } catch (err) {
      console.error(err);
      return res.status(400).json({ message: '오류가 발생하였습니다.' });
    }

    next();
  },
};

module.exports = likesValidation;
