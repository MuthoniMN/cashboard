import axios from 'axios';

export default async function updateCurrentUser(id) {
    console.log(process.env.REACT_APP_BACKEND_API);
    const res = await axios.get(`${process.env.REACT_APP_BACKEND_API}/user/${id}`);

    return res.data;
}