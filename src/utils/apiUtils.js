// utils/apiUtils.js
const BASE_URL = 'https://mail-box-938e4-default-rtdb.asia-southeast1.firebasedatabase.app';

export const createUserKey = (email) => email?.replace(/[@.]/g, '');

export const createApiUrl = (userKey, endpoint, id = null) => {
  const basePath = `${BASE_URL}/users/${userKey}/${endpoint}`;
  return id ? `${basePath}/${id}.json` : `${basePath}.json`;
};

export const deleteEmail = async (userKey, endpoint, id) => {
  const response = await fetch(createApiUrl(userKey, endpoint, id), {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error(`Failed to delete ${endpoint} email`);
  }
  
  return response;
};

export const updateEmailReadStatus = async (userKey, id, emailData) => {
  const response = await fetch(createApiUrl(userKey, 'inbox', id), {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...emailData, check: false }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to update read status');
  }
  
  return response;
};