import axios from 'axios';

export default async function updateCurrentUser(id) {
    const res = await axios.get(`https://cashboard-f5x2.onrender.com/user/${id}`);

    return res.data;
}