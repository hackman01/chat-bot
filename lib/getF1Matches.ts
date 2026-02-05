import axios from "axios";
const getF1Matches = async () => {
    const res = await axios.get(`https://api.jolpi.ca/ergast/f1/2026/races/`)
    console.log(res.data);
    return {race: res.data.MRData.RaceTable.Races[0]};
}

export default getF1Matches;
