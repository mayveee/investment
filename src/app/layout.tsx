// app/layout.tsx
'use client'

import { Provider } from 'react-redux'
import { store } from '@/store'
import { ReactNode } from 'react'
import AppInitializer from './AppInitializer'
import './globals.css'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <AppInitializer>{children}</AppInitializer>
    </Provider>
  )
}
