import React, {useEffect, useState} from 'react';
import {getCharacters} from "../../api";
import CharacterTableContainer from "./CharacterTableContainer";
import CreateNewCharacter from "./CreateNewCharacter";

const Character = () => {
    const [showForm, setShowForm] = useState(false)
    const [showSuccessAlert, setShowSuccessAlert] = useState(false)
    const [characterList, setCharacterList] = useState({
        characters: [
            {
                id: "",
                hanzi: "",
                pinyin: "",
            }
        ]
    })

    useEffect(() => {
        const loadAll = async () => {
            try {
                getCharacters().then(response => setCharacterList(response.data))
            } catch (e) {
                console.log(e + "error")
            }
        }

        loadAll().then(r => console.log(r));
    }, [showForm, showSuccessAlert])

    return (
        <div>
            <div className="container">
                <CreateNewCharacter
                    setShowForm={setShowForm}
                    showForm={showForm}
                />
                <section className="lists">
                    <CharacterTableContainer
                        characters={characterList.characters}
                        showSuccessAlert={showSuccessAlert}
                        setShowSuccessAlert={setShowSuccessAlert}/>
                </section>
            </div>
        </div>
    )
}

export default Character;
