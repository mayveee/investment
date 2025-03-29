// app/AppInitializer.tsx
'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { auth } from '@/lib/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { setUser, clearUser } from '@/store/authSlice'
import MenuNavBar from '@/components/MenuNavBar'

export default function AppInitializer({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isHomePage = pathname === '/'
  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user))
      } else {
        dispatch(clearUser())
      }
    })
    return () => unsubscribe()
  }, [dispatch])

  return (
    <html lang="ko">
      <body>
        <main>{children}</main>
        {!isHomePage && <MenuNavBar />}
      </body>
    </html>
  )
}
