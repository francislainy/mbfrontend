import React, {useEffect, useState} from 'react';
import './App.css'
import Tmdb from './Tmdb'
import MovieRow from "./components/MovieRow";

export default () => {

    const [movieList, setMovieList] = useState([])

    const sampleList = [
        {
            title: "a",
            items: {
                movies: [
                    {
                        actor: {
                            id: "1bfff94a-b70e-4b39-bd2a-be1c0f898589",
                            name: "Shakira"
                        },
                        character: "西",
                        meaning: "West",
                        pinyin: "xī",
                        imageUrl: "anyUrl",
                        room: {
                            id: "1bfff94a-b70e-4b39-bd2a-be1c0f898589",
                            title: "Bedroom"
                        },
                        scene: "Kanye West talking to Shakira outside the front entrance",
                        setLocation: {
                            id: "1bfff94a-b70e-4b39-bd2a-be1c0f898589",
                            title: "Childhood home"
                        }
                    }
                ]
            }
        }
    ]

    useEffect(() => {
        const loadAll = async () => {
            let list = await Tmdb.getHomeList();
            console.log(list)
            setMovieList(list)
        }

        loadAll();
    }, []);

    return (
        <div className="page">
            Header
            <section className="lists">
                {movieList.map((item, key) => (
                    <MovieRow key={key} title={item.title} items={item.items}/>
                ))}
            </section>
        </div>
    )
}
