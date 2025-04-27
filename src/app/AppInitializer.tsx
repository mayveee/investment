// app/AppInitializer.tsx
'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { auth, db } from '@/lib/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { setUser, clearUser } from '@/store/authSlice'
import MenuNavBar from '@/components/MenuNavBar'
import { doc, getDoc } from 'firebase/firestore'

export default function AppInitializer({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isHomePage = pathname === '/'
  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const handleAuth = async () => {
        if (user) {
          const userRef = doc(db, 'users', user.uid)
          const snapshot = await getDoc(userRef)
          const userData = snapshot.data()
  
          dispatch(setUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            balance: userData?.balance ?? 1000000,
          }))
        } else {
          dispatch(clearUser())
        }
      }

      handleAuth()
    })
    return () => unsubscribe()
  }, [dispatch])

  return (
    <html lang="ko">
      <body>
        <div className='flex flex-col min-h-screen relative'>
          <main className='flex-1 overflow-auto pb-20'>
            {children}
          </main>
          {!isHomePage && <MenuNavBar />}
        </div>
      </body>
    </html>
  )
}
