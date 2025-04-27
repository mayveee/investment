// app/stock/page.tsx
'use client'

import { useEffect, useState } from 'react'

interface Coin {
    id: string
    name: string
    symbol: string
    current_price: number
    market_cap: number
    image: string
    price_change_percentage_24h : number
    updatedAt: string
  }

export default function StockPage() {
  const [coins, setCoins] = useState<Coin[]>([])
  const [lastUpdated, setLastUpdated] = useState<string>('')

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const res = await fetch('/api/coins')
        const result = await res.json()
        if (Array.isArray(result)) {
          setCoins(result)
          setLastUpdated(new Date().toLocaleString())
        } else {
          console.error('API 응답이 배열이 아님:', result)
        }
      } catch (error){
        console.error('fetchCoins 에러 발생:', error)
      }
    }

    fetchCoins()
    const interval = setInterval(fetchCoins, 60000) // 10초마다 갱신
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="p-6 overflow-auto">
      <h1 className="text-2xl font-bold mb-4">시가총액 상위 100 코인</h1>
      <p className="text-sm text-gray-500 mb-4">업데이트 시간: {lastUpdated}</p>
      <div className="flex flex-col gap-4 ">
        {coins.map((coin) => (
          <div key={coin.id} className="flex items-center justify-between border-b pb-2">
            <div className="flex items-center gap-3">
              <img src={coin.image} alt={coin.name} className="w-8 h-8 object-cover" />
              <div className="flex flex-col">
                <span className="font-semibold">{coin.name}</span>
                <span className="text-gray-400 text-sm">{coin.symbol.toUpperCase()}</span>
              </div>
            </div>
            <div className="text-right">
              <div className={coin.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'}>
              <span className="text-gray-400 text-xs ml-1">24시간 대비 </span>
                {coin.price_change_percentage_24h >= 0 ? '▲' : '▼'}
                {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
              </div>
              <div className="text-gray-400 text-sm">
                {coin.current_price.toLocaleString()} 원
              </div>
            </div>
          </div>
        ))}
      </div>  
    </div>
  )
}
