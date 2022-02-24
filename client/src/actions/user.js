import * as api from '../api';

export const getUserById = async (id) =>{
    const { data } = await api.getUserById(id);
    return data;
}