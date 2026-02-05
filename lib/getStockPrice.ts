import axios from "axios";

const getStockPrice = async ({ company }: { company: string }) => {
    const res = await axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${company}&apikey=${process.env.ALPHAVANTAGE_API_KEY}`)
    return { stock: res.data["Global Quote"]["01. symbol"], price: res.data["Global Quote"]["05. price"] };
}

export default getStockPrice;