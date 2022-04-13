const path = require('path');
const {PactV3, MatchersV3} = require('@pact-foundation/pact/v3');
const {expect} = require('chai');
const {getLocation} = require("../api");
const {string, fromProviderState} = MatchersV3;

describe('Retrieve a location', () => {
    const provider = new PactV3({
        consumer: 'mbfrontend',
        provider: 'mbbackend',
        logLevel: 'trace',
        dir: path.resolve(process.cwd(), 'pacts'),
    });

    it('queries the backend service for the location details', () => {
        provider
            .given('A location exist with a matching id exists')
            .uponReceiving('a request to get the location details')
            .withRequest({
                method: 'GET',
                path: fromProviderState('/api/mb/location/${id}', '/api/mb/location/100'),
                headers: {Accept: 'application/json'},
            })
            .willRespondWith({
                status: 200,
                headers: {'Content-Type': 'application/json'},
                body: {
                    title: string('Test'),
                },
            });

        return provider.executeTest(async (mockserver) => {
            return getLocation(mockserver.url, '100')
                .then((result) => {
                    expect(result.status).to.equal(200);
                    expect(result.title).to.equal('Test');
                });
        });

    });
});
