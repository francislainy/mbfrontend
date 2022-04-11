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

exports.updateMovie = axiosParams => {
    const id = axiosParams.id
    const payload = axiosParams.payload
    return axios.request({
        method: "PUT",
        baseURL: BASE_URL,
        url: `${BASE_URL}/api/mb/movie/${id}`,
        data: payload,
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

exports.createActor = axiosParams => {
    const payload = axiosParams.payload
    return axios.request({
        method: "POST",
        baseURL: BASE_URL,
        url: `${BASE_URL}/api/mb/actor`,
        data: payload,
        headers: {Accept: "application/json"},
    })
}

exports.deleteActor = axiosParams => {
    const id = axiosParams.id
    return axios.request({
        method: "DELETE",
        baseURL: BASE_URL,
        url: `${BASE_URL}/api/mb/actor/${id}`,
        headers: {Accept: "application/json"},
    })
}

exports.getLocations = (baseUrl = BASE_URL) => {
    return axios.request({
        method: "GET",
        baseURL: baseUrl,
        url: `${BASE_URL}/api/mb/location`,
        headers: {Accept: "application/json"},
    })
}

exports.createLocation = axiosParams => {
    const payload = axiosParams.payload
    return axios.request({
        method: "POST",
        baseURL: BASE_URL,
        url: `${BASE_URL}/api/mb/location`,
        data: payload,
        headers: {Accept: "application/json"},
    })
}

exports.deleteLocation = axiosParams => {
    const id = axiosParams.id
    return axios.request({
        method: "DELETE",
        baseURL: BASE_URL,
        url: `${BASE_URL}/api/mb/location/${id}`,
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

exports.createRoom = axiosParams => {
    const payload = axiosParams.payload
    return axios.request({
        method: "POST",
        baseURL: BASE_URL,
        url: `${BASE_URL}/api/mb/room`,
        data: payload,
        headers: {Accept: "application/json"},
    })
}

exports.deleteRoom = axiosParams => {
    const id = axiosParams.id
    return axios.request({
        method: "DELETE",
        baseURL: BASE_URL,
        url: `${BASE_URL}/api/mb/room/${id}`,
        headers: {Accept: "application/json"},
    })
}

exports.getCharacters = () => {
    return axios.request({
        method: "GET",
        baseURL: BASE_URL,
        url: `${BASE_URL}/api/mb/character`,
        headers: {Accept: "application/json"},
    })
}

exports.createCharacter = axiosParams => {
    const payload = axiosParams.payload
    return axios.request({
        method: "POST",
        baseURL: BASE_URL,
        url: `${BASE_URL}/api/mb/character`,
        data: payload,
        headers: {Accept: "application/json"},
    })
}

exports.deleteCharacter = axiosParams => {
    const id = axiosParams.id
    return axios.request({
        method: "DELETE",
        baseURL: BASE_URL,
        url: `${BASE_URL}/api/mb/character/${id}`,
        headers: {Accept: "application/json"},
    })
}
