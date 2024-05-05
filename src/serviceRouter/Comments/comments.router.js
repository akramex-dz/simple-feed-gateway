const axios = require('axios');

const BASE_URL = `${process.env.CONTENT_MANAGEMENT_SERVICE_URL}/comments`;
const API_KEY = process.env.CMS_API_KEY;

async function getCommentsByUserId(userId) {
  try {
    const response = await axios.get(`${BASE_URL}/user/${userId}`, {
      headers: {
        'x-api-key': API_KEY
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to get comments by user id ${userId}: ${error.message}`);
  }
}

async function getCommentsByPostId(postId) {
  try {
    const response = await axios.get(`${BASE_URL}/post/${postId}`, {
      headers: {
        'x-api-key': API_KEY
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to get comments by post id ${postId}: ${error.message}`);
  }
}

async function getCommentById(commentId) {
  try {
    const response = await axios.get(`${BASE_URL}/${commentId}`, {
      headers: {
        'x-api-key': API_KEY
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to get comment by id ${commentId}: ${error.message}`);
  }
}

async function createComment(commentData) {
  try {
    const response = await axios.post(`${BASE_URL}/`, commentData, {
      headers: {
        'x-api-key': API_KEY
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to create comment: ${error.message}`);
  }
}

async function updateCommentById(commentId, updatedData) {
  try {
    const response = await axios.put(`${BASE_URL}/${commentId}`, updatedData, {
      headers: {
        'x-api-key': API_KEY
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to update comment by id ${commentId}: ${error.message}`);
  }
}

async function deleteCommentById(commentId) {
  try {
    const response = await axios.delete(`${BASE_URL}/${commentId}`, {
      headers: {
        'x-api-key': API_KEY
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to delete comment by id ${commentId}: ${error.message}`);
  }
}

async function likeComment(commentId, userId) {
  try {
    const response = await axios.post(`${BASE_URL}/${commentId}/like`, { userId }, {
      headers: {
        'x-api-key': API_KEY
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to like comment by id ${commentId}: ${error.message}`);
  }
}

async function unlikeComment(commentId, userId) {
  try {
    const response = await axios.delete(`${BASE_URL}/${commentId}/unlike/${userId}`, {
      headers: {
        'x-api-key': API_KEY
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to unlike comment by id ${commentId}: ${error.message}`);
  }
}

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
