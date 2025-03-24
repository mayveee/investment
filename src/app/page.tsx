// app/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { AuthButtons } from '@/components/authButtons'

export default function Home() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null)
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold">Google OAuth 예제</h1>
      {user ? (
        <div>
          <p>Welcome, {user.email}</p>
        </div>
      ) : (
        <p>Please log in</p>
      )}
      <AuthButtons />
    </main>
  )
}
