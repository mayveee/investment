// store/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
    user: any | null
}

const initialState: AuthState = {
    user: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<any>) {
            state.user = action.payload  // user를 업데이트하는 리듀서
        },
        clearUser(state) {
            state.user = null  // 로그아웃 시 user를 null로 설정
        },
    },
})

export const { setUser, clearUser } = authSlice.actions
export default authSlice.reducer
