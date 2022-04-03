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

exports.getMovie = (id) => {
    return axios.request({
        method: "GET",
        baseURL: BASE_URL,
        url: `${BASE_URL}/api/mb/movie/${id}`,
        headers: {Accept: "application/json"},
    })
}


exports.createMovie = axiosParams => {
    const payload = axiosParams.payload
    return axios.request({
        method: "POST",
        baseURL: BASE_URL,
        url: `${BASE_URL}/api/mb/movie`,
        data: payload,
        headers: {Accept: "application/json"},
    })
}

exports.deleteMovie = axiosParams => {
    const id = axiosParams.id
    return axios.request({
        method: "DELETE",
        baseURL: BASE_URL,
        url: `${BASE_URL}/api/mb/movie/${id}`,
        headers: {Accept: "application/json"},
    })
}

exports.getActors = () => {
    return axios.request({
        method: "GET",
        baseURL: BASE_URL,
        url: `${BASE_URL}/api/mb/actor`,
        headers: {Accept: "application/json"},
    })
}

exports.getLocations = () => {
    return axios.request({
        method: "GET",
        baseURL: BASE_URL,
        url: `${BASE_URL}/api/mb/location`,
        headers: {Accept: "application/json"},
    })
}

exports.getRooms = () => {
    return axios.request({
        method: "GET",
        baseURL: BASE_URL,
        url: `${BASE_URL}/api/mb/room`,
        headers: {Accept: "application/json"},
    })
}
