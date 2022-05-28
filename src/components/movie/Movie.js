import React, {useEffect, useState} from 'react';
import '../../App.css'
import {getFilteredMovies} from "../../api"
import MovieTableContainer from "./MovieTableContainer/MovieTableContainer";
import CreateNewMovie from "./CreateNewMovie";
import FilterMovie from "./FilterMovie";

const Movie = () => {
    const [showForm, setShowForm] = useState(false)
    const [showFilter, setShowFilter] = useState(false)
    const [filteredData, setFilteredData] = useState({
        scene: "dabom"
    })
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

    // useEffect(() => {
    //     const loadAll = async () => {
    //         try {
    //             getMovies().then(response => setMovieList(response.data))
    //         } catch (e) {
    //             console.log(e + "error")
    //         }
    //     }
    //
    //     loadAll().then(r => console.log(r));
    // }, [showForm, showSuccessAlert]);

    useEffect(() => {
        const loadAll = async () => {
            try {
                console.log(filteredData)
                getFilteredMovies(filteredData).then(response => setMovieList(response.data))
            } catch (e) {
                console.log(e + "error")
            }
        }

        loadAll().then(r => console.log(r));
    }, [showForm, showFilter, filteredData, showSuccessAlert]);

    return (
        <div className="container">
            <CreateNewMovie
                movieList={movieList}
                setMovieList={setMovieList}
                setShowForm={setShowForm}
                showForm={showForm}
            />
            <FilterMovie
                movieList={movieList}
                setMovieList={setMovieList}
                filteredData={filteredData}
                setFilteredData={setFilteredData}
                setShowFilter={setShowFilter}
                showFilter={showFilter}
            />
            <section className="lists">
                <MovieTableContainer
                    movies={movieList.movies}
                    showSuccessAlert={showSuccessAlert}
                    setShowSuccessAlert={setShowSuccessAlert}/>
            </section>
        </div>
    )
}

export default Movie;
