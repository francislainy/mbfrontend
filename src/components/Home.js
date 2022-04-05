import React, {useEffect, useState} from 'react';
import '../App.css'
import {getMovies} from "../api"
import MovieRow from "./MovieRow/MovieRow";
import CreateNewMovie from "./CreateNewMovie";

const Home = () => {
    const [showForm, setShowForm] = useState(false)
    const [showSuccessAlert, setShowSuccessAlert] = useState(false)
    const [movieList, setMovieList] = useState({
        movies: [
            {
                actor: {
                    id: "",
                },
                character: {
                    hanzi: "",
                    pinyin: "",
                    meaning: ""
                },
                room: {
                    id: "",
                    title: ""
                },
                scene: "",
                imageUrl: "",
                location: {
                    id: "",
                    title: ""
                }
            }
        ]
    })

    useEffect(() => {
        const loadAll = async () => {
            try {
                getMovies().then(response => setMovieList(response.data))
            } catch (e) {
                console.log(e + "error")
            }
        }

        loadAll().then(r => console.log(r));
    }, [showForm, showSuccessAlert]);

    return (
        <div className="container">
            <CreateNewMovie
                movieList={movieList}
                setMovieList={setMovieList}
                setShowForm={setShowForm}
                showForm={showForm}
            />
            <section className="lists">
                <MovieRow movies={movieList.movies} showSuccessAlert={showSuccessAlert}
                          setShowSuccessAlert={setShowSuccessAlert}/>
            </section>
        </div>
    )
}

export default Home;
