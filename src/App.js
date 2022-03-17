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
                results: [
                    {
                        poster_path: "any",
                        pinyin: "xī",
                        character: "西",
                        location: "Childhood home",
                        actor: "Shakira",
                        room: "Bedroom",
                        meaning: "West",
                        scene: "Kanye West talking to Shakira outside the front entrance"
                    }
                ]
            }
        }
    ]

    useEffect(() => {
        const loadAll = async () => {
            let list = await Tmdb.getHomeList();
            console.log(list)
            setMovieList(sampleList)
        }

        loadAll();
    }, []);

    return (
        <div className="page">
            Header
            Destaque
            As listas
            Rodape
            <section className="lists">
                {movieList.map((item, key) => (
                    <MovieRow key={key} title={item.title} items={item.items}/>
                ))}
            </section>
        </div>
    )
}
