import React from 'react';
import './MovieRow.css';

export default ({title, items}) => {

    return (
        <div>
            <h2>{title}</h2>
            <div className="movieRow--listarea">
                {items.results.length > 0 && items.results.map((item, key) => (
                    <div>
                        <p>{`${item.poster_path}`}</p>
                        <p>{`${item.pinyin}`}</p>
                        <p>{`${item.character}`}</p>
                        <p>{`${item.location}`}</p>
                        <p>{`${item.actor}`}</p>
                        <p>{`${item.meaning}`}</p>
                        <p>{`${item.scene}`}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
