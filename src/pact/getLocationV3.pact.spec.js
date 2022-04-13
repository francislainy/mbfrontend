const path = require('path');
const {PactV3, MatchersV3} = require('@pact-foundation/pact/v3');
const {expect} = require('chai');
const {getLocations} = require("../api");
const {string, fromProviderState} = MatchersV3;

describe('Transaction service - create a new transaction for an account', () => {
    const provider = new PactV3({
        consumer: 'TransactionService',
        provider: 'AccountService',
        logLevel: 'trace',
        dir: path.resolve(process.cwd(), 'pacts'),
    });

    it('queries the account service for the account details', () => {
        provider
            .given('Account Test001 exists', {accountRef: 'Test001'})
            .uponReceiving('a request to get the account details')
            .withRequest({
                method: 'GET',
                path: '/api/mb/location/findOneByLocationId',
                query: {locationId: fromProviderState('${locationId}', '100')},
                headers: {Accept: 'application/hal+json'},
            })
            .willRespondWith({
                status: 200,
                headers: {'Content-Type': 'application/hal+json'},
                body: {
                    title: string('Test'),
                },
            });

        return provider.executeTest(async (mockserver) => {
            await getLocations(mockserver.url);
            return getLocations()
                .then((result) => {
                    expect(result.title).to.equal('Test');
                });
        });
    });
});


// const locations = await axiosClient.request({
//             //     method: "GET",
//             //     url: `/mb/location/1bfff94a-b70e-4b39-bd2a-be1c0f898589`,
//             //     headers: {Accept: "application/json"},
//             // });
//             // console.log("## locations", locations);
