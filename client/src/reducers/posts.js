import { FETCH_ALL,FETCH_BY_SEARCH, CREATE, UPDATE, DELETE, LIKE,DISLIKE, START_LOADING, END_LOADING, FETCH_POST, COMMENT, FETCH_BY_CREATOR } from '../constants/actionTypes';
//reducer = (state =[], action) ovdje je state preimenovan u posts zbog lakseg koristenja

export default (state = {isLoading: true, posts: []}, action) =>{
    switch(action.type){
        case START_LOADING:
            return { ...state, isLoading: true};
        case END_LOADING:
            return { ...state, isLoading: false};
        case FETCH_ALL:
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
            };
        case FETCH_BY_SEARCH:
            return {
                ...state, posts: action.payload,
            };
        case FETCH_BY_CREATOR:
            return{
                ...state, posts:action.payload.data,
            };
        case FETCH_POST:
            return {
                ...state, post : action.payload,
            };
        case CREATE:
            return { ...state, posts: [...state.posts, action.payload] };
        case UPDATE:
            return { ...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post) };
        case DELETE:
            return { ...state, posts: state.posts.filter((post) => post._id !== action.payload) };
        case LIKE:
        case DISLIKE:
            return { ...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post) };
        case COMMENT:
            return { ...state, posts: state.posts.map((post) =>{
                // post koji je komentarisan
                if(post._id === action.payload._id){
                    return action.payload;
                }
                //ostali postovi 
                return post;
            })};
        default:
            return state;
    }
}