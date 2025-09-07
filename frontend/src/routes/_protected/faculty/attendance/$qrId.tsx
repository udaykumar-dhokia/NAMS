// src/routes/_protected/faculty/attendance/$qrId.tsx
import { createFileRoute, useParams } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

const socket = io('http://localhost:3001')

export const Route = createFileRoute('/_protected/faculty/attendance/$qrId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { qrId } = useParams({ from: '/_protected/faculty/attendance/$qrId' })
  const [qrImage, setQrImage] = useState<string | null>(null)
  const [attendance, setAttendance] = useState<any[]>([])

  useEffect(() => {
    // Fetch initial QR + attendance
    const fetchQR = async () => {
      const res = await fetch(`http://localhost:3001/api/qrcode/${qrId}`)
      const data = await res.json()
      console.log(data)
      setQrImage(data.image_url)
      setAttendance(data.attendance || [])
    }
    fetchQR()

    // Listen for real-time QR updates
    socket.on('qrChange', (change) => {
      if (change.fullDocument?._id === qrId) {
        setQrImage(change.fullDocument.qrImage)
      }
    })

    // Listen for real-time attendance updates
    // inside useEffect in $qrId.tsx
    socket.on('attendanceChange', (updatedDoc) => {
      if (updatedDoc._id === qrId) {
        setAttendance(updatedDoc) // replace with fresh doc
      }
    })

    return () => {
      socket.off('qrChange')
      socket.off('attendanceChange')
    }
  }, [qrId])

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-6">
      <h1 className="text-2xl font-bold">Attendance QR Code</h1>

      {qrImage ? (
        <img src={qrImage} alt="QR Code" className="w-64 h-64" />
      ) : (
        <p>Loading QR...</p>
      )}

      <div className="w-full max-w-md mt-8">
        <h2 className="text-xl font-semibold mb-4">Live Attendance</h2>
        {attendance.length > 0 ? (
          <ul className="space-y-2">
            {attendance.map((student, idx) => (
              <li
                key={idx}
                className="p-2 border rounded-lg shadow-sm bg-gray-100"
              >
                {student.name} ({student.rollNo})
              </li>
            ))}
          </ul>
        ) : (
          <p>No students marked present yet.</p>
        )}
      </div>
    </div>
  )
}
