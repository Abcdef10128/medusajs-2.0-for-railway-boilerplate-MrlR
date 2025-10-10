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

// export const convertToLocale = ({
//   amount,
//   currency_code,
//   minimumFractionDigits,
//   maximumFractionDigits,
//   locale = "en-US",
// }: ConvertToLocaleParams) => {
//     return currency_code && !isEmpty(currency_code)

//     ? new Intl.NumberFormat(locale, {
//         style: "currency",
        
//         minimumFractionDigits: 0,
//         maximumFractionDigits: 0,
//         currency: currency_code,


//       }).format(amount)
//     : amount.toString()
// }

//---

// export const convertToLocale = ({
//   amount,
//   currency_code,
//   minimumFractionDigits,
//   maximumFractionDigits,
//   locale = "en-US",
// }: ConvertToLocaleParams) => {
//   if (!currency_code || isEmpty(currency_code)) {
//     return amount.toString()
//   }

//   // Форматируем цену
//   const formatted = new Intl.NumberFormat(locale, {
//     style: "currency",
//     minimumFractionDigits: 0,
//     maximumFractionDigits: 0,
//     currency: currency_code,
//   }).format(amount)

//   // Заменяем "UAH" на символ гривны "₴"
//   if (currency_code.toUpperCase() === "UAH") {
//     return formatted.replace(/UAH/gi, "₴")
//   }

//   return formatted
// }



export const convertToLocale = ({
  amount,
  currency_code,
  minimumFractionDigits,
  maximumFractionDigits,
  locale = "en-US",
}: ConvertToLocaleParams) => {
  if (!currency_code || isEmpty(currency_code)) {
    return amount.toString()
  }

  // Специальное форматирование для гривны
  if (currency_code.toUpperCase() === "UAH") {
    const formattedNumber = new Intl.NumberFormat(locale, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
    
    return `${formattedNumber}\u00A0₴`
  }

  // Форматируем остальные валюты стандартно
  return new Intl.NumberFormat(locale, {
    style: "currency",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    currency: currency_code,
  }).format(amount)
}
