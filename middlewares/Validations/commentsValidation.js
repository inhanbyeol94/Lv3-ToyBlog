require('dotenv').config();

const Joi = require('joi');
const { comment } = require('../../message.json');

const commentsValidation = {
  createValidation: async (req, res, next) => {
    const { postId } = req.params;
    const { content } = req.body;
    const schema = Joi.object().keys({
      postId: Joi.number().empty().required().messages(comment.postId),
      content: Joi.string().max(3000).required().empty().messages(comment.content),
    });
    try {
      await schema.validateAsync({ postId, content });
    } catch (err) {
      return res.status(412).json({ message: err.message });
    }

    next();
  },

  updateValidation: async (req, res, next) => {
    const { postId, commentId } = req.params;
    const { content } = req.body;

    const schema = Joi.object().keys({
      postId: Joi.number().empty().required().messages(comment.postId),
      commentId: Joi.number().empty().required().messages(comment.commentsId),
      content: Joi.string().max(3000).required().empty().messages(comment.content),
    });
    try {
      await schema.validateAsync({ content, postId, commentId });
    } catch (err) {
      return res.status(412).json({ message: err.message });
    }

    next();
  },

  deleteValidation: async (req, res, next) => {
    const { postId, commentId } = req.params;
    const { content } = req.body;

    const schema = Joi.object().keys({
      postId: Joi.number().empty().required().messages(comment.postId),
      commentId: Joi.number().empty().required().messages(comment.commentsId),
    });
    try {
      await schema.validateAsync({ postId, commentId });
    } catch (err) {
      return res.status(412).json({ message: err.message });
    }

    next();
  },

  readValidation: async (req, res, next) => {
    const { postId } = req.params;
    const schema = Joi.object().keys({
      postId: Joi.number().empty().required().messages(comment.postId),
    });
    try {
      await schema.validateAsync({ postId });
    } catch (err) {
      return res.status(412).json({ message: err.message });
    }

    next();
  },
};

module.exports = commentsValidation;
