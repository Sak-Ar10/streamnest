import { API_BASE_URL } from '../config';

class ApiError extends Error {
  constructor(status, data) {
    super(data?.error?.message || 'An error occurred');
    this.status = status;
    this.data = data;
  }
}

export const apiClient = async (endpoint, { body, ...customConfig } = {}) => {
  const headers = { 'Content-Type': 'application/json' };
  
  const config = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  
  let data;
  try {
    data = await response.json();
  } catch (err) {
    // Non-JSON response
    if (!response.ok) {
      throw new ApiError(response.status, { error: { message: response.statusText } });
    }
    return null;
  }

  if (response.ok) {
    return data;
  }

  throw new ApiError(response.status, data);
};
