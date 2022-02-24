import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000'});

//funkcija koja ce se primjenjivati na svaki request
API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
});

export const createReport = (newReport) => API.post('/reports', newReport);

export const createRequest = (newRequest) => API.post('/request', newRequest);

export const getRequests = (id) => API.get(`/request/${id}`);

export const deleteRequest = (id) => API.delete(`/request/${id}`);

export const updateRequest = (id, data) => API.patch(`/request/${id}`, data);

export const updateUser = (id, data) => API.patch(`/user/${id}`, data);

export const getUserById = (id) => API.get(`/user/${id}`);

export const getUserPictureById = (id) => API.get(`/user/img/${id}`);

export const createConversation = (conversation) => API.post('/conversations', conversation);

export const getConversation = (id) => API.get(`/conversations/${id}`);

export const fetchPost = (id) => API.get(`/posts/${id}`);

export const fetchPosts = (page) => API.get(`/posts?page=${page}`);

export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`)

export const fetchPostsByCreator = (id) => API.get(`/posts/profile?id=${id}`);

export const createPost = (newPost) => API.post('/posts', newPost);

export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`,updatedPost);

export const deletePost = (id) => API.delete(`/posts/${id}`);

export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

export const dislikePost = (id) => API.patch(`/posts/${id}/dislikePost`);

export const commentPost = (value, id) => API.post(`/posts/${id}/commentPost`, { value });

export const signIn = (formData) => API.post('/user/signin', formData);

export const signUp = (formData) => API.post('/user/signup', formData);