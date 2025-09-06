import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface Department {
  _id: string
  name: string
  shortName: string
  code?: string
  college: string
  degreesOffered: string[]
  hod?: string
  faculty: string[]
  createdAt?: string
  updatedAt?: string
}

interface DepartmentState {
  departments: Department[]
}

const initialState: DepartmentState = {
  departments: [],
}

const departmentSlice = createSlice({
  name: 'departments',
  initialState,
  reducers: {
    setDepartments: (state, action: PayloadAction<Department[]>) => {
      state.departments = action.payload
    },
    addDepartment: (state, action: PayloadAction<Department>) => {
      state.departments.push(action.payload)
    },
    removeDepartment: (state, action: PayloadAction<string>) => {
      state.departments = state.departments.filter(
        (dept) => dept._id !== action.payload,
      )
    },
    clearDepartments: (state) => {
      state.departments = []
    },
  },
})

export const {
  setDepartments,
  addDepartment,
  removeDepartment,
  clearDepartments,
} = departmentSlice.actions

export default departmentSlice.reducer
