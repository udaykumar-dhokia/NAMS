import { School, Users, Download, Star } from 'lucide-react'

const Stats = () => {
  const stats = [
    { label: 'Institutes', value: '2.7K', icon: School },
    { label: 'Students', value: '18K', icon: Users },
    { label: 'Downloads', value: '20K', icon: Download },
    { label: 'Rating', value: '4.8', icon: Star },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container px-5 mx-auto">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="flex flex-col items-center justify-center p-6 bg-white rounded-md shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-primary text-white">
                <Icon size={24} />
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold bg-primary bg-clip-text text-transparent">
                {value}
              </h2>
              <p className="mt-2 text-gray-600 font-medium">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Stats
