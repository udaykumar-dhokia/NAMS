import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface Faculty {
  _id?: string
  name: string
  email: string
  phone?: string
  college?: string
  department?: string
  designation?: string
  isHOD?: boolean
}

interface FacultyState {
  faculty: Faculty | null
  token: string | null
  loading: boolean
  error: string | null
}

const initialState: FacultyState = {
  faculty: null,
  token: null,
  loading: false,
  error: null,
}

const facultySlice = createSlice({
  name: 'faculty',
  initialState,
  reducers: {
    startLoading(state) {
      state.loading = true
      state.error = null
    },

    // Successful login/register
    setFaculty(state, action: PayloadAction<Faculty>) {
      state.faculty = action.payload
      state.loading = false
      state.error = null
    },

    // Set JWT token if needed
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload
    },

    // Logout
    logout(state) {
      state.faculty = null
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

export const { startLoading, setFaculty, setToken, logout, setError } =
  facultySlice.actions
export default facultySlice.reducer
