import api from '../services/api'
import ScrollIntoView from './ScrollIntoView'
import { parseIdAttr } from '../utils'

const renderBg = (price) => {
  if (price >= 20) return 'bg-red-100 dark:bg-red-800'
  if (price >= 10) return 'bg-yellow-100 dark:bg-yellow-800'
  return 'bg-green-100 dark:bg-green-800'
}

const PricesTable = ({ date, hourly }) => (
  <table className="border-separate border-spacing-2 border border-slate-400 p-2 w-full sm:w-1/2">
    <caption className="text-xl p-2">{date}</caption>
    <thead>
      <tr>
        <th className="border border-slate-300 p-2">From</th>
        <th className="border border-slate-300 p-2">Price</th>
      </tr>
    </thead>
    <tbody>
      {hourly.map(({ from, to, price, string }) => (
        <tr id={parseIdAttr(date, from)} key={string}>
          <td className={`border border-slate-300 p-2 text-center ${renderBg(price)}`}>
            {from} - {to}
          </td>
          <td className={`border border-slate-300 p-2 text-center  ${renderBg(price)}`}>{price}¢ (kWh)</td>
        </tr>
      ))}
    </tbody>
  </table>
)

export default async function Home() {
  const now = new Date()

  const yesterday = new Date(now)
  yesterday.setDate(yesterday.getDate() - 1)

  const tomorrow = new Date(now)
  tomorrow.setDate(tomorrow.getDate() + 1)

  const dailyData = await Promise.allSettled([api(yesterday), api(now), api(tomorrow)])

  const [dataYesterday, dataToday, dataTomorrow] = dailyData.map(({ status, value }) =>
    status === 'fulfilled' ? value : undefined
  )

  const updatedAt = [dataYesterday, dataToday, dataTomorrow].reduce((acc, cur) => cur?.updatedAt || acc)
  if (!updatedAt) throw new Error("Couldn't fetch data")

  return (
    <div className="font-[family-name:var(--font-geist-sans)] p-4">
      <main className="flex flex-col gap-8 row-start-2 items-center">
        <h1 className="text-2xl text-center">Updated {updatedAt}</h1>
        {dataYesterday && <PricesTable {...dataYesterday} />}
        {dataToday && <PricesTable {...dataToday} />}
        {dataTomorrow && <PricesTable {...dataTomorrow} />}
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
      <ScrollIntoView />
    </div>
  )
}
