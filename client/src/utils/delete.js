import axios from "axios";
import updateCurrentUser from '../../utils/updateUser';

export default async function deleteProperty(url){
    try {
        await axios.delete(url);
        console.log('deleted');

        let user = await updateCurrentUser(currentUser._id);

        setCurrentUser(user);
        console.log(currentUser);
    } catch (err) {
        console.error(err);
    }
}