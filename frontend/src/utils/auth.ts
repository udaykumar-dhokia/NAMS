import { axiosInstance } from '@/api/axiosInstance'

export const persistAdminData = async () => {
  try {
    const res = await axiosInstance.get('/admin/exists')
    return res?.data?.user || null
  } catch {
    return null
  }
}

export const persistCollegeData = async (id: string) => {
  try {
    const res = await axiosInstance.get(`/college/${id}`)
    return res?.data || null
  } catch (err) {
    console.error('Error fetching college:', err)
    return null
  }
}

export const persistDegreesData = async (collegeId: string) => {
  try {
    const res = await axiosInstance.get(`/degree/${collegeId}`)
    return res?.data || []
  } catch {
    return []
  }
}

export const persistDepartmentData = async (collegeId: string) => {
  try {
    const res = await axiosInstance.get(`/department/${collegeId}`)
    return res?.data || []
  } catch {
    return []
  }
}

export const persistCourseData = async (collegeId: string) => {
  try {
    const res = await axiosInstance.get(`/course/${collegeId}`)
    return res?.data || []
  } catch {
    return []
  }
}

export const persistTimetableData = async (collegeId: string) => {
  try {
    const res = await axiosInstance.get(`/timetables/${collegeId}`)
    return res?.data || []
  } catch {
    return []
  }
}

export const persistStudentData = async (collegeId: string) => {
  try {
    const res = await axiosInstance.get(`/student/college/${collegeId}`)
    return res?.data || []
  } catch (error) {
    console.error('Error fetching student data:', error)
    return []
  }
}

export const persistFacultyData = async () => {
  try {
    const res = await axiosInstance.get(`/faculty/exists`)
    return res?.data || []
  } catch (error) {
    console.error('Error fetching student data:', error)
    return []
  }
}
