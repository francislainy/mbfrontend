const API_KEY = '3178e470764104af3454f4c7b542f2fb';
// const API_BASE = 'https://api.themoviedb.org/3';
const API_BASE = 'http://localhost:8081';

const basicFetch = async (endpoint) => {
    const req = await fetch(`${API_BASE}${endpoint}`)
    return await req.json();
}

export default {
    getHomeList: async () => {
        return [
            {
                slug: 'originals',
                title: 'Originais do Netflix',
                items: await basicFetch(`/api/mb/movie`)
            },
        ]
    }
}
