const axios = require('axios')
const BASE_URL = 'http://localhost:8081';

// const basicFetch = async (endpoint) =>

exports.getMovies = () => {
    // return axios.get(`${BASE_URL}/api/mb/movie`)
    return axios.request({
        method: "GET",
        baseURL: BASE_URL,
        url: `${BASE_URL}/api/mb/movie`,
        headers: {Accept: "application/json"},
    })
}

