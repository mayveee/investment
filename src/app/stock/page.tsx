// 📄 app/stock/page.tsx
'use client'

import { useEffect, useState } from 'react'

interface Coin {
    id: string
    name: string
    symbol: string
    price: number
    marketCap: number
    image: string
    updatedAt: string
  }

export default function StockPage() {
  const [coins, setCoins] = useState<Coin[]>([])

  useEffect(() => {
    const fetchCoins = async () => {
      const res = await fetch('/api/coins')
      const result = await res.json()
      setCoins(result)
    }

    fetchCoins()
    const interval = setInterval(fetchCoins, 10000) // 10초마다 갱신
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="p-6 overflow-auto">
      <h1 className="text-2xl font-bold mb-4">📊 시가총액 상위 100 코인</h1>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="px-4 py-2">코인</th>
            <th className="px-4 py-2">심볼</th>
            <th className="px-4 py-2 text-right">현재가 (KRW)</th>
            <th className="px-4 py-2 text-right">시가총액</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin) => (
            <tr key={coin.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2 flex items-center gap-2">
                <img src={coin.image} alt={coin.name} className="w-5 h-5" />
                {coin.name}
              </td>
              <td className="px-4 py-2">{coin.symbol}</td>
              <td className="px-4 py-2 text-right text-green-700 font-semibold">
                {coin.price.toLocaleString()} 원
              </td>
              <td className="px-4 py-2 text-right text-gray-600">
                {coin.marketCap.toLocaleString()} 원
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
