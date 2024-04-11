import axios from 'axios';

export default async function updateCurrentUser(id){
    const res = await axios.get(`http://localhost:5000/user/${id}`);

    return res.data;
}