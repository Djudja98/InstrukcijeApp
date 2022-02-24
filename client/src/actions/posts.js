import { FETCH_ALL, FETCH_BY_SEARCH, CREATE, UPDATE, DELETE, LIKE, DISLIKE,START_LOADING, END_LOADING, FETCH_POST, COMMENT, FETCH_BY_CREATOR } from '../constants/actionTypes';
import * as api from '../api';

//Action creators
//redux thunk omogucava da specifikujes dodatnu arrow funkciju koja vraca funkciju i moze da koristi async await sposobnosti, ovo fetch je asinhrono pa moras ovako, ovdje u sustini koristimo asinhronu funkciju iz apija fetch() koja vraca postove i ovdje ih dispacujemo kao akciju ka reduceru

export const getPost = (id) => async (dispatch) => {
    try{
        dispatch({ type: START_LOADING });
        // ovdje se odmah izvuklo data is responsa
        // const response = await api.fetchPosts(); 
        const { data } = await api.fetchPost(id);

        dispatch({ type: FETCH_POST, payload: data });
        dispatch({ type: END_LOADING});
    }catch(error){
        console.log(error);
    }
}

export const getPosts = (page) => async (dispatch) => {
    try{
        dispatch({ type: START_LOADING });
        // ovdje se odmah izvuklo data is responsa
        // const response = await api.fetchPosts(); 
        const { data } = await api.fetchPosts(page);

        dispatch({ type: FETCH_ALL, payload: data });
        dispatch({ type: END_LOADING});
    }catch(error){
        console.log(error);
    }
}

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try{
        dispatch({ type: START_LOADING });
        const { data: { data } } = await api.fetchPostsBySearch(searchQuery);
        dispatch({ type: FETCH_BY_SEARCH, payload: data});
        dispatch({ type: END_LOADING});
    }catch(error){
        console.log(error);
    }   
}

export const createPost = (post, history) => async (dispatch) =>{
    try{
        dispatch({ type: START_LOADING });
        const { data } = await api.createPost(post);
        history.push(`/posts/${data._id}`);

        dispatch ({ type: CREATE, payload: data});
        dispatch({ type: END_LOADING});
    }catch(error){
        console.log(error);
    }
}

export const updatePost = (id, post) => async (dispatch) =>{
    try{
       const { data } = await api.updatePost(id, post);
       dispatch({type: UPDATE, payload: data});
    }catch(error){
        console.log(error);
    }
}

export const deletePost = (id) => async (dispatch) =>{
    try{
        await api.deletePost(id);
        dispatch({type: DELETE, payload: id});
    }catch(error){
        console.log(error);
    }
}

export const likePost = (id) => async (dispatch) =>{
    try{
        const { data } = await api.likePost(id);
        dispatch({type: LIKE, payload: data});
    }catch(error){
        console.log(error);
    }
}

export const dislikePost = (id) => async (dispatch) =>{
    try{
        const { data } = await api.dislikePost(id);
        dispatch({type: DISLIKE, payload: data});
    }catch(error){
        console.log(error);
    }
}

export const commentPost = (value, id) => async (dispatch) =>{
    try{
       const { data } = await api.commentPost(value, id);
       dispatch({ type: COMMENT, payload: data});
       return data.comments;
    }catch(error){
        console.log(error);
    }
}

export const getPostsByCreator = (id) => async (dispatch) =>{
    try{
        dispatch({type: START_LOADING});
        const {data:{data}} = await api.fetchPostsByCreator(id);
        dispatch({ type: FETCH_BY_CREATOR, payload: {data}});
        dispatch({type: END_LOADING});
    }catch(error){
        console.log(error);
    }
}