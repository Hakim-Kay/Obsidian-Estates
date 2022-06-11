import axios from "axios";

export const baseUrl = "https://bayut.p.rapidapi.com"


export const fetchApi = async (url) => { //Fetches the data from the API 
    const { data } = await axios.get((url), {
        headers: {
            'X-RapidAPI-Key': '0156b25b5bmshe191ce36d96f91fp13a21ajsna5a24a827532',
            'X-RapidAPI-Host': 'bayut.p.rapidapi.com'
        }
    });
    return data;
} 