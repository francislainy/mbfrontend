import {Pact} from '@pact-foundation/pact';
import {Matchers} from '@pact-foundation/pact';
const {eachLike, regex} = Matchers;

const axios = require("axios");
axios.defaults.baseURL = "http://127.0.0.1:8081";
const port = 8081;
const axiosClient = axios.create({
    baseURL: `http://127.0.0.1:${port}/api`,
});

const mockProvider = new Pact({
    port,
    consumer: "mbfrontend",
    provider: process.env.PACT_PROVIDER
        ? process.env.PACT_PROVIDER
        : "mbbackend",
    cors: true,
});

describe('API Pact test', () => {
    beforeAll(() => mockProvider.setup());
    afterEach(() => mockProvider.verify());
    afterAll(() => mockProvider.finalize());

    describe('retrieving movies', () => {
        test('movie exists', async () => {
            // set up Pact interactions
            const expectedMovie = {
                id: "602379f2-0fb4-4469-9c47-7c82d1a1c143",
                scene: "",
                imageUrl: "",
                "character": {
                    "id": "68f71799-c83c-4d49-a74f-acbd34723e2d",
                    "hanzi": "某",
                    "pinyin": "mou",
                    "meaning": "some"
                },
                "location": {
                    "id": "a76e1246-2ff6-4745-915f-fa6a250b4a58",
                    "title": "South London",
                    "associatedPinyinSound": "OU"
                },
                "actor": {
                    "id": "c029c44a-5d57-4314-9d84-e936b71b2791",
                    "name": "Jennie"
                },
                "room": {
                    "id": "64ab46f2-c3f3-4b24-8d68-8db73ca9d999",
                    "title": "Backyard"
                }
            }

            await mockProvider.addInteraction({
                state: 'movies exist',
                uponReceiving: 'a request to get all movies',
                withRequest: {
                    method: 'GET',
                    path: '/api/mb/movie/',
                    // headers: {
                    //     Authorization: like('Bearer 2019-01-14T11:34:18.045Z'),
                    // },
                },
                willRespondWith: {
                    status: 200,
                    headers: {
                        'Content-Type': regex({
                            generate: 'application/json; charset=utf-8',
                            matcher: 'application/json;?.*'
                        }),
                    },
                    body: eachLike(expectedMovie),
                },
            });

            const movies = await axiosClient.request({
                method: "GET",
                url: `/api/mb/movie/`,
                headers: {Accept: "application/json"},
            });
            console.log("## locations", movies);

            // // assert that we got the expected response
            // expect(products).toStrictEqual([new Product(expectedProduct)]);
        });
    });
});
