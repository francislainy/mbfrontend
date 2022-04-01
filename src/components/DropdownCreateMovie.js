import React from 'react';
import './MovieRow.css';
import {Dropdown, DropdownButton} from "react-bootstrap";

const DropdownCreateMovie = ({actors, selectedActorId, selectActorId}) => {
    return (
        <div>
            <DropdownButton variant="success"
                            title={
                                selectedActorId
                                    ? actors.find((actor) => actor.id === selectedActorId).name
                                    : "Select Actor"
                            }
                            onSelect={(eventKey) => selectActorId(eventKey)}>
                {actors.map((actor, index) => {
                    return (
                        <Dropdown.Item
                            key={index}
                            eventKey={actor.id}
                            active={actor.id === selectedActorId}>
                            {actor.name}
                        </Dropdown.Item>
                    );
                })}
            </DropdownButton>
        </div>
    )
}

export default DropdownCreateMovie;
