// components/MenuNavBar.tsx
'use client'

import { useRouter } from 'next/navigation'

export default function MenuNavBar() {
  const router = useRouter()

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-800 text-white flex justify-around items-center py-2">
      <button
        onClick={() => router.push('/home')}
        className="flex flex-col items-center justify-center">
        <span>홈</span>
      </button>
      <button
        onClick={() => router.push('/stock')}
        className="flex flex-col items-center justify-center">
        <span>주식</span>
      </button>
      <button
        onClick={() => router.push('/setting')}
        className="flex flex-col items-center justify-center">
        <span>설정</span>
      </button>
    </div>
  )
}
