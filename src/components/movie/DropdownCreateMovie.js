import React from 'react';
import './MovieTableContainer/MovieTableContainer.css';
import {Dropdown, DropdownButton} from "react-bootstrap";

const DropdownCreateMovie = ({list, selectedId, selectId, title}) => {
    return (
        <div>
            <DropdownButton variant="custom"
                            title={
                                selectedId
                                    ? list.find((item) => item.id === selectedId).name
                                    : `Select ${title}`
                            }
                            onSelect={(eventKey) => selectId(eventKey)}>
                {list.map((item, index) => {
                    return (
                        <Dropdown.Item
                            key={index}
                            eventKey={item.id}
                            active={item.id === selectedId}>
                            {item.name}
                        </Dropdown.Item>
                    );
                })}
            </DropdownButton>
        </div>
    )
}

export default DropdownCreateMovie;
