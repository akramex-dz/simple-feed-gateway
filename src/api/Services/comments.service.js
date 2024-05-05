const { commentsRouter } = require('../../serviceRouter/services.router');

const {
  getCommentsByUserId,
  getCommentsByPostId,
  getCommentById,
  createComment,
  updateCommentById,
  deleteCommentById,
  likeComment,
  unlikeComment,
} = commentsRouter;

module.exports = {
  getCommentsByUserId,
  getCommentsByPostId,
  getCommentById,
  createComment,
  updateCommentById,
  deleteCommentById,
  likeComment,
  unlikeComment,
};
