export const roundNumber = (num: number, decimals: number) => {
  const power = Math.pow(10, decimals)

  return Math.round(num * power) / power
}
