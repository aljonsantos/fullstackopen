import { useState } from 'react';

const Statistics = ({ values }) => {

  const getAvg = () => {
    const total = getTotal();
    return total === 0 ? 0 : (values.good - values.bad) / getTotal();
  }

  const getTotal = () => {
    let total = 0;
    for (const value of Object.values(values)) {
      total += value;
    }
    return total;
  }

  const getPositive = () => {
    const total = getTotal();
    return total === 0 ? 0 : (values.good / total) * 100;
  }

  if (getTotal() === 0) {
    return <p>No feedback given</p>
  }

  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={values.good} />
        <StatisticLine text="neutral" value={values.neutral} />
        <StatisticLine text="bad" value={values.bad} />

        <StatisticLine text="all" value={getTotal()} />
        <StatisticLine text="average" value={getAvg().toFixed(2)} />
        <StatisticLine text="positive" value={getPositive().toFixed(2) + ' %'} />
      </tbody>
    </table>
  )
}

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Button = ({ text, handleClick }) => {
  return <button onClick={() => handleClick(text)}>{text}</button>
}

function App() {

  const [values, setValues] = useState(
    {
      good: 0,
      neutral: 0,
      bad: 0
    }
  )

  const setValue = (key) => {
    const oldKeyValue = values[key];
    setValues({...values, [key]: oldKeyValue + 1});
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" handleClick={setValue} />
      <Button text="neutral" handleClick={setValue} />
      <Button text="bad" handleClick={setValue} />
      <h2>statistics</h2>
      <Statistics values={values}/>
    </div>
  );
}

export default App;