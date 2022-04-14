const path = require('path');
const {PactV3, MatchersV3} = require('@pact-foundation/pact/v3');
const {expect} = require('chai');
const {deleteCourseWorkApi} = require("../api");
const {fromProviderState} = MatchersV3;

describe('Delete a course work item', () => {
    const provider = new PactV3({
        consumer: 'Ed UI',
        provider: 'Viaduct',
        logLevel: 'trace',
        dir: path.resolve(process.cwd(), 'pacts'),
    });

    const mockCourseId = '476794168462';
    const mockCourseWorkId = '481002261081';

    const requestBodyParameters = {
        client: 'googleclassroom',
        path: '/passthrough',
        requestUrl: fromProviderState('/v1/courses/${courseId}/courseWork/{courseWorkId}', '/v1/courses/476794168462/courseWork/481002261081'),
        requestHttpVerb: 'DELETE',
        body: null,
        headers: {},
        pathVariables: {},
        query: null,
    };

    it('queries the backend service for the course work details', () => {
        provider
            .given('A Teacher can delete a course work item')
            .uponReceiving('a request to delete a course work item')
            .withRequest({
                method: 'POST',
                path: '/passthrough',
                headers: {Accept: 'application/json'},
            })
            .willRespondWith({
                status: 200,
                headers: {'Content-Type': 'application/json'},
                body: requestBodyParameters
            });

        return provider.executeTest(async (mockserver) => {
            return deleteCourseWorkApi(mockserver.url)
                .then((result) => {
                    expect(result.status).to.equal(200);
                });
        });

    });
});
