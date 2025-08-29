import { Twitter, Github } from "lucide-react"
import { Link } from "react-router" 

export function Footer() {
  return (
    <footer className="w-full border-t mt-10">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center gap-3 py-6 px-4">
        <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-300 text-center">
          © {new Date().getFullYear()} <span className="font-semibold">@neyuj_11</span> · All rights free.
        </p>
        <div className="flex items-center gap-4">
          <span className="text-sm text-neutral-500">Follow me</span>
          <Link
            to="https://twitter.com/neyuj_11"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-800 transition"
          >
            <Twitter size={20} />
          </Link>
          <Link
            to="https://github.com/ujjwal2061"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-800 transition"
          >
            <Github size={20} />
          </Link>
        </div>
      </div>
    </footer>
  )
}
