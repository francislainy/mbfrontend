import React, {useEffect, useState} from 'react';
import '../../App.css'
import {Button} from "react-bootstrap";
import CustomAlert from "../CustomAlert";
import FilterMovieForm from "./FilterMovieForm";

const FilterMovie = ({showFilter, setShowFilter, filteredData, setFilteredData}) => {
    const [showFilterButton, setShowFilterButton] = useState(true)
    const [showSuccessAlert, setShowSuccessAlert] = useState(false)
    const [selectedActorId, selectActorId] = useState(null);
    const [selectedLocationId, selectLocationId] = useState(null);
    const [selectedRoomId, selectRoomId] = useState(null);
    const [error, setError] = useState(false)

    useEffect(() => {
            const timeId = setTimeout(() => {
                // After 3 seconds set the show value to false
                setShowSuccessAlert(false)
            }, 3000)

            return () => {
                clearTimeout(timeId)
            }
        },
        [showFilter, error]
    );

    function handleSubmit(e) {
        // const {character, pinyin} = e.target
        // let values = {
        //     character: {
        //         hanzi: character.value,
        //         pinyin: pinyin.value,
        //     },
        //     actor: {
        //         id: selectedActorId,
        //     },
        //     location: {
        //         id: selectedLocationId,
        //     },
        //     room: {
        //         id: selectedRoomId,
        //     }
        // }

        let values = {
            scene: "dabom"
        }

        setFilteredData(values)
    }

    const handleShowFilter = () => {
        setShowFilter(true)
        setShowFilterButton(false)
    }

    const handleHideFilter = () => {
        setShowFilter(false)
        setShowFilterButton(true)
    }

    return (
        <div>
            {showSuccessAlert ? <CustomAlert item={"Movie"} action={"created"} error={error}/> : null}
            <div>
                <div className="button-container">
                    {showFilterButton && <Button className="new-movie-button shadow-none" onClick={handleShowFilter}>Filter
                        Movie</Button>
                    }
                </div>
                {
                    showFilter ? <section style={{paddingBottom: '16px'}}>
                        <form method="post" onSubmit={handleSubmit}>
                            <div className="close-form-container">
                                <Button className="new-movie-button shadow-none"
                                        onClick={handleHideFilter}>X</Button>
                            </div>
                            <h2 style={{color: "#AAA"}}>Filter movie</h2>
                            <FilterMovieForm
                                showForm={showFilter}
                                selectActorId={selectActorId}
                                selectedActorId={selectedActorId}
                                selectedLocationId={selectedLocationId}
                                selectLocationId={selectLocationId}
                                selectRoomId={selectRoomId}
                                selectedRoomId={selectedRoomId}
                            />
                            <div>
                                <button className="btn btn-primary submit-button" type="submit"
                                        onSubmit={() => handleSubmit()}>Send
                                </button>
                            </div>
                        </form>
                    </section> : null
                }
            </div>
        </div>
    )
}

export default FilterMovie;
