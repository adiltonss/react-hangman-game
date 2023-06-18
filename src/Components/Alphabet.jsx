function Alphabet({handleClick}){
    const alphabet = "abcdefghijklmnopqrstuvwxyz"
    return (
        <div className="letters-container">
            {
                alphabet.split("").map(letter => (
                    <button
                    key={letter} 
                    className="letter" 
                    onClick={() => handleClick(letter)} >
                    {letter}
                    </button>
                ))
            }
        </div>
    )
}

export default Alphabet