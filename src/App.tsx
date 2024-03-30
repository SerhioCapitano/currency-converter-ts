import React, { useState } from 'react'
import { AmountValidation } from './components/AmountValidation'
import './App.css'
import { CurrencyFields } from './components/CurrencyFields'

type Info = {
  from: string
  to: string
  fromAmount: number
  toAmount: number
}

export default function App() {
  const [info, setInfo] = useState<Info | undefined>()
  const [number, setNumber] = useState(0)
  const options: string[] = ['USD', 'GBP', 'EUR', 'PLN', 'RUB']
  const [firstCurrency, setFirstCurrency] = useState(options[0])
  const [secondCurrency, setSecondCurrency] = useState(options[1])
  const filteredOptions = options.filter(
    (currency) => currency !== firstCurrency
  )

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setNumber(Number(e.currentTarget.value))
  }

  const firstCurrencyChange = (selectedOption: any) => {
    setFirstCurrency(selectedOption.value)
  }

  const secondCurrencyChange = (selectedOption: any) => {
    setSecondCurrency(selectedOption.value)
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    fetch(
      `https://my.transfergo.com/api/fx-rates?from=${firstCurrency}&to=${secondCurrency}&amount=${number}`
    )
      .then((res) => res.json())
      .then((data: Info) => {
        setInfo(data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  }

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <CurrencyFields
          options={options}
          firstCurrency={firstCurrency}
          secondCurrency={secondCurrency}
          filteredOptions={filteredOptions}
          onFirstCurrencyChange={firstCurrencyChange}
          onSecondCurrencyChange={secondCurrencyChange}
        />

        <input
          className="input"
          type="number"
          value={number}
          onChange={handleChange}
          placeholder="Enter Amount"
          required
        />
        <button className="submit-button" type="submit">
          Convert
        </button>
        {info ? (
          <AmountValidation
            from={info.from}
            to={info.to}
            fromAmount={info.fromAmount}
            toAmount={info.toAmount}
            number={number}
          />
        ) : (
          <p className="loading">Enter amount you wish to convert!</p>
        )}
      </form>
    </div>
  )
}
