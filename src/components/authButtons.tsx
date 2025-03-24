// components/AuthButtons.tsx
'use client'

import { supabase } from "@/lib/supabase/client"

export const AuthButtons = () => {
  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'http://localhost:3000/home',
      },
    })
  }

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  return (
    <div className="flex gap-4">
      <button onClick={signInWithGoogle}>Login with Google</button>
      <button onClick={signOut}>Logout</button>
    </div>
  )
}
