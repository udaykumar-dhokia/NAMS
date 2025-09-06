// src/store/adminSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface AdminState {
  admin: {
    _id?: string
    name: string
    email: string
    phone?: string
    college?: string
  } | null
  token: string | null
  loading: boolean
  error: string | null
}

const initialState: AdminState = {
  admin: null,
  token: null,
  loading: false,
  error: null,
}

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    startLoading(state) {
      state.loading = true
      state.error = null
    },

    // Successful login/register
    setAdmin(state, action: PayloadAction<any>) {
      state.admin = action.payload
      state.loading = false
      state.error = null
    },

    // Logout
    logout(state) {
      state.admin = null
      state.token = null
      state.loading = false
      state.error = null
    },

    setError(state, action: PayloadAction<string>) {
      state.error = action.payload
      state.loading = false
    },
  },
})

export const { startLoading, setAdmin, logout, setError } = adminSlice.actions
export default adminSlice.reducer
