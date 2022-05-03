const path = require('path');
const {PactV3, MatchersV3} = require('@pact-foundation/pact/v3');
const {expect} = require('chai');
const {getMovies} = require("../api");
// const {uuid, eachLike} = require("@pact-foundation/pact/src/dsl/matchers");
const {string, uuid, eachLike} = MatchersV3;

describe('Retrieve a movie', () => {
    const provider = new PactV3({
        consumer: 'MY_CONSUMER',
        provider: 'MY_PROVIDER',
        logLevel: 'trace',
        dir: path.resolve(process.cwd(), 'pacts'),
    });

    it('queries the backend service for the movie details', () => {
        provider
            .given('A request to retrieve a list of movies')
            .uponReceiving('A request to retrieve a list of movies')
            .withRequest({
                method: 'GET',
                path: '/api/mb/movie',
                headers: {Accept: 'application/json'},
            })
            .willRespondWith({
                status: 200,
                headers: {'Content-Type': 'application/json'},
                body:
                    {
                        movies:
                            eachLike({
                                id: "602379f2-0fb4-4469-9c47-7c82d1a1c143",
                                scene: "",
                                imageUrl: "",
                                character: {
                                    id: uuid("68f71799-c83c-4d49-a74f-acbd34723e2d"),
                                    hanzi: string("某"),
                                    pinyin: string("mou"),
                                    meaning: string("some")
                                },
                                location: {
                                    id: uuid("a76e1246-2ff6-4745-915f-fa6a250b4a58"),
                                    title: string("South London"),
                                    associatedPinyinSound: string("OU")
                                },
                                actor: {
                                    id: uuid("c029c44a-5d57-4314-9d84-e936b71b2791"),
                                    name: string("Jennie")
                                },
                                room: {
                                    id: uuid("64ab46f2-c3f3-4b24-8d68-8db73ca9d999"),
                                    title: string("Backyard")
                                }
                            })
                    },
            });

        return provider.executeTest(async (mockserver) => {
            return getMovies(mockserver.url, '100')
                .then((result) => {
                    expect(result.status).to.equal(200);
                    expect(result.title).to.equal('Test');
                });
        });

    });
});
