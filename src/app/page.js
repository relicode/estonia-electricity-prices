import api from '../services/api'
import ScrollIntoView from './ScrollIntoView'

const renderBg = (price) => {
  if (price >= 20) return 'bg-red-100 dark:bg-red-800'
  if (price >= 10) return 'bg-yellow-100 dark:bg-yellow-800'
  return 'bg-green-100 dark:bg-green-800'
}

export default async function Home() {
  const { date, updatedAt, prices } = await api()

  return (
    <div className="font-[family-name:var(--font-geist-sans)] p-4">
      <main className="flex flex-col gap-2 row-start-2 items-center">
        <h1 className="text-2xl text-center">Electricity prices {date}</h1>
        <table className="border-separate border-spacing-2 border border-slate-400 p-2 w-full sm:w-1/2">
          <caption>Updated {updatedAt}</caption>
          <thead>
            <tr>
              <th className="border border-slate-300 p-2">From</th>
              <th className="border border-slate-300 p-2">Price</th>
            </tr>
          </thead>
          <tbody>
            {prices.map(({ from, to, price, string }) => (
              <tr id={`prices-${from.slice(0, 2)}`} key={string}>
                <td className={`border border-slate-300 p-2 text-center ${renderBg(price)}`}>
                  {from} - {to}
                </td>
                <td className={`border border-slate-300 p-2 text-center  ${renderBg(price)}`}>{price}¢ (kWh)</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
      <ScrollIntoView />
    </div>
  )
}
