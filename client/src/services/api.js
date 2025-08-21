import axios from 'axios';

// Create an instance of axios
const api = axios.create({
  baseURL: '/api', // The proxy will handle redirecting this to our backend
});

/* 
  This is a request interceptor. It's a function that runs BEFORE any request is sent.
  Here, we'll check if we have a token in localStorage, and if so,
  we'll add it to the Authorization header.
*/
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// --- Authentication Endpoints ---
export const registerUser = (userData) => api.post('/auth/register', userData);
export const loginUser = (userData) => api.post('/auth/login', userData);

// --- Transcription Endpoints ---
export const uploadAudio = (formData) => {
    return api.post('/transcripts/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        // Optional: Add progress tracking
        onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            console.log(`Upload Progress: ${percentCompleted}%`);
            // We can pass a callback here to update the UI
        },
    });
};

export const getHistory = () => api.get('/transcripts');


export default api;