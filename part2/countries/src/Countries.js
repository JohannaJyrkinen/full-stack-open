import axios from "axios";

const baseUrl = 'https://restcountries.com/v3.1/all?fields=name,flags,capital,languages,area,latlng'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

export default { getAll }