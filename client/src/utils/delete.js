import axios from "axios";

export default async function deleteProperty(url){
    try {
        const res = await axios.delete(url);
        console.log('deleted');

        return res.data.user;
    } catch (err) {
        console.error(err);
    }
}