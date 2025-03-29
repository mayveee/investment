// app/setting/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { auth } from '@/lib/firebase'  // Firebase 설정 파일에서 auth 객체 가져오기
import { signOut } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'

export default function SettingPage() {
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()
    const user = useSelector((state: RootState) => state.auth.user)

    useEffect(() => {
      if (!user) {
        router.push('/')
      }
    }, [user, router])
      
    const handleSignOut = async () => {
        try {
        await signOut(auth)
        console.log('로그아웃 성공')
        router.push('/')
        } catch (error: unknown) {
        if (error instanceof Error) {
            setError('로그아웃 실패: ' + error.message)
        } else {
            setError('알 수 없는 오류가 발생했습니다.')
        }
        }
    }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">설정</h1>
      {error && <p className="text-red-500">{error}</p>}
      <button
        onClick={handleSignOut}
        className="px-4 py-2 bg-red-500 text-white rounded"
      >
        로그아웃
      </button>
    </div>
  )
}
