// 📄 app/api/price/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(_req: NextRequest) {
  const res = await fetch(
    'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=krw',
    { cache: 'no-store' }
  )

  if (!res.ok) {
    return NextResponse.json({ error: '가격 가져오기 실패' }, { status: res.status })
  }

  const data = await res.json()

  return NextResponse.json({
    name: 'Bitcoin',
    symbol: 'BTC',
    price: data.bitcoin.krw,
    updatedAt: new Date().toISOString(),
  })
}
