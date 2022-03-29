import React from 'react';
import './MovieRow.css';

const MovieRow = ({title, items}) => {
    return (
        <div>
            <h2>{title}</h2>
            {/*<h2>{items.movies.length}</h2>*/}
            <div className="movieRow--listarea">
                <table className="table table-bordered table-dark">
                    <thead>
                    <th>Pinyin</th>
                    <th>Character</th>
                    <th>Location</th>
                    <th>Actor</th>
                    <th>Meaning</th>
                    <th>Scene</th>
                    <th>Image Url</th>
                    </thead>
                    {items.movies.length > 0 && items.movies.map((item, key) => (
                        <tbody className="table-light">
                        <tr>
                            <td>{`${item.character.pinyin}`}</td>
                            <td>{`${item.character.hanzi}`}</td>
                            <td>{`${item.location.title}`}</td>
                            <td>{`${item.actor.name}`}</td>
                            <td>{`${item.character.meaning}`}</td>
                            <td>{`${item.scene}`}</td>
                            <td>{`${item.imageUrl}`}</td>
                        </tr>
                        </tbody>
                    ))}
                </table>
            </div>
        </div>
    )
}

export default MovieRow;
