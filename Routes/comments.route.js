const express = require('express');
const app = express.Router();

const authMiddleware = require('../middlewares/Validations/authValidation');
const { createValidation, updateValidation, deleteValidation, readValidation } = require('../middlewares/Validations/commentsValidation');

const { Comment } = require('../models');

/* 댓글 목록 조회 */
app.get('/posts/:postId/comments', readValidation, async (req, res) => {
  try {
    const { postId } = req.params;
    return res.status(201).json({ comments: await Comment.findAll({ where: { post_id: postId } }) });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: '댓글 목록 조회를 실패하였습니다.' });
  }
});

/* 댓글 생성 */
app.post('/posts/:postId/comments/', authMiddleware, createValidation, async (req, res) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;
    const { id } = res.locals.user;

    await Comment.create({ post_id: postId, user_id: id, content });

    return res.status(201).json({ message: '댓글이 정상 등록되었습니다.' });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: '댓글 등록에 실패하였습니다.' });
  }
});

/* 댓글 업데이트 */
app.put('/posts/:postId/comments/:commentId', authMiddleware, updateValidation, async (req, res) => {
  try {
    const { postId, commentId } = req.params;
    const { content } = req.body;
    const { id } = res.locals.user;

    const authority = await Comment.findOne({ where: { post_id: postId, comment_id: commentId, user_id: id } });
    if (!authority) return res.status(412).json({ message: '댓글이 존재하지 않거나, 댓글 수정은 본인이 작성한 댓글만 가능합니다.' });

    await Comment.update({ content }, { where: { post_id: postId, comment_id: commentId, user_id: id } });

    return res.status(201).json({ message: '정상 수정되었습니다.' });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: '댓글 수정을 실패하였습니다.' });
  }
});

/* 댓글 삭제 */
app.delete('/posts/:postId/comments/:commentId', authMiddleware, deleteValidation, async (req, res) => {
  try {
    const { postId, commentId } = req.params;
    const { id } = res.locals.user;

    const authority = await Comment.findOne({ where: { post_id: postId, comment_id: commentId, user_id: id } });
    if (!authority) return res.status(412).json({ message: '댓글이 존재하지 않거나, 댓글 삭제는 본인이 작성한 댓글만 가능합니다.' });

    await Comment.destroy({ where: { post_id: postId, comment_id: commentId, user_id: id } });

    return res.status(201).json({ message: '정상 삭제되었습니다.' });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: '댓글 삭제에 실패하였습니다.' });
  }
});

module.exports = app;
