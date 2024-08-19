import { useEffect, useState } from "react";
import "./characters.css";
import Button from "../../Utils/Button/Button";

const Characters = () => {
    const [characters, setCharacters] = useState([]);
    const [page, setPage] = useState(1);

    const nextPage = () => {
        setPage((prevPage) => prevPage + 1);
    };

    const previousPage = () => {
        setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
    };

    useEffect(() => {
        fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
            .then((res) => res.json())
            .then((res) => {
                setCharacters(res.results);

            });
    }, [page]);

    return (
        <div className="characters">
            {characters.map((character) => (
                <div key={character.id} className="characterCard">
                    <img src={character.image} alt={character.name} />
                    <div className="characterInfo">
                        <p className="characterName">Nombre: {character.name}</p>
                        <p className="characterOrigin">Origen: {character.origin.name}</p>
                        <p className="characterSpecies">Especie: {character.species}</p>
                        <p className="characterStatus">Estatus: {character.status}</p>
                    </div>

                </div>
            ))}
            <div className="buttonDiv">
                <Button onClick={previousPage} disabled={page === 1}>Back</Button>
                <Button onClick={nextPage}>Next</Button>
            </div>
        </div>
    );
};

export default Characters;