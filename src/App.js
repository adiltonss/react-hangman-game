import React, {useState, useEffect} from 'react'
import Alphabet from './Components/Alphabet';
import StickMan from './Components/StickMan';
import WordSlot from './Components/WordSlot';
import EndGame from './Components/EndGame';

const Counter = ({counter}) => {
  return (<div className='counter'>Cliques: {counter}</div>)
}

function App() {
  const [bodyParts, removeBodyParts] = useState(["torso", "head", "leftarm", "rightarm", "leftleg", "rightleg", "leftfoot", "rightfoot"])
  const [playerWord, setPlayerWord] = useState([])
  const [gameWord, setWord] = useState({
    word: '',
    clue:''
  })
  const [gameResult, setGameResult] = useState('')
  const [counter, setCounter] = useState(0)

  useEffect(()=>{
    getWord()
  }, [])

  useEffect(()=>{
    checkBodyParts()
  }, [bodyParts, playerWord])
  
  const resetGame = ()=>{
    setGameResult('')
    setPlayerWord([])
    setWord({
      word:getWord(),
      clue:''
    })
    removeBodyParts(["torso", "head", "leftarm", "rightarm", "leftleg", "rightleg", "leftfoot", "rightfoot"])
    setCounter(0)
  }

  const checkBodyParts = () => {
    if(playerWord.join('') === '' && gameWord.word === "") return;

    if(bodyParts.length === 1){
      setGameResult('loss')
    }

    if(gameWord.word === playerWord.join('')){
      setGameResult("victory")
    }
    gameEnd()
  }

  const getWord = () => {
    fetch("https://api.dicionario-aberto.net/random")
    .then((data) => data.json())
    .then((data) => {
      const originalWord = data.word;
      const formattedWord = removeSpecialChars(originalWord);

      setWord({ originalWord, word: formattedWord, clue: '' });

      const playerWordArray = Array(formattedWord.length).fill('');
      for (let i = 0; i < formattedWord.length; i++) {
        if (formattedWord[i] === '-') {
          playerWordArray[i] = '-';
        }
      }
      setPlayerWord(playerWordArray);
    })
    .catch((error) => console.log(error));
  };

  const getClue = (gameWord) => {
    fetch("https://api.dicionario-aberto.net/word/" + gameWord.originalWord)
      .then((response) => response.json())
      .then((response) => {
        const xmlContent = response[0].xml;
        const match = xmlContent.match(/<def>[\s\S]*?<\/def>/)[0].replace(/<\/?def>/g, '');
  
        setWord((prevWord) => ({
          ...prevWord,
          clue: `Dica: ${match}`,
        }));
      })
      .catch((er) => console.log(er));
  };

  const removeAccents = (str) => {
    const accents = 'ÀÁÂÃÄÅàáâãäåÈÉÊËèéêëÌÍÎÏìíîïÒÓÔÕÖØòóôõöøÙÚÛÜùúûüÝýÿÇç';
    const withoutAccents = 'AAAAAAaaaaaaEEEEeeeeIIIIiiiiOOOOOOooooooUUUUuuuuyyCc';
  
    const regex = new RegExp(`[${accents}]`, 'g');
    const result = str.replace(regex, (match) => withoutAccents.charAt(accents.indexOf(match)));
  
    return result;
  };
  
  const removeSpecialChars = (word) => {
    return removeAccents(word).replace(/[^a-zA-Z0-9-]/g, '');
  };
  

  const gameEnd = ()=> {
    return (
    <EndGame 
      gameResult={gameResult} 
      gameWord={gameWord}
      resetGame={resetGame}
      />
      )
  }

  const handleClick = (letter) =>{
    if(gameWord.word === undefined || playerWord.includes(letter)) return;
    setCounter(()=> counter + 1 )
    let updatedPlayerWord = [...playerWord];
    let found = false;
  
    for (let i = 0; i < gameWord.word.length; i++) {
      if (gameWord.word[i] === letter) {
        updatedPlayerWord[i] = letter;
        found = true;
      }
    }
  
    if (!found) {
      if(bodyParts.length > 1){
        if(bodyParts.length === 4){
          getClue(gameWord)
        }
        removeBodyParts(bodyParts.slice(0, -1));
      }
    }
  
    setPlayerWord(updatedPlayerWord);
  }

  return (
    <div className="App">
      <StickMan bodyParts={bodyParts} />
      <WordSlot 
        gameWord={gameWord}
        playerWord={playerWord} />
      <Alphabet handleClick={handleClick} />
      <Counter counter={counter} />
      {gameEnd()}
    </div>
  );
}

export default App;