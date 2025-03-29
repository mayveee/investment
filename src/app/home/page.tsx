// app/home/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/index'

export default function HomePage() {
  const router = useRouter()
  const user = useSelector((state: RootState) => state.auth.user)

  useEffect(() => {
    if (!user) {
      router.push('/')
    }
  }, [user, router])

  return (
    <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">홈 페이지</h1>
        {user ? (
            <div>
                <p>{user.displayName}님 환영합니다!</p>
            </div> 
        ) : (
            <p>로그인 하셈</p>
        )}
             
    </div>
  )
}
