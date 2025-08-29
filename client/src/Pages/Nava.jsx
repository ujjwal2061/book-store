import { Menu, X, User2Icon } from "lucide-react"
import { useContext, useEffect, useState } from "react"
import { Link } from "react-router"
import { Usercontext } from "../Users/context/userContext"

import { Button } from "@/components/ui/button"
import { Theme } from "@/components/ui/theme-toggle" 

const Nava = () => {
  const [isMobileOpen, setMobileOpen] = useState(false)
  const { user } = useContext(Usercontext)
  const [isScrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-20 w-full transition-colors ${
        isScrolled ? " bg-neutral-100 dark:bg-black/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between py-3">
          <Link
            to="/"
            className="text-xl font-bold font-serif tracking-wide hover:opacity-80 transition"
          >
            Perlego
          </Link>
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <Link
                to="/profile"
                className="flex items-center gap-2 px-3 py-1.5 border border-slate-100 dark:border-gray-900 rounded-lg  transition"
              >
                <User2Icon size={18} />
                <span>{user.data.firstname}</span>
              </Link>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="secondary">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button>Signup</Button>
                </Link>
              </>
            )}
            <Theme />
          </div>
          <button
            onClick={() => setMobileOpen(!isMobileOpen)}
            className="md:hidden p-2 rounded-md "
          >
            {isMobileOpen ? <X /> : <Menu />}
          </button>
        </nav>
        {isMobileOpen && (
          <div className="md:hidden flex items-center  gap-2  p-2 rounded-lg  backdrop-blur-md">
            {user ? (
              <Link
                to="/profile"
                className="flex items-center gap-2 px-3 py-2 rounded-md  transition"
              >
                <User2Icon size={18} />
                <span>{user.data.firstname}</span>
              </Link>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="secondary" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="w-full">Signup</Button>
                </Link>
              </>
            )}
            <div className="mt-2">
              <Theme />
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Nava
