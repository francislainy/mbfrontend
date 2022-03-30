const axios = require('axios')
const BASE_URL = 'http://localhost:8081';

exports.getMovies = () => {
    return axios.request({
        method: "GET",
        baseURL: BASE_URL,
        url: `${BASE_URL}/api/mb/movie`,
        headers: {Accept: "application/json"},
    })
}

