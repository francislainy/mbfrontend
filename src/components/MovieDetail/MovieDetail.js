import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {getMovie} from "../../api";

const MovieDetail = () => {

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
            <div>
                {data && data.character.hanzi}
            </div>
        </div>
    )
}

export default MovieDetail;
