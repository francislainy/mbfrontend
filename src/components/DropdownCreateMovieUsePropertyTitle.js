import React from 'react';
import './MovieRow.css';
import {Dropdown, DropdownButton} from "react-bootstrap";

const DropdownCreateMovieUsePropertyTitle = ({list, selectedActorId, selectActorId, title}) => {
    return (
        <div>
            <DropdownButton variant="success"
                            title={
                                selectedActorId
                                    ? list.find((item) => item.id === selectedActorId).title
                                    : `Select ${title}`
                            }
                            onSelect={(eventKey) => selectActorId(eventKey)}>
                {list.map((item, index) => {
                    return (
                        <Dropdown.Item
                            key={index}
                            eventKey={item.id}
                            active={item.id === selectedActorId}>
                            {item.title}
                        </Dropdown.Item>
                    );
                })}
            </DropdownButton>
        </div>
    )
}

export default DropdownCreateMovieUsePropertyTitle;
