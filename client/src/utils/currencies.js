import axios from "axios";

export default async function getCurrencies(){
    const data = await axios.get(`https://api.freecurrencyapi.com/v1/currencies?apikey=${process.env.REACT_CURRENCY_API_KEY}`);
    return data.data.data;
}