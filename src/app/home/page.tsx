// app/home/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'

export default function HomePage() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
    })
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">홈 페이지</h1>
      {user ? (
        <p>환영합니다, {user.email}</p>
      ) : (
        <p>로그인 후 접속 가능합니다.</p>
      )}
    </div>
  )
}
