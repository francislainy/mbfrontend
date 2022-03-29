const API_BASE = 'http://localhost:8081';

const basicFetch = async (endpoint) => {
    const req = await fetch(`${API_BASE}${endpoint}`)
    return await req.json();
}

export default {
    getHomeList: async () => {
        return [
            {
                title: 'My Movies',
                items: await basicFetch(`/api/mb/movie`)
            },
        ]
    }
}
