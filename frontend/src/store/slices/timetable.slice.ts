// src/store/slices/timetable.slice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface TimetableEntry {
  course: string // courseId
  start: string
  end: string
}

export interface TimetableDays {
  Mon: TimetableEntry[]
  Tue: TimetableEntry[]
  Wed: TimetableEntry[]
  Thu: TimetableEntry[]
  Fri: TimetableEntry[]
  Sat: TimetableEntry[]
}

export interface Timetable {
  _id?: string
  semester: number
  department: string
  college: string
  timetable: TimetableDays
}

interface TimetableState {
  timetables: Timetable[]
}

const initialState: TimetableState = {
  timetables: [],
}

const timetableSlice = createSlice({
  name: 'timetable',
  initialState,
  reducers: {
    setTimetables: (state, action: PayloadAction<Timetable[]>) => {
      state.timetables = action.payload
    },
    addTimetable: (state, action: PayloadAction<Timetable>) => {
      state.timetables.push(action.payload)
    },
    updateTimetable: (state, action: PayloadAction<Timetable>) => {
      const index = state.timetables.findIndex(
        (t) => t._id === action.payload._id,
      )
      if (index !== -1) {
        state.timetables[index] = action.payload
      }
    },
    removeTimetable: (state, action: PayloadAction<string>) => {
      state.timetables = state.timetables.filter(
        (t) => t._id !== action.payload,
      )
    },
    resetTimetables: () => initialState,
  },
})

export const {
  setTimetables,
  addTimetable,
  updateTimetable,
  removeTimetable,
  resetTimetables,
} = timetableSlice.actions

export default timetableSlice.reducer
