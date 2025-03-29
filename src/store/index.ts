// store/index.ts
import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,  // authSlice를 등록
    },
})

export type RootState = ReturnType<typeof store.getState>  // RootState 타입
export type AppDispatch = typeof store.dispatch  // Dispatch 타입

export default store