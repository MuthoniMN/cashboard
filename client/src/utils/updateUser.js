import axios from 'axios';

export default async function updateCurrentUser(id){
    const res = await axios.get(`${process.env.REACT_BACKEND_API}/user/${id}`);

    return res.data;
}