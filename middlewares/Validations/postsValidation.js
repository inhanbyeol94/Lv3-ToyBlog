require('dotenv').config();

const Joi = require('joi');
const { post } = require('../../message.json');

const postsValidation = {
  createValidation: async (req, res, next) => {
    const { title, content } = req.body;
    const schema = Joi.object().keys({
      title: Joi.string().max(50).empty().required().messages(post.title),
      content: Joi.string().max(5000).required().empty().messages(post.content),
    });
    try {
      await schema.validateAsync({ title, content });
    } catch (err) {
      return res.status(412).json({ message: err.message });
    }

    next();
  },

  updateValidation: async (req, res, next) => {
    const { postId } = req.params;
    const { title, content } = req.body;

    const schema = Joi.object().keys({
      postId: Joi.number().empty().required().messages(post.postId),
      title: Joi.string().max(50).empty().required().messages(post.title),
      content: Joi.string().max(5000).required().empty().messages(post.content),
    });
    try {
      await schema.validateAsync({ title, content, postId });
    } catch (err) {
      return res.status(412).json({ message: err.message });
    }

    next();
  },

  deleteValidation: async (req, res, next) => {
    const { postId } = req.params;

    const schema = Joi.object().keys({
      postId: Joi.number().empty().required().messages(post.postId),
    });
    try {
      await schema.validateAsync({ postId });
    } catch (err) {
      return res.status(412).json({ message: err.message });
    }

    next();
  },
};

module.exports = postsValidation;
