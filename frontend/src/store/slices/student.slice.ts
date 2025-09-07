import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface Student {
  _id: string
  name: string
  email: string
  phone?: string
  enrollmentNo: string
  yearOfAdmission: number
  semester?: number
  degree: string
  department: string
  college: string
  careerGoals?: string[]
  interests?: string[]
  strengths?: string[]
  status: 'active' | 'inactive' | 'graduated' | 'suspended'
  createdAt?: string
  updatedAt?: string
}

interface StudentState {
  students: Student[]
}

const initialState: StudentState = {
  students: [],
}

const studentSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    setStudents(state, action: PayloadAction<Student[]>) {
      state.students = action.payload
    },
    clearStudents(state) {
      state.students = []
    },
  },
})

export const { setStudents, clearStudents } = studentSlice.actions
export default studentSlice.reducer
