import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface Course {
  _id: string
  code: string
  name: string
  credits: number
  department: string
  degree: string
  faculty?: string
  type?: 'core' | 'elective' | 'lab'
  description?: string
  status?: 'active' | 'inactive'
  createdAt?: string
  updatedAt?: string
}

interface CourseState {
  courses: Course[]
}

const initialState: CourseState = {
  courses: [],
}

const courseSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setCourses: (state, action: PayloadAction<Course[]>) => {
      state.courses = action.payload
    },
    addCourse: (state, action: PayloadAction<Course>) => {
      state.courses.push(action.payload)
    },
    updateCourse: (state, action: PayloadAction<Course>) => {
      state.courses = state.courses.map((c) =>
        c._id === action.payload._id ? action.payload : c,
      )
    },
    removeCourse: (state, action: PayloadAction<string>) => {
      state.courses = state.courses.filter((c) => c._id !== action.payload)
    },
    clearCourses: (state) => {
      state.courses = []
    },
  },
})

export const {
  setCourses,
  addCourse,
  updateCourse,
  removeCourse,
  clearCourses,
} = courseSlice.actions

export default courseSlice.reducer
