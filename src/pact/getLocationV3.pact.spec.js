const path = require('path');
const {PactV3, MatchersV3} = require('@pact-foundation/pact/v3');
const {expect} = require('chai');
const {getLocation} = require("../api");
const {string, fromProviderState} = MatchersV3;



describe('Transaction service - create a new transaction for an account', () => {
    const provider = new PactV3({
        consumer: 'TransactionService',
        provider: 'AccountService',
        logLevel: 'trace',
        dir: path.resolve(process.cwd(), 'pacts'),
    });

    const id = "anyId"

    it('queries the account service for the account details', () => {
        provider
            .given('Account Test001 exists')
            .uponReceiving('a request to get the account details')
            .withRequest({
                method: 'GET',
                // path: '/api/mb/location/id',
                // path:  {'/api/mb/location/id': fromProviderState('${id}', '100')},
                path: fromProviderState('/api/mb/location/${id}', '/api/mb/location/100'),
                // query: {id: fromProviderState('${id}', '100')}, //this should be appended to the path instead
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
            return getLocation(mockserver.url, '100')
                .then((result) => {
                    expect(result.title).to.equal('Test');
                });
        });

    });
});

// const locations = await axiosClient.request({
//     method: "GET",
//     url: `/mb/location/1bfff94a-b70e-4b39-bd2a-be1c0f898589`,
//     headers: {Accept: "application/json"},
// });
// console.log("## locations", locations);
