import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {getMoviesForActor} from "../../api";
import CustomAlert from "../CustomAlert";

const ActorDetail = () => {
    const {id} = useParams();

    let navigate = useNavigate();

    const handleClick = (movieId) => {
        navigate(`../movie/${movieId}`)
    }

    const handleClickHanzi = (movieId) => {
        navigate(`../characters/`)
    }

    const [actor, setActor] = useState({
        id: '',
        name: ''
    })
    const [movieList, setMovieList] = useState({
        movies: [
            {
                id: "",
                scene: "",
                imageUrl: "",
                actor: {
                    id: "",
                },
                character: {
                    id: "",
                    hanzi: "",
                    pinyin: "",
                    meaning: ""
                },
                room: {
                    id: "",
                    title: ""
                },
                location: {
                    id: "",
                    title: ""
                }
            }
        ]
    })
    const [showSuccessAlert, setShowSuccessAlert] = useState(false)
    const [action, setAction] = useState()

    useEffect(() => {
            const timeId = setTimeout(() => {
                // After 3 seconds set the show value to false
                setShowSuccessAlert(false)
            }, 3000)

            return () => {
                clearTimeout(timeId)
            }
        },
        [actor]
    );

    useEffect(() => {
        const loadAll = async () => {
            try {
                getMoviesForActor(id).then(response => {
                    setMovieList(response.data)
                })
            } catch (e) {
                console.log(e + "error")
            }
        }

        loadAll().then();
    }, [])

    return (
        <div>
            {actor &&
            <div className="container">
                {showSuccessAlert ? <CustomAlert item={"Movie"} action={action} error={null}/> : null}
                <div className="row" style={{marginTop: "15px"}}>
                    <div className="col-7">
                        <div className="row">
                            <div className="col-6">
                                <div style={{marginTop: "60px", alignItems: "center"}}>
                                    <p style={{textAlign: "center", fontSize: "70px"}}>{actor.name}</p>
                                </div>
                            </div>
                        </div>
                        {movieList.movies.length > 0 && <div className="movieRow--listarea">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th>Movie Id</th>
                                    <th>Hanzi</th>
                                    <th>Pinyin</th>
                                    <th>Scene</th>
                                </tr>
                                </thead>
                                {movieList.movies.length > 0 && movieList.movies.map((movie, key) => (
                                    <tbody className="table-light">
                                    <tr>
                                        <td style={{cursor: 'pointer'}} onClick={() => handleClick(movie.id)}>{`${movie.id}`} </td>
                                        <td style={{cursor: 'pointer'}} onClick={() => handleClickHanzi(movie.character.id)}>{`${movie.character.hanzi}`} </td>
                                        <td>{`${movie.character.pinyin}`} </td>
                                        <td>{`${movie.scene}`} </td>
                                    </tr>
                                    </tbody>
                                ))}
                            </table>
                        </div>
                        }
                    </div>
                </div>
            </div>
            }
        </div>
    )
};


export default ActorDetail;
