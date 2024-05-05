const axios = require('axios');

const BASE_URL = `${process.env.CONTENT_MANAGEMENT_SERVICE_URL}/posts`;
const API_KEY = process.env.CMS_API_KEY;

async function getAllPosts() {
  try {
    const response = await axios.get(`${BASE_URL}/`, {
      headers: {
        'x-api-key': API_KEY
      }
    });
    const posts = response.data;
    return posts;
  } catch (error) {
    throw new Error(`Failed to get all posts: ${error.message}`);
  }
}

async function getPostById(postId) {
  try {
    const response = await axios.get(`${BASE_URL}/${postId}`, {
      headers: {
        'x-api-key': API_KEY
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to get post by id ${postId}: ${error.message}`);
  }
}

async function getPostsByUserId(userId) {
  try {
    const response = await axios.get(`${BASE_URL}/user/${userId}`, {
      headers: {
        'x-api-key': API_KEY
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to get posts by user id ${userId}: ${error.message}`);
  }
}

async function getPostsByUserIds(userIds) {
  try {
    const response = await axios.post(`${BASE_URL}/users`, { userIds }, {
      headers: {
        'x-api-key': API_KEY
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to get posts by user ids ${userIds}: ${error.message}`);
  }
}

async function createPost(newPost) {
  try {
    const response = await axios.post(`${BASE_URL}/`, newPost, {
      headers: {
        'x-api-key': API_KEY
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to create post: ${error.message}`);
  }
}

async function updatePostById(postId, updatedPost) {
  try {
    const response = await axios.put(`${BASE_URL}/${postId}`, updatedPost, {
      headers: {
        'x-api-key': API_KEY
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to update post by id ${postId}: ${error.message}`);
  }
}

async function deletePostById(postId) {
  try {
    const response = await axios.delete(`${BASE_URL}/${postId}`, {
      headers: {
        'x-api-key': API_KEY
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to delete post by id ${postId}: ${error.message}`);
  }
}

async function likePost(postId, userId) {
  try {
    const response = await axios.post(`${BASE_URL}/${postId}/like`, { userId }, {
      headers: {
        'x-api-key': API_KEY
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to like post by id ${postId}: ${error.message}`);
  }
}

async function unlikePost(postId, userId) {
  try {
    const response = await axios.delete(`${BASE_URL}/${postId}/unlike/${userId}`, {
      headers: {
        'x-api-key': API_KEY
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to unlike post by id ${postId}: ${error.message}`);
  }
}

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
