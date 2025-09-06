import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface Degree {
  _id?: string
  name: string
  duration: number
  semesters?: number
  departments?: string[]
  college: string
  createdBy?: string
  status?: 'active' | 'inactive'
}

interface DegreeState {
  degrees: Degree[]
}

const initialState: DegreeState = {
  degrees: [],
}

const degreeSlice = createSlice({
  name: 'degree',
  initialState,
  reducers: {
    setDegrees: (state, action: PayloadAction<Degree[]>) => {
      state.degrees = action.payload
    },
    addDegree: (state, action: PayloadAction<Degree>) => {
      state.degrees.push(action.payload)
    },
    updateDegree: (state, action: PayloadAction<Degree>) => {
      const index = state.degrees.findIndex((d) => d._id === action.payload._id)
      if (index !== -1) {
        state.degrees[index] = action.payload
      }
    },
    removeDegree: (state, action: PayloadAction<string>) => {
      state.degrees = state.degrees.filter((d) => d._id !== action.payload)
    },
    resetDegrees: () => initialState,
  },
})

export const {
  setDegrees,
  addDegree,
  updateDegree,
  removeDegree,
  resetDegrees,
} = degreeSlice.actions

export default degreeSlice.reducer
