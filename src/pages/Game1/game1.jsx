import { useEffect, useState } from "react";
import "./game1.css";
import Button from "../../Utils/Button/Button";

const Game1 = () => {
    const [characters, setCharacters] = useState([]);
    const [characterSelected, setCharacterSelected] = useState(null);
    const [randomNames, setRandomNames] = useState([]);
    const [levels, setLevels] = useState(1);
    const [points, setPoints] = useState(0);

    const checkAnswer = (name) => {
        if (name === characterSelected.name) {
            setPoints(points + 1);
        }
        setLevels(levels + 1);
        nextLevel(characters);
    };

    const nextLevel = (res) => {
        const positionSelected = Math.floor(Math.random() * res.length);
        const currentCharacter = res[positionSelected];
        setCharacterSelected(currentCharacter);

        const randomNames = [currentCharacter.name];
        while (randomNames.length < 3) {
            const randomCharacter = res[Math.floor(Math.random() * res.length)];
            if (!randomNames.includes(randomCharacter.name)) {
                randomNames.push(randomCharacter.name);
            }
        }

        setRandomNames(randomNames.sort(() => Math.random() - 0.5));
    };

    useEffect(() => {
        fetch(`https://rickandmortyapi.com/api/character/`)
            .then((res) => res.json())
            .then((res) => {
                setCharacters(res.results);
                nextLevel(res.results);
            });
    }, []);

    return (
        <div className="choiceGame">

            <div className="infoLevels">

                <p>Puntos: {points}</p>
            </div>
            {characterSelected && (
                <div className="character">
                    <img src={characterSelected.image} alt={characterSelected.name} />
                    <div className="options">
                        {randomNames.map((name) => (
                            <Button key={name} onClick={() => checkAnswer(name)}>
                                {name}
                            </Button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Game1;