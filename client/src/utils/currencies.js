import axios from "axios";

export default async function getCurrencies(){
    const data = await axios.get(`${process.env.REACT_CURRENCY_API_URL}${process.env.REACT_CURRENCY_API_KEY}`);
    return data.data.data;
}