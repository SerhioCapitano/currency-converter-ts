type InfoValidationProps = {
  from: string
  to: string
  fromAmount: number
  toAmount: number
  number: number
}

export const AmountValidation = ({
  from,
  to,
  fromAmount,
  toAmount,
  number,
}: InfoValidationProps) => {
  const formatter = new Intl.NumberFormat('default', {
    style: 'currency',
    currency: to,
  })
  if (number > 0) {
    return (
      <div className="calculation">
        {fromAmount + ' '}
        {from} to {to} : {' ' + formatter.format(toAmount)}
      </div>
    )
  }
  return <div className="calculation">Enter amount you wish to convert!</div>
}
