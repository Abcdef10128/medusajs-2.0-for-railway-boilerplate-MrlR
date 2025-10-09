import { isEmpty } from "./isEmpty"

type ConvertToLocaleParams = {
  amount: number
  currency_code: string
  // minimumFractionDigits?: number
  // maximumFractionDigits?: number
    minimumFractionDigits?: 0
  maximumFractionDigits?: 0

  locale?: string
}

export const convertToLocale = ({
  amount,
  currency_code,
  minimumFractionDigits,
  maximumFractionDigits,
  locale = "en-US",
}: ConvertToLocaleParams) => {
  return currency_code && !isEmpty(currency_code)
    ? new Intl.NumberFormat(locale, {
        style: "currency",
        
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
        currency: currency_code,


      }).format(amount)
    : amount.toString()
}
