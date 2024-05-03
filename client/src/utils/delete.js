import axios from "axios";

export default async function deleteProperty(path){
    try {
        const res = await axios.delete(`https://cashboard-f5x2.onrender.com/${path}`);
        console.log('deleted');

        return res.data.user;
    } catch (err) {
        console.error(err);
    }
}