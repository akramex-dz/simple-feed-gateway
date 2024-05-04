const { postsRouter } = require('../../serviceRouter/services.router');

const {
  getAllPosts,
  getPostById,
  getPostsByUserId,
  getPostsByUserIds,
  createPost,
  updatePostById,
  deletePostById,
  likePost,
  unlikePost,
} = postsRouter;

module.exports = {
  getAllPosts,
  getPostById,
  getPostsByUserId,
  getPostsByUserIds,
  createPost,
  updatePostById,
  deletePostById,
  likePost,
  unlikePost,
};
