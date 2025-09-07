import { axiosInstance } from '@/api/axiosInstance'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/_protected/admin/_layout/students')({
  component: RouteComponent,
})

function RouteComponent() {
  const [file, setFile] = useState<File | null>(null)
  const [message, setMessage] = useState('')

  const handleUpload = async () => {
    if (!file) return alert('Please select a file')

    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await axiosInstance.post('/student/upload-csv', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      setMessage(res.data.message)
    } catch (error: any) {
      setMessage(error.response?.data?.message || 'Upload failed')
    }
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Upload Students CSV</h1>

      <input
        type="file"
        accept=".csv"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      <button
        onClick={handleUpload}
        className="px-4 py-2 bg-blue-600 text-white rounded-md"
      >
        Upload
      </button>

      {message && <p className="mt-2 text-green-600">{message}</p>}
    </div>
  )
}
