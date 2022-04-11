import { Pact } from '@pact-foundation/pact';
// import { API } from './api';
import { Matchers } from '@pact-foundation/pact';
import {getLocations} from "../api";
const { eachLike, regex } = Matchers;

const mockProvider = new Pact({
    consumer: 'pactflow-example-consumer',
    provider: process.env.PACT_PROVIDER ? process.env.PACT_PROVIDER : 'pactflow-example-provider',
});

describe('API Pact test', () => {
    beforeAll(() => mockProvider.setup());
    afterEach(() => mockProvider.verify());
    afterAll(() => mockProvider.finalize());

    describe('retrieving locations', () => {
        test('location exists', async () => {
            // set up Pact interactions
            const expectedLocation = { id: '10', title: 'a title' }

            await mockProvider.addInteraction({
                state: 'locations exist',
                uponReceiving: 'a request to get all locations',
                withRequest: {
                    method: 'GET',
                    path: '/api/mb/location',
                    // headers: {
                    //     Authorization: like('Bearer 2019-01-14T11:34:18.045Z'),
                    // },
                },
                willRespondWith: {
                    status: 200,
                    headers: {
                        'Content-Type': regex({generate: 'application/json; charset=utf-8', matcher: 'application/json;?.*'}),
                    },
                    body: eachLike(expectedLocation),
                },
            });

            // const api = new API(mockProvider.mockService.baseUrl);

            // make request to Pact mock server
            const locations = await getLocations(mockProvider.mockService.baseUrl)

            // // assert that we got the expected response
            // expect(products).toStrictEqual([new Product(expectedProduct)]);
        });
    });
});
