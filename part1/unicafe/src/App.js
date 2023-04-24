import React from 'react';
import './App.css';
import { useState } from 'react'

const Header = ({text}) => <div className="HeaderBold">{text}</div>

const Button = ({handleClick, text}) => <button onClick={handleClick} className="Button">{text}</button>

const StatisticLine = ({text, value}) => <tr><td>{text}</td><td>{value}</td></tr>

const Statistics = ({data}) => {
  if (data.all.value === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <table className="center">
        <tbody>
        <StatisticLine text={data.good.text} value={data.good.value}/>
        <StatisticLine text={data.neutral.text} value={data.neutral.value} />
        <StatisticLine text={data.bad.text} value={data.bad.value} />
        <StatisticLine text={data.all.text} value={data.all.value} />
        <StatisticLine text={data.average.text} value={data.average.value} />
        <StatisticLine text={data.positive.text} value={data.positive.value}/>
        </tbody>
      </table>
    </div>
  )
}
const App = () => {
 
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [sum, setSum] = useState(0)

  const data = {
    good : {
      text: 'good ',
      value: good,
    },
    neutral: {
      text: 'neutral ',
      value: neutral,
    },
    bad: {
      text: 'bad ',
      value: bad,
    },
    all: {
      text: 'all ',
      value: all,
    },
    average: {
      text: 'average ',
      value: all === 0 ? 0 : sum / all,
    },
    positive: {
      text: 'positive ',
      value: all === 0 ? 0 : (good * 100) / all + ' %',
    },
  }; 

  const feedbackGood = () => {
    console.log('increasing good, value before', good)
    setGood(good + 1)
    setAll(all+1)
    setSum(sum+1)
  }

  const feedbackNeutral = () => {
    setNeutral(neutral+1)
    setAll(all+1)
  }

  const feedbackBad = () => {
    console.log('increasing bad, value before', bad)
    setBad(bad + 1)
    setAll(all+1)
    setSum(sum-1)
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
    <Statistics data={data}/>
    </div>

  )
}

export default App
