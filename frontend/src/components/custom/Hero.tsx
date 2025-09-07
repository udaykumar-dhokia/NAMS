const Hero = () => {
  return (
    <section className="bg-gray-50">
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        {/* Left content */}
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-6 font-extrabold text-gray-900 leading-tight">
            National Academic{' '}
            <span className="text-primary">Management System</span>
          </h1>
          <p className="mb-8 text-lg leading-relaxed text-gray-600 max-w-lg">
            A centralized platform designed to simplify academic workflows for
            institutes, students, and administrators. Manage courses,
            departments, degrees, and alumni with powerful tools — all in one
            place.
          </p>
          <div className="flex justify-center gap-4">
            <button className="inline-flex text-white bg-primary border-0 py-3 px-8 focus:outline-none hover:bg-primary/80 rounded-md text-lg transition">
              Onboard Institute
            </button>
            <button className="inline-flex text-primary border border-primary py-3 px-8 focus:outline-none hover:bg-primary/10 rounded-md text-lg transition">
              Login Now
            </button>
          </div>
        </div>

        {/* Right image */}
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
          <img
            className="object-cover object-center rounded-2xl shadow-lg"
            alt="hero"
            src="https://plus.unsplash.com/premium_photo-1682974407026-581fe0e550ea?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjgwfHxjb2xsZWdlfGVufDB8fDB8fHww"
          />
        </div>
      </div>
    </section>
  )
}

export default Hero
