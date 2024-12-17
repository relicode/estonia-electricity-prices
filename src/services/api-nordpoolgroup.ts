// https://dataportal-api.nordpoolgroup.com/api/DayAheadPrices?date=2024-10-26&market=DayAhead&deliveryArea=EE&currency=EUR

const padNumber = (n: number, padding = 2) => String(n).padStart(padding, '0')

export const dateStr = (date: Date, unit: 'h' | 'm' | 'D' | 'M' | 'Y' | 'hm' | 'MDh' | 'MDhm' | 'YMD') => {
  switch (unit) {
    case 'h':
      return padNumber(date.getHours())
    case 'm':
      return padNumber(date.getMinutes())
    case 'D':
      return padNumber(date.getDate())
    case 'M':
      return padNumber(date.getMonth() + 1)
    case 'Y':
      return date.getFullYear()
    case 'hm':
      return [dateStr(date, 'h'), dateStr(date, 'm')].join(':')
    case 'MDh':
      return `${dateStr(date, 'M')}-${dateStr(date, 'D')}-${dateStr(date, 'h')}`
    case 'MDhm':
      return `${dateStr(date, 'M')}-${dateStr(date, 'D')}-${dateStr(date, 'hm')}`
    case 'YMD':
      return [dateStr(date, 'Y'), dateStr(date, 'M'), dateStr(date, 'D')].join('-')
  }
}

export const nearbyDate = (when: 'today' | 'tomorrow' | 'yesterday' = 'today') => {
  const targetDate = new Date()
  if (when === 'tomorrow') targetDate.setDate(targetDate.getDate() + 1)
  else if (when === 'yesterday') targetDate.setDate(targetDate.getDate() - 1)
  return targetDate
}

export type ApiData = {
  date: string
  updatedAt: Date
  prices: {
    from: Date
    to: Date
    price: number
  }[]
  deliveryDateCET: string
  version: 3
  deliveryAreas: ['EE']
  market: 'DayAhead'
  multiAreaEntries: [
    {
      deliveryStart: string
      deliveryEnd: string
      entryPerArea: {
        EE: number
      }
    },
  ]
}

const gmt2Eet = (dateParams: ConstructorParameters<Date>[0]) => {
  const date = new Date(dateParams)
  date.setHours(date.getHours() + 2)
  return date
}

export default async function loadData(
  when: 'today' | 'tomorrow' | 'yesterday' = 'today'
): Promise<ApiData | undefined> {
  const url = new URL('DayAheadPrices', 'https://dataportal-api.nordpoolgroup.com/api/')

  const date = dateStr(nearbyDate(when), 'YMD')
  url.searchParams.append('date', date)
  url.searchParams.append('market', 'DayAhead')
  url.searchParams.append('deliveryArea', 'EE')
  url.searchParams.append('currency', 'EUR')

  const response = await fetch(url)
  if (response.status === 204) return undefined

  const data: {
    deliveryDateCET: string
    updatedAt: string
    version: 3
    deliveryAreas: ['EE']
    market: 'DayAhead'
    multiAreaEntries: [
      {
        deliveryStart: string
        deliveryEnd: string
        entryPerArea: {
          EE: number
        }
      },
    ]
  } = await response.json()

  const { updatedAt } = data

  return {
    ...data,
    date,
    updatedAt: gmt2Eet(updatedAt),
    prices: data.multiAreaEntries.map(({ deliveryStart, deliveryEnd, entryPerArea: { EE } }) => ({
      from: gmt2Eet(deliveryStart),
      to: gmt2Eet(deliveryEnd),
      price: Math.round(EE / 10),
    })),
  }
}
