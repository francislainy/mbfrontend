import React from 'react';
import './MovieRow.css';

const MovieRow = ({movies}) => {
    return (
        <div>
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
                    {movies.length > 0 && movies.map((item, key) => (
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
