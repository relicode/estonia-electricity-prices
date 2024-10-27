// https://dataportal-api.nordpoolgroup.com/api/DayAheadPrices?date=2024-10-26&market=DayAhead&deliveryArea=EE&currency=EUR

const parseDate = (dateString, full = false) => {
  const d = new Date(dateString).toLocaleString()
  return full ? d : d.slice(12, 17)
}

export default async function loadData() {
  const now = new Date()
  const date = [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('-')

  const url = new URL('DayAheadPrices', 'https://dataportal-api.nordpoolgroup.com/api/')
  url.searchParams.append('date', date)
  url.searchParams.append('market', 'DayAhead')
  url.searchParams.append('deliveryArea', 'EE')
  url.searchParams.append('currency', 'EUR')

  const response = await fetch(url)
  const data = await response.json()

  /**
    "deliveryDateCET": "2024-10-26",
    "version": 3,
    "updatedAt": "2024-10-25T11:12:20.6032491Z",
    "deliveryAreas": [
      "EE"
    ],
    "market": "DayAhead",
    "multiAreaEntries": [
      {
        "deliveryStart": "2024-10-25T22:00:00Z",
        "deliveryEnd": "2024-10-25T23:00:00Z",
        "entryPerArea": {
          "EE": 114.35
        }
      },
  */

  const parsed = {
    // ...data,
    date,
    updatedAt: parseDate(data.updatedAt, true),
    prices: data.multiAreaEntries.map(({ deliveryStart, deliveryEnd, entryPerArea: { EE } }) => ({
      from: parseDate(deliveryStart),
      to: parseDate(deliveryEnd),
      price: Math.round(EE / 10),
      string: `${parseDate(deliveryStart)}-${parseDate(deliveryEnd)} ${Math.round(EE / 10)}¢ (kWh)`,
    })),
  }

  return parsed
}
