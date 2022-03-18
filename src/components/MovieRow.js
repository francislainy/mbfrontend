import React from 'react';
import './MovieRow.css';

export default ({title, items}) => {

    return (
        <div>
            <h2>{title}</h2>
            <h2>{items.movies.length}</h2>
            <div className="movieRow--listarea">
                {items.movies.length > 0 && items.movies.map((item, key) => (
                    <div>
                        <span>{`${item.pinyin} `}</span>
                        <span>{`${item.character} `}</span>
                        <span>{`${item.setLocation.title} `}</span>
                        <span>{`${item.actor.name} `}</span>
                        <span>{`${item.meaning} `}</span>
                        <span>{`${item.scene} `}</span>
                        <span>{`${item.imageUrl} `}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
