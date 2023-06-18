function EndGame({gameResult, gameWord, resetGame}){
    const messages = {
        victory: {
        title: "Congrats",
        message: `Palavra: ${gameWord.originalWord}`,
        },
        loss: {
        title: "Lost",
        message: `Palavra: ${gameWord.originalWord}`,
        },
    };
    
    if (gameResult === "") return null;
    
    const { title, message } = messages[gameResult] || {};
    
    return (
        <div className="endGameBoard">
            <h1>{title}</h1>
            <p>{message}</p>
            <button onClick={resetGame} className="resetGame">Reset Game</button>
        </div>
    );
}

export default EndGame