import { configureStore } from '@reduxjs/toolkit'
import adminReducer from './slices/admin.slice'
import collegeReducer from './slices/college.slice'
import degreesReducer from './slices/degree.slice'
import departmentReducer from './slices/department.slice'
import courseReducer from './slices/course.slice'
import timetableReducer from './slices/timetable.slice'
import studentReducer from './slices/student.slice'
import facultyReducer from './slices/faculty.slice'

export const store = configureStore({
  reducer: {
    adminReducer: adminReducer,
    collegeReducer: collegeReducer,
    degreesReducer: degreesReducer,
    departmentReducer: departmentReducer,
    courseReducer: courseReducer,
    timetableReducer: timetableReducer,
    studentReducer: studentReducer,
    facultyReducer: facultyReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
