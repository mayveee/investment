// app/page.tsx

'use client'

import { useState } from 'react'
import { signInWithGoogle } from '@/lib/login'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleLogin = async () => {
    try {
      const user = await signInWithGoogle()
      console.log('로그인 성공:', user)
      router.push('/home')
    } catch (error) {
      setError(error instanceof Error ? error.message : '알 수 없는 오류')
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Google 로그인</h1>
      {error && <p className="text-red-500">{error}</p>}
      <button
        onClick={handleLogin}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Google로 로그인
      </button>
    </div>
  )
}
