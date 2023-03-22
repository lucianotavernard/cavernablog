import { ActiveLink } from './ActiveLink'

export function Header() {
  return (
    <header className="absolute top-0 left-0 w-full h-20 bg-[#202024]">
      <div className="flex items-center w-full max-w-6xl h-full mx-auto px-8">
        <img
          className="inline-block h-6 mr-8"
          src="/images/logo.svg"
          alt="ig.news"
        />

        <nav className="flex justify-center gap-4">
          <ActiveLink
            href="/"
            activeClassName="border-b-2 border-[#04D361] font-bold !text-white"
          >
            <span className="transition-colors relative inline-block h-20 px-2 leading-[5rem] text-[#737380] hover:text-white">
              Home
            </span>
          </ActiveLink>

          <ActiveLink
            href="/posts"
            activeClassName="border-b-2 border-[#04D361] font-bold !text-white"
          >
            <span className="transition-colors relative inline-block h-20 px-2 leading-[5rem] text-[#737380] hover:text-white">
              Posts
            </span>
          </ActiveLink>
        </nav>
      </div>
    </header>
  )
}
