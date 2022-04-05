import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";

const Actor = () => {

    // const [data, setData] = useState()
    //
    // const {id} = useParams();
    //
    // useEffect(() => {
    //     const loadAll = async () => {
    //         try {
    //             getMovie(id).then(response => setData(response.data))
    //         } catch (e) {
    //             console.log(e + "error")
    //         }
    //     }
    //
    //     loadAll().then(r => console.log(r));
    // }, [])

    return (
        <div>
            <div>
                {/*{data && data.character.hanzi}*/}
                Actor
            </div>
        </div>
    )
}

export default Actor;
