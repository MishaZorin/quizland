import { useState } from 'react'
import { useEffect } from 'react'
import Bonus from './assets/bonus.png'
import Coins from './assets/coins.png'
import Timer from './assets/timer.png'
import Score from './assets/score.png'
import Village from './assets/village.png'
import Forest from './assets/forest.png'
import Beach from './assets/beach.png'
import Ordinary from './assets/i.png'
import Shop from './assets/shop.png'
import './App.css'

function App() {
  const [bioms,setBioms] = useState([
    {
      name: 'Ordinary biom',
      img: Ordinary
    },
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
  const [forestBiom, setForestBiom] = useState([
    
     {
      name: 'Ordinary biom',
      img: Ordinary
    },
    {
       name: 'Forest biom',
      img: Forest
    },
    {
      name: 'Ordinary biom',
      img: Ordinary
    }
  ])
  const [biomForestIndex, setBiomForestIndex] = useState(0)
  const [money, setMoney] = useState(10)
  const [count, setCount] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [seconds, setSeconds] = useState(30)
  const [questions, setQuestions] = useState([])
  // setBioms(()=>{
  //   const randomBiom = bioms[Math.floor(Math.random() * bioms.length)]
  //   console.log(randomBiom);
    

  // })
  

  async function getQuestions() {
    let url = 'https://the-trivia-api.com/api/questions?limit=100'
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

  function checkAnswer(selectedAnswer) {
    setSeconds(30)
    if (selectedAnswer == currentQ.correctAnswer) {
      setCount(count + 1)
      setMoney(money + 10)
      setCurrentIndex(currentIndex + 1)

    }
    else {
      setMoney(money - 5)
      setCurrentIndex(currentIndex + 1)
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
    setMoney(money - 10)
    setBiomForestIndex(biomForestIndex)
    console.log(biomForestIndex);
    




  }


  return (
    <>

      <h1>Catch The Grass 🌴</h1>
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
          <h3>Монет: {money}</h3>

        </div>
        <div className="ui">
          <img src={Bonus} alt="" />
          <h3> Бонус:</h3>
        </div>
        <div className="ui">
          <img src={Shop} alt="" />
          <h3>Магазин</h3>
        </div>

      </div>

      <div className="display">
        <div className="container">
          
            {forestBiom.map((biom,biomForestIndex) => (
               <div className="square" onClick={() => buyArea(biomForestIndex)}>{<img src={biom.img} alt='' />}</div>

            ))}
           
            
          
          
          
        </div>
        <div className="quiz">
          <h2>{currentQ.question}</h2>
          {[...currentQ.incorrectAnswers, currentQ.correctAnswer].map((answer, index) => (
            <button key={index} onClick={() => checkAnswer(answer)}>{answer}</button>
          ))}

          <div>
          </div>

        </div>


      </div>





    </>
  )
}

export default App
