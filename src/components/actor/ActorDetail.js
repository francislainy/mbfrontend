import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {getActor} from "../../api";
import CustomAlert from "../CustomAlert";

const ActorDetail = () => {
    const {id} = useParams();

    let navigate = useNavigate();

    const [actor, setActor] = useState({
        id: '',
        name: ''
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
                getActor(id).then(response => {
                    setActor(response.data)
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
                    </div>
                </div>
            </div>
            }
        </div>
    )
};


export default ActorDetail;
