function WordSlot({gameWord, playerWord}){
    
    return(
        <div className="word-meaning-cont">
            <div className="word-slot">
                {playerWord.map(letter => (
                <div className="letter-slot" 
                key={Math.random().toString(36).substr(2, 9)} 
                data-id={gameWord.word.indexOf(letter)}>{letter}</div>))}
            </div>
            <div className="clue-container">
                {gameWord.clue}
            </div>
        </div>
    )
}

export default WordSlot