import { axiosInstance } from '@/api/axiosInstance'

export const persistAdminData = async () => {
  try {
    const res = await axiosInstance.get('/admin/exists')
    return res?.data?.user || null
  } catch {
    return null
  }
}
