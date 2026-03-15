import { useState } from 'react'
import { useEffect } from 'react'
import Modal from './modal.jsx'
import Coins from './assets/coins.png'
import Timer from './assets/timer.png'
import Score from './assets/score.png'
import Village from './assets/village.png'
import Forest from './assets/forest.png'
import Beach from './assets/beach.png'
import Ice from './assets/ice.png'
import Castle from './assets/castle.png'
import Desert from './assets/desert.png'
import Jungles from './assets/jungles.png'
import City from './assets/city.png'

import Passive from './assets/passive.png'
import './App.css'






function App() {
  const [isOpen, setIsOpen] = useState(false)
  function handleClick() {
    setIsOpen(true)
  }
  function handleClose() {
    setIsOpen(false)
  }
  const [bioms, setBioms] = useState([

    {
      name: 'Village biom',
      img: Village
    },
    {
      name: 'Forest biom',
      img: Forest
    },
    {
      name: 'Beach biom',
      img: Beach
    },
  ])
  const [randomBonus, setRandomBonus] = useState([
    {
      name: 'Some money...'
    },
    {
      name: 'Some seconds'
    }
  ])
  const [countBioms, setCountBioms] = useState(0)
  const [forestBiom, setForestBiom] = useState(() => {
    // const savedBioms = localStorage.getItem('forestBiom')

    // if (savedBioms !== null) {
    //   return JSON.parse(savedBioms)
    // }

    return [
      {
        name: 'Beach biom',
        img: Beach,
        price: 5,
        bought: false,
        selector: 'ord'
      },
      {
        name: 'Village biom',
        img: Village,
        price: 5,
        bought: false,
        selector: 'ord'
      },
      {
        name: 'Ordinary biom',
        img: Forest,
        price: 5,
        bought: false,
        selector: 'ord'
      },

      {
        name: 'Ordinary biom',
        img: Ice,
        price: 5,
        bought: false,
        selector: 'ord'
      },
      {
        name: 'Forest biom',
        img: Castle,
        price: 15,
        bought: false,
        selector: 'fors'
      },
      {
        name: 'Ordinary biom',
        img: City,
        price: 5,
        bought: false,
        selector: 'ord'
      },
      {
        name: 'Ordinary biom',
        img: Jungles,
        price: 5,
        bought: false,
        selector: 'ord'
      },
      {
        name: 'Ordinary biom',
        img: Desert,
        price: 5,
        bought: false,
        selector: 'ord'
      },
      {
        name: 'Ordinary biom',
        img: Beach,
        price: 5,
        bought: false,
        selector: 'ord'
      }
    ]
  })

  const [biomForestIndex, setBiomForestIndex] = useState(0)
  const [coins, setCoins] = useState(10)
  const [count, setCount] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [seconds, setSeconds] = useState(30)
  const [questions, setQuestions] = useState([])
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [answerClass, setAnswerClass] = useState(null)
  const [boughtBiom, setBoughtBiom] = useState(false);
  const [blocked, setBlocked] = useState(false)
  async function getQuestions() {
    let url = 'https://the-trivia-api.com/api/questions?limit=100&categories=geography&difficulties=easy'
    try {
      let response = await fetch(url)
      let result = await response.json()
      setQuestions(result)
      console.log(result);

    }
    catch (error) {
      console.error("Ошибка при загрузке:", error)
    }
  }
  useEffect(() => {
    if (seconds <= 0) {
      setSeconds(30)
      setCurrentIndex(currentIndex + 1)
      return

    }
    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1)
    }, 1000)
    return () => clearInterval(interval);

  }, [seconds])

  useEffect(() => {
    getQuestions()
  }, [])




  if (questions.length === 0) {
    return <div>loading...</div>
  }
  const currentQ = questions[currentIndex]

  function checkAnswer(answer) {

    setSeconds(30)
    if (answer == currentQ.correctAnswer) {
      setCount(count + 1)
      if (count == 2) {
        setCoins(coins + 10)
      }
      if (count == 3) {
        setCoins(coins + 20)
      }
      setCoins(coins + 10)
      // setCurrentIndex(currentIndex + 1)

    }
    else {
      setCoins((coins) => {
        coins = coins - 5
        if (coins < 0) {
          coins = 0

        }
        return coins
      })


    }
  }

  let isFinished = currentIndex >= questions.length
  if (isFinished) {
    return <div className="o">
      <h4 id='showRsult'>Ваш Результат: Очков: {count} из {questions.length} , Время прохождения:</h4>
      <button onClick={() => startAgain()} className='again'>Заново!</button>
    </div>

  }
  function startAgain() {
    setCount(0)
    setCurrentIndex(0)
    setMoney(10)

  }

  function buyArea(biomForestIndex) {
    setBiomForestIndex(biomForestIndex)
    setForestBiom((forestBiom) => {
      let nextBiom = [...forestBiom]
      let currentBiom = nextBiom[biomForestIndex]
      if (currentBiom.selector == 'ord' && !currentBiom.bought) {
        setCountBioms(countBioms + 1)
        currentBiom.bought = true
        setBoughtBiom(true)
        setCoins(prevMoney => prevMoney - currentBiom.price)
      }
      if (countBioms == 8 && currentBiom.selector == 'fors') {
        currentBiom.bought = true
        setBoughtBiom(true)
        setCoins(prevMoney => prevMoney - currentBiom.price)
      }
      if (currentBiom.bought) {
        passiveIncome()
      }
      return nextBiom
    })
    function passiveIncome() {
      const interval = setInterval(() => {
        setCoins(prev => prev + 1)
      }, 30000)
      return () => clearInterval(interval)

    }
  }

  return (
    <>
      <h1>QuizLand 🌴</h1>
      <div className="panel">
        <div className="ui">
          <img src={Score} alt="" />
          <h3>Счёт: {count}</h3>

        </div>
        <div className="ui">
          <img src={Timer} alt="" />
          <h3>Время:{seconds}</h3>
        </div>
        <div className="ui">
          <img src={Coins} alt="" />
          <h3>Монет: {coins}</h3>

        </div>

        <div className="ui">
          <img src={Passive} alt="" />
          <h3>Пассивный доход: + 1/ 30 сек</h3>
        </div>
      </div>
      {/* <button onClick={() => handleClick()} style={{ display: 'block', margin: 'auto', marginBottom: '5px' }}>Инструкция</button> */}
      {/* <Modal handleClose={handleClose} open={open}></Modal> */}
      <div className="display">
        <div className="container">
          <div className="display1">
            {forestBiom.map((biom, biomForestIndex) => (
              <div className={`square ${biom.bought ? 'square--bought' : 'square--locked'}`} onClick={() => buyArea(biomForestIndex)}>{<img src={biom.img} alt='' />}</div>

            ))}

          </div>
        </div>
        <div className="quiz">
          <h2 className='q'>{currentQ.question}</h2>
          {[...currentQ.incorrectAnswers, currentQ.correctAnswer].map((answer, index) => (
            <button
              key={`${currentIndex}-${answer}`}
              disabled={blocked}
              onClick={() => {
                setSelectedAnswer(answer)
                checkAnswer(answer);
                setBlocked(true);
                setTimeout(() => {
                  setBlocked(false);
                  setSelectedAnswer(null);
                  setCurrentIndex((prev) => prev + 1)
                }, 2000);
              }}
              className={
                blocked
                  ? (answer === questions[currentIndex].correctAnswer
                    ? 'correctAnswerButton'   
                    : (answer === selectedAnswer ? 'incorrectAnswerButton' : '') 
                  )
                  : ''
              }
            >
              {answer}
            </button>
          ))}

          <div>
          </div>

        </div>


      </div>





    </>
  )
}

export default App