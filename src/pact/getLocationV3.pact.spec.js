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

    it('queries the account service for the account details', () => {
        provider
            .given('Account Test001 exists', {accountRef: 'Test001'})
            .uponReceiving('a request to get the account details')
            .withRequest({
                method: 'GET',
                path: '/api/mb/location/findOneById',
                query: {locationId: fromProviderState('${id}', '100')},
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
            await getLocation(mockserver.url);
            return getLocation()
                .then((result) => {
                    expect(result.title).to.equal('Test');
                });
        });
    });
});
