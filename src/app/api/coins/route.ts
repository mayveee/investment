//app/api/coins/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
    const res = await fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=krw&order=market_cap_desc&per_page=100&page=1',
      { cache: 'no-store' }
    )
  
    if (!res.ok) {
      return NextResponse.json({ error: 'API 요청 실패' }, { status: res.status })
    }
  
    const data = await res.json()
  
    const formatted = data.map((coin: any) => ({
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol.toUpperCase(),
      current_price: coin.current_price,
      market_cap: coin.market_cap,
      image: coin.image,
      price_change_percentage_24h: coin.price_change_percentage_24h,
      updatedAt: new Date().toISOString(),
    }))
  
    return NextResponse.json(formatted)
  }
  