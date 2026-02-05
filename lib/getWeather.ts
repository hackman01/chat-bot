import axios from "axios";
const getWeather = async ({ location }: { location: string }) => {
    const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.OPENWEATHERMAP_API_KEY}`)
    return { weather: res.data.weather[0], temp: res.data.main.temp };
}

export default getWeather;


