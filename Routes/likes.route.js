const express = require('express');
const app = express.Router();

const { Like, Post, Member, sequelize } = require('../models');
const authValidation = require('../middlewares/Validations/authValidation');
const { likeValidation } = require('../middlewares/Validations/likesValidation');

/* 좋아요 등록, 취소 */
app.put('/posts/:postId/like', authValidation, likeValidation, async (req, res) => {
  try {
    const { postId } = req.params;
    const { id } = res.locals.user;

    const switchLike = await Like.findOne({ where: { post_id: postId, user_id: id } });

    if (!switchLike) {
      await Like.create({ post_id: postId, user_id: id });
      await Post.update({ like: (await Post.findOne({ where: { post_id: postId }, attributes: ['like'] })).like + 1 }, { where: { post_id: postId } });

      return res.json({ message: '좋아요를 등록하였습니다.' });
    } else {
      await Like.destroy({ where: { post_id: postId, user_id: id } });
      await Post.update({ like: (await Post.findOne({ where: { post_id: postId }, attributes: ['like'] })).like - 1 }, { where: { post_id: postId } });

      return res.json({ message: '좋아요를 취소하였습니다.' });
    }
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: '게시글 좋아요에 실패하였습니다.' });
  }
});

/* 좋아요 등록한 게시글 목록 */
app.get('/like/posts', authValidation, async (req, res) => {
  try {
    const { id } = res.locals.user;
    console.log(id);
    res.status(200).json({
      posts: await Like.findAll({
        attributes: [],
        where: { user_id: id },
        include: [{ model: Post, attributes: { exclude: ['user_id'] }, include: [{ model: Member, attributes: { exclude: ['password', 'created_at', 'updated_at', 'user_id'] } }] }],
        raw: true,
      }),
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: '좋아요 게시물 조회에 실패하였습니다.' });
  }
});

module.exports = app;
