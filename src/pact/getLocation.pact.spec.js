import {Pact} from '@pact-foundation/pact';

const {PactV3, MatchersV3, XmlBuilder} = require('@pact-foundation/pact/v3');
const {regex, eachLike, fromProviderState} = MatchersV3;

const axios = require("axios");
axios.defaults.baseURL = "http://127.0.0.1:9999";
const port = 9999;
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

    describe('retrieving a location', () => {
        test('location exists', async () => {
            // set up Pact interactions
            const expectedLocation = {id: '10', title: 'a title'}

            await mockProvider.addInteraction({
                state: 'location exist',
                uponReceiving: 'a request to get a location',
                withRequest: {
                    method: 'GET',
                    path: '/api/mb/location/1bfff94a-b70e-4b39-bd2a-be1c0f898589',
                    query: {accountNumber: fromProviderState('${accountNumber}', '1bfff94a-b70e-4b39-bd2a-be1c0f898589')},
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
                    body: eachLike(expectedLocation),
                },
            });

            const locations = await axiosClient.request({
                method: "GET",
                url: `/mb/location/1bfff94a-b70e-4b39-bd2a-be1c0f898589`,
                headers: {Accept: "application/json"},
            });
            console.log("## locations", locations);

            // // assert that we got the expected response
            // expect(products).toStrictEqual([new Product(expectedProduct)]);
        });
    });
});
