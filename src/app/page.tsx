// app/login/page.tsx

'use client'

import { useState } from 'react'
import { auth, provider } from '@/lib/firebase'
import { signInWithPopup } from 'firebase/auth'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider)
      console.log('로그인 성공:', result.user)
      router.push('/home')

    } catch (error) {
      if (error instanceof Error) {
        setError('로그인 실패: ' + error.message)
      } else {
        setError('알 수 없는 오류가 발생했습니다.')
      }
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Google 로그인</h1>
      {error && <p className="text-red-500">{error}</p>}
      <button
        onClick={signInWithGoogle}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Google로 로그인
      </button>
    </div>
  )
}
