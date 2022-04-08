import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {getMovie} from "../../../api";
import {Button} from "react-bootstrap";
import './MovieDetail.css'
import DropdownCreateMovieUsePropertyTitle from "../DropdownCreateMovieUsePropertyTitle";
import sample_movie from './sample_movie.jpeg';

const MovieDetail = () => {

    const [selectedLocationId, selectLocationId] = useState(null);

    const [locationList, setLocationList] = useState({
        locations: [
            {
                id: 'aa',
                title: 'aaa'
            },
        ]
    })

    const [data, setData] = useState()

    const {id} = useParams();

    useEffect(() => {
        const loadAll = async () => {
            try {
                getMovie(id).then(response => setData(response.data))
            } catch (e) {
                console.log(e + "error")
            }
        }

        loadAll().then(r => console.log(r));
    }, [])

    return (
        <div>
            {data &&
            <div className="container" style={{background: "![](../../../sample_movie.jpeg)"}}>
                <div className="row" style={{marginTop: "15px"}}>
                    <div style={{textAlign: "end"}}>
                        <Button>See on Mandarin Blueprint</Button>
                    </div>
                    <div className="col-7">
                        <div className="row">
                            <div className="col-6">
                                <div style={{marginTop: "60px", alignItems: "center"}}>
                                    <p style={{textAlign: "center", fontSize: "70px"}}>{data.character.pinyin}</p>
                                    <h1 style={{textAlign: "center", fontSize: "300px", marginTop: "-50px"}}>{data.character.hanzi}</h1>
                                    <textarea rows={4} cols={64}/>
                                </div>
                            </div>
                            <div className="col-6" style={{marginTop: "170px", width: "30%", height: "100px"}}>
                                <div className="dropdown">
                                    <DropdownCreateMovieUsePropertyTitle
                                        title="actor"
                                        list={locationList.locations}
                                        selectId={selectLocationId}
                                        selectedId={selectedLocationId}
                                    />
                                </div>
                                <div className="dropdown">
                                    <DropdownCreateMovieUsePropertyTitle
                                        title="location"
                                        list={locationList.locations}
                                        selectId={selectLocationId}
                                        selectedId={selectedLocationId}
                                    />
                                </div>
                                <div className="dropdown">
                                    <DropdownCreateMovieUsePropertyTitle
                                        title="room"
                                        list={locationList.locations}
                                        selectId={selectLocationId}
                                        selectedId={selectedLocationId}
                                    />
                                </div>
                            </div>
                            <div style={{marginTop: "16px"}}>
                                <Button className="btn-primary" style={{marginRight: "56px"}}>Save</Button>
                                <Button className="btn-danger">Delete Movie</Button>
                            </div>
                        </div>
                    </div>
                    <div className="col-5" style={{marginTop: "150px"}} >
                        <img src={sample_movie} width={"100%"}/>
                    </div>
                </div>
            </div>
            }
        </div>
    )
};


export default MovieDetail;
