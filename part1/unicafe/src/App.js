
import './App.css';
import { useState } from 'react'

const Header = ({text}) => <div className="HeaderBold">{text}</div>

const Button = ({handleClick, text}) => <button onClick={handleClick} className="Button">{text}</button>

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)

  const feedbackGood = () => {
    console.log('increasing good, value before', good)
    setGood(good + 1)
    setAll(all+1)
  }

  const feedbackNeutral = () => {
    setNeutral(neutral+1)
    setAll(all+1)
  }

  const feedbackBad = () => {
    console.log('increase bad, value before', bad)
    setBad(bad + 1)
    setAll(all+1)
  }





  return (
    <div className='text-center'>
    <br />  
    <Header text='Give feedback'/>
    <br />
    <Button handleClick={feedbackGood} text='good'/>
    <Button handleClick={feedbackNeutral} text="neutral" />
    <Button handleClick={feedbackBad} text="bad" />
    <br />
    <br/>
    <Header text='statistics' />
    <p>good {good}</p>
    <p>neutral {neutral}</p>
    <p>bad {bad}</p>
    <p>all {all} </p>
    </div>

  )
}

export default App
