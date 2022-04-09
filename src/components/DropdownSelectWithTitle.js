import React from 'react';
import './movie/MovieTableContainer/MovieTableContainer.css';
import {Dropdown, DropdownButton} from "react-bootstrap";

const DropdownSelectWithTitle = ({list, selectedId, selectId, title}) => {
    return (
        <div>
            <DropdownButton variant="custom"
                            title={
                                selectedId
                                    ? list.find((item) => item.id === selectedId).title
                                    : `Select ${title}`
                            }
                            onSelect={(eventKey) => selectId(eventKey)}>
                {list.map((item, index) => {
                    return (
                        <Dropdown.Item
                            key={index}
                            eventKey={item.id}
                            active={item.id === selectedId}>
                            {item.title}
                        </Dropdown.Item>
                    );
                })}
            </DropdownButton>
        </div>
    )
}

export default DropdownSelectWithTitle;
