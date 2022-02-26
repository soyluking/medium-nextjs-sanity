import Image from 'next/image'
import Link from 'next/link'
import Medium from './Medium'

const Header = () => {
  return (
    <header className="bg-amber-400 py-5 px-6">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
        <div className="flex items-center space-x-5">
          <Link href="/">
            <a>
              <Medium className="w-44" />
            </a>
          </Link>
          <div className="hidden items-center space-x-5 text-sm md:inline-flex">
            <Link href="/">
              <a>About</a>
            </Link>
            <Link href="/">
              <a>Contact</a>
            </Link>
            <Link href="/">
              <a className="rounded-full border border-black px-5 py-1.5">
                Follow
              </a>
            </Link>
          </div>
        </div>
        <div className="flex items-center space-x-5 text-sm">
          <Link href="/">
            <a>Sign In</a>
          </Link>
          <Link href="/">
            <a className="rounded-full border border-black bg-black px-5 py-1.5 text-white">
              Get Started
            </a>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header