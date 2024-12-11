import api, { ApiData, dateStr } from '../services/api-nordpoolgroup'
import ScrollIntoView from './ScrollIntoView'

const renderBg = (price: number) => {
  if (price > 28) return 'bg-red-700 dark:bg-red-700 text-white dark:border-slate-800'
  if (price > 21) return 'bg-red-400 dark:bg-red-400 dark:text-black dark:border-slate-800'
  if (price > 14) return 'bg-orange-300 dark:bg-orange-600 dark:text-black dark:border-slate-800'
  if (price > 7) return 'bg-yellow-100 dark:bg-yellow-500 dark:text-black dark:border-slate-800'
  return 'bg-green-100 dark:bg-green-600 dark:text-black dark:border-slate-800'
}

const PriceTable = ({ data }: { data: ApiData }) => (
  <table className="border-separate border-spacing-2 border border-slate-400 p-2 mt-4 w-full sm:w-1/2">
    <caption>{data.date}</caption>
    <thead>
      <tr>
        <th className="border border-slate-300 p-2">From</th>
        <th className="border border-slate-300 p-2">Price</th>
      </tr>
    </thead>
    <tbody>
      {data.prices.map(({ from, to, price }) => (
        <tr id={`prices-from-${dateStr(from, 'MDh')}`} key={from.getTime()}>
          <td className={`border border-slate-300 p-2 text-center ${renderBg(price)}`}>
            {dateStr(from, 'hm')} - {dateStr(to, 'hm')}
          </td>
          <td className={`border border-slate-300 p-2 text-center relative ${renderBg(price)}`}>
            <span>{price}¢ (kWh)</span>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
)

export default async function Home() {
  const data = await Promise.all([await api('yesterday'), await api('today'), await api('tomorrow')])

  const [yesterday, today, tomorrow] = data
  const { updatedAt } = today

  return (
    <div className="font-[family-name:var(--font-geist-sans)] p-4">
      <main className="flex flex-col gap-2 row-start-2 items-center">
        <h1 className="text-2xl text-center">Electricity prices</h1>
        <h2 className="text-sm text-center">
          Updated {updatedAt.toLocaleDateString()} {updatedAt.toLocaleTimeString()}
        </h2>
        {yesterday && <PriceTable data={yesterday} />}
        {today && <PriceTable data={today} />}
        {tomorrow && <PriceTable data={tomorrow} />}
      </main>
      <ScrollIntoView targetId={`prices-from-${dateStr(new Date(), 'MDh')}`} />
    </div>
  )
}
