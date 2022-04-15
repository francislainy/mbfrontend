import {render, screen} from '@testing-library/react';
import getAndSetupServer from './getAndSetupServer';
import App from "./App";
import {rest} from "msw";

window.scrollTo = jest.fn();

getAndSetupServer([
    rest.get(
        `http://localhost:8081/api/mb/movie`,
        async (req, res, ctx) =>
            res(ctx.status(200), ctx.json({
                    movies:
                        [
                            {
                                "id": "425ecfeb-f5a7-49a7-833a-6bcb6bc02698",
                                "scene": "anyScene",
                                "imageUrl": "anyImageUrl",
                                "character": {
                                    "id": "d956ff41-3e8f-4796-9e2d-87ff238dce59",
                                    "hanzi": "anyHanzi",
                                    "pinyin": "anyPinyin",
                                    "meaning": "anyMeaning"
                                },
                                "location": {
                                    "id": "1bfff94a-b70e-4b39-bd2a-be1c0f898589",
                                    "title": "anyLocation",
                                    "associatedPinyinSound": "anyPinyinSound"
                                },
                                "actor": {
                                    "id": "8c5874be-93aa-4bc1-ae72-a74bc7933095",
                                    "name": "anyActor"
                                },
                                "room": {
                                    "id": "3de88725-31bf-4156-bd5a-e63f4dd4daeb",
                                    "title": "anyRoom"
                                }
                            },
                        ]
                })
            ),
    )
]);

describe('Test App component    §: ', () => {

    afterAll(() => {
        jest.clearAllMocks();
    });

    test('renders button and mocked post in a table on button click', async () => {
        render(<App/>);
        await testTableHeaders();

        // const newMovieButton = screen.getByRole('heading', {name: /new movie/i});
        // userEvent.click(newMovieButton);
        // await screen.findByRole('heading', {name: /create new movie/i});
    });
});

async function testTableHeaders() {
    const pinyinHeader = screen.getByRole('columnheader', {name: /pinyin/i});
    expect(pinyinHeader).toBeInTheDocument();
    const characterHeader = screen.getByRole('columnheader', {name: /character/i});
    expect(characterHeader).toBeInTheDocument();
    const meaningHeader = screen.getByRole('columnheader', {name: /meaning/i});
    expect(meaningHeader).toBeInTheDocument();
    const actorHeader = screen.getByRole('columnheader', {name: /actor/i});
    expect(actorHeader).toBeInTheDocument();
    const locationHeader = screen.getByRole('columnheader', {name: /location/i});
    expect(locationHeader).toBeInTheDocument();
    const roomHeader = screen.getByRole('columnheader', {name: /room/i});
    expect(roomHeader).toBeInTheDocument();
    const sceneHeader = screen.getByRole('columnheader', {name: /scene/i});
    expect(sceneHeader).toBeInTheDocument();
    const imageHeader = screen.getByRole('columnheader', {name: /image url/i});
    expect(imageHeader).toBeInTheDocument();

    const cell = await screen.findByRole('cell', {name: /anyScene/i});
    expect(cell).toBeInTheDocument();

    expect(await screen.findByRole('cell', {name: /anyPinyin/i})).toBeInTheDocument();
    expect(await screen.findByRole('cell', {name: /anyHanzi/i})).toBeInTheDocument();
    expect(await screen.findByRole('cell', {name: /anyMeaning/i})).toBeInTheDocument();
    expect(await screen.findByRole('cell', {name: /anyActor/i})).toBeInTheDocument();
    expect(await screen.findByRole('cell', {name: /anyLocation/i})).toBeInTheDocument();
    expect(await screen.findByRole('cell', {name: /anyRoom/i})).toBeInTheDocument();
    expect(await screen.findByRole('cell', {name: /anyScene/i})).toBeInTheDocument();
    expect(await screen.findByRole('cell', {name: /anyImageUrl/i})).toBeInTheDocument();
}
