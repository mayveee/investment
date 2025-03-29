// app/stock/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'

const fetchStockData = async () => {
  // 여기서는 하드코딩된 데이터를 반환
  return [
    { symbol: 'AAPL', name: 'Apple Inc.', price: 145.09, change: -1.23 },
    { symbol: 'GOOGL', name: 'Google LLC', price: 2745.69, change: 12.30 },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 3450.70, change: 8.45 },
  ]
}

export default function StockPage() {
    const [stocks, setStocks] = useState<any[]>([])
    const router = useRouter()
    const user = useSelector((state: RootState) => state.auth.user)

    useEffect(() => {
        if (!user) {
            router.push('/')
        }
    }, [user, router])
    
    useEffect(() => {
        
        const loadStockData = async () => {
        const data = await fetchStockData()
        setStocks(data)
        }

        loadStockData()
    }, [])

    return (
        <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">주식 보기</h1>
        <table className="w-full table-auto">
            <thead>
            <tr>
                <th className="border px-4 py-2">종목</th>
                <th className="border px-4 py-2">가격</th>
                <th className="border px-4 py-2">변동폭</th>
            </tr>
            </thead>
            <tbody>
            {stocks.map((stock) => (
                <tr key={stock.symbol}>
                <td className="border px-4 py-2">{stock.name}</td>
                <td className="border px-4 py-2">{stock.price}</td>
                <td className={`border px-4 py-2 ${stock.change < 0 ? 'text-red-500' : 'text-green-500'}`}>
                    {stock.change}
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    )
}
