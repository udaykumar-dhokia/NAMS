import { useState } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { axiosInstance } from '@/api/axiosInstance'

export const Route = createFileRoute('/_public/auth/_layout/register')({
  component: RegisterCollege,
})

function RegisterCollege() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    country: '',
    pincode: '',
    email: '',
    phone: '',
    website: '',
    adminName: '',
    adminEmail: '',
    adminPassword: '',
    adminConfirmPassword: '',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    if (form.adminPassword !== form.adminConfirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    try {
      // 1️⃣ Register college
      const collegeRes = await axiosInstance.post('/college/register', {
        name: form.name,
        address: {
          street: form.street,
          city: form.city,
          state: form.state,
          country: form.country,
          pincode: form.pincode,
        },
        contact: {
          email: form.email,
          phone: form.phone,
          website: form.website,
        },
      })

      const collegeData = collegeRes.data

      // 2️⃣ Register admin linked to this college
      await axiosInstance.post('/auth/a/register', {
        name: form.adminName,
        email: form.adminEmail,
        password: form.adminPassword,
        college: collegeData.id,
      })

      setSuccess('College & Admin registered successfully!')
      setTimeout(() => {
        navigate({ to: '/auth/login' })
      }, 1500)
    } catch (err: any) {
      console.error(err)
      if (err.response?.data?.message) {
        setError(err.response.data.message)
      } else {
        setError('Server error')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-5xl rounded-md shadow-lg overflow-hidden">
        {/* Left side - Picture */}
        <div className="hidden md:flex items-center justify-center bg-gray-100">
          <img
            src="https://images.unsplash.com/photo-1581362072978-14998d01fdaa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTU3fHxjb2xsZWdlfGVufDB8fDB8fHww"
            alt="College Illustration"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right side - Form */}
        <Card className="w-full rounded-none">
          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-4">
              <h1 className="text-xl font-bold">Institute Details</h1>
              <div className="space-y-2">
                <Label htmlFor="name">College Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="street">Street</Label>
                  <Input
                    id="street"
                    name="street"
                    value={form.street}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    name="country"
                    value={form.country}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pincode">Pincode</Label>
                <Input
                  id="pincode"
                  name="pincode"
                  value={form.pincode}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    name="website"
                    value={form.website}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <h1 className="text-xl font-bold">Admin Details</h1>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="adminName">Name</Label>
                  <Input
                    id="adminName"
                    name="adminName"
                    value={form.adminName}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="adminEmail">Email</Label>
                  <Input
                    id="adminEmail"
                    name="adminEmail"
                    type="email"
                    value={form.adminEmail}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="adminPassword">Password</Label>
                  <Input
                    id="adminPassword"
                    name="adminPassword"
                    type="password"
                    value={form.adminPassword}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="adminConfirmPassword">Confirm Password</Label>
                  <Input
                    id="adminConfirmPassword"
                    name="adminConfirmPassword"
                    type="password"
                    value={form.adminConfirmPassword}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}
              {success && <p className="text-green-500 text-sm">{success}</p>}

              <Button type="submit" disabled={loading}>
                {loading ? 'Registering...' : 'Continue'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
