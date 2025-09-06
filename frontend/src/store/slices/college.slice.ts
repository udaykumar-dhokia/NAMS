import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface College {
  _id?: string
  name: string
  address?: {
    street?: string
    city?: string
    state?: string
    country?: string
    pincode?: string
  }
  contact?: {
    email: string
    phone?: string
    website?: string
  }
}

interface CollegeState {
  colleges: College | null
}

const initialState: CollegeState = {
  colleges: null,
}

const collegeSlice = createSlice({
  name: 'colleges',
  initialState,
  reducers: {
    setColleges: (state, action: PayloadAction<College>) => {
      state.colleges = action.payload
    },
  },
})

export const { setColleges } = collegeSlice.actions
export default collegeSlice.reducer
