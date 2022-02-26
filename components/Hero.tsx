import Image from 'next/image'

const Hero = () => {
  return (
    <div className="border-y border-black bg-amber-400 py-10 px-6 lg:py-5">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
        <div className="space-y-5">
          <h1 className="max-w-xl font-serif text-5xl md:text-7xl">
            Medium is a place to write, read, and connect
          </h1>
          <h2 className="max-w-md">
            It's easy and free to post your thinking on any topic and connect
            with millions of readers.
          </h2>
        </div>

        <div className="hidden md:inline-flex">
          <Image
            src="/images/medium-m-icon.png"
            alt="Medium Logo"
            width="384"
            height="384"
          />
        </div>
      </div>
    </div>
  )
}

export default Hero
