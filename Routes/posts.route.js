const express = require('express');
const app = express.Router();

const { Post, Comment, Like, Member } = require('../models');
const authValidation = require('../middlewares/Validations/authValidation');
const { createValidation, updateValidation, deleteValidation } = require('../middlewares/Validations/postsValidation');
const { Op } = require('sequelize');

/* 게시물 생성 */
app.post('/posts', authValidation, createValidation, async (req, res) => {
  try {
    const { title, content } = req.body;
    const { id } = res.locals.user;

    await Post.create({ user_id: id, title, content });

    return res.json({ message: '게시글이 정상 생성되었습니다.' });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: '게시글 작성에 실패하였습니다.' });
  }
});

/* 전체 게시물 읽기 */
app.get('/posts', async (req, res) => {
  try {
    res.status(200).json({ posts: await Post.findAll({ include: [{ model: Member, attributes: ['id', 'nickname'] }], attributes: ['post_id', 'title', 'created_at', 'updated_at'], raw: true }) });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: '전체 데이터를 불러오는데 실패하였습니다.' });
  }
});

/* 단일 게시물 읽기 */
app.get('/posts/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    res.status(200).json({ post: await Post.findOne({ where: { post_id: postId } }) });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: '게시물 상세 정보를 불러오는데 실패하였습니다.' });
  }
});

/* 게시물 업데이트 */
app.put('/posts/:postId', authValidation, updateValidation, async (req, res) => {
  try {
    const { postId } = req.params;
    const { title, content } = req.body;
    const { id } = res.locals.user;

    const authority = await Post.findOne({ where: { post_id: postId, user_id: id } });
    if (!authority) return res.status(412).json({ message: '게시물이 존재하지 않거나, 게시글 수정은 본인이 작성한 게시글만 가능합니다.' });

    await Post.update({ title, content }, { where: { [Op.and]: [{ post_id: postId }, { user_id: id }] } });

    return res.status(201).json({ message: '정상 수정되었습니다.' });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: '게시글 수정에 실패하였습니다.' });
  }
});

/* 게시물 삭제 */
app.delete('/posts/:postId', authValidation, deleteValidation, async (req, res) => {
  try {
    const { id } = res.locals.user;
    const { postId } = req.params;

    const authority = await Post.findOne({ where: { post_id: postId, user_id: id } });
    if (!authority) return res.status(412).json({ message: '게시물이 존재하지 않거나, 게시글 삭제는 본인이 작성한 게시글만 가능합니다.' });

    await Post.destroy({ where: { [Op.and]: [{ post_id: postId }, { user_id: id }] } });

    return res.status(201).json({ message: '정상 삭제되었습니다.' });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: '게시글 삭제를 실패하였습니다.' });
  }
});

module.exports = app;
