import React, {useEffect, useState} from 'react';
import './App.css'
import Tmdb from './Tmdb'
import MovieRow from "./components/MovieRow";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const App = () => {

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
                        location: {
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
            <nav className="navbar navbar-light navbar-expand-lg navigation-clean">
                <div className="container">
                    <a className="navbar-brand" href="#">Mandarim Movies</a>
                    <div id="navcol-2" className="collapse navbar-collapse">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <a className="nav-link active">My Movies</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link">Actors</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link">Locations</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link">Rooms</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <section className="lists">
                {movieList.map((item, key) => (
                    <MovieRow key={key} title={item.title} items={item.items}/>
                ))}
            </section>
        </div>
    )
}

export default App;
