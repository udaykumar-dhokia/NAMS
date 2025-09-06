import { configureStore } from '@reduxjs/toolkit'
import adminReducer from './slices/admin.slice'
import collegeReducer from './slices/college.slice'
import degreesReducer from './slices/degree.slice'
import departmentReducer from './slices/department.slice'
import courseReducer from './slices/course.slice'

export const store = configureStore({
  reducer: {
    adminReducer: adminReducer,
    collegeReducer: collegeReducer,
    degreesReducer: degreesReducer,
    departmentReducer: departmentReducer,
    courseReducer: courseReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
