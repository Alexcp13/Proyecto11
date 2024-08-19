import React, { useState, useEffect } from "react";
import "./game2.css";
import Button from "../../Utils/Button/Button";

const Game2 = () => {
    const [characters, setCharacters] = useState([]);
    const [angles, setAngles] = useState([165, 90, 135]);
    const [gameOver, setGameOver] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);
    const [hasWon, setHasWon] = useState(false);
    const [timeLeft, setTimeLeft] = useState(8);

    useEffect(() => {
        fetch(`https://rickandmortyapi.com/api/character/`)
            .then((res) => res.json())
            .then((res) => {
                const randomCharacters = [];
                while (randomCharacters.length < 3) {
                    const randomCharacter = res.results[Math.floor(Math.random() * res.results.length)];
                    if (!randomCharacters.includes(randomCharacter)) {
                        randomCharacters.push(randomCharacter);
                    }
                }
                setCharacters(randomCharacters);
            });
    }, []);

    useEffect(() => {
        if (gameStarted && timeLeft > 0 && !gameOver) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0) {
            handleTimeUp();
        }
    }, [timeLeft, gameStarted, gameOver]);

    const rotateImage = (index) => {
        if (!gameStarted || gameOver) return;
        const newAngles = angles.map((angle, i) =>
            i === index && angle !== 0 ? (angle + 15) % 360 : angle
        );
        setAngles(newAngles);
        checkWin(newAngles);
    };

    const checkWin = (newAngles) => {
        if (newAngles.every(angle => angle === 0)) {
            setHasWon(true);
            setGameOver(true);
        }
    };

    const handleTimeUp = () => {
        setGameOver(true);
    };

    const startGame = () => {
        setGameStarted(true);
        setGameOver(false);
        setHasWon(false);
        setAngles([165, 90, 135]);
        setTimeLeft(8);
    };

    const resetGame = () => {
        setGameStarted(false);
        setGameOver(false);
        setHasWon(false);
        setAngles([165, 90, 135]);
        setTimeLeft(8);
    };

    return (
        <div className="game2">
            <div className={`rotateGame ${gameStarted ? 'gameStarted' : ''}`}>
                {characters.map((character, index) => (
                    <img
                        key={character.id}
                        src={character.image}
                        alt={character.name}
                        style={{
                            transform: `rotate(${angles[index]}deg)`,
                            border: angles[index] === 0 ? '2px solid yellow' : '3px solid black'
                        }}
                        onClick={() => rotateImage(index)}
                    />
                ))}
            </div>
            {!gameStarted ? (
                <Button onClick={startGame}>Start Game</Button>
            ) : (
                <>
                    <div className="timer">
                        Quedan: {timeLeft} segundos
                    </div>
                    {gameOver && (
                        <div className="gameOver">
                            {hasWon ? "Has ganado!" : "Game Over!"}
                        </div>
                    )}
                </>
            )}
            <Button onClick={resetGame} disabled={!gameStarted}>Reiniciar</Button>
        </div>
    );
};

export default Game2;