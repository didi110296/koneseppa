import { useMobileMenu } from "@lib/context/mobile-menu-context"
import Hamburger from "@modules/common/components/hamburger"
import DropdownMenu from "@modules/layout/components/dropdown-menu"
import MobileMenu from "@modules/mobile-menu/templates"
import DesktopSearchModal from "@modules/search/templates/desktop-search-modal"
import clsx from "clsx"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const Nav = ({ dark }: { dark: boolean }) => {
  const { pathname } = useRouter()
  const [isHome, setIsHome] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  //useEffect that detects if window is scrolled > 5px on the Y axis
  useEffect(() => {
    if (isHome) {
      const detectScrollY = () => {
        if (window.scrollY > 5) {
          setIsScrolled(true)
        } else {
          setIsScrolled(false)
        }
      }

      window.addEventListener("scroll", detectScrollY)

      return () => {
        window.removeEventListener("scroll", detectScrollY)
      }
    }
  }, [isHome])

  useEffect(() => {
    pathname === "/" ? setIsHome(true) : pathname === "/designer" ? setIsHome(true) : setIsHome(false)
  }, [pathname])

  const { toggle } = useMobileMenu()

  return (
    <div
      className={clsx("sticky top-0 inset-x-0 z-50 group", {
        "!fixed": isHome,
      })}
    >
      <header
        className={clsx(
          `relative h-16 px-8 mx-auto transition-colors bg-transparent border-b border-transparent duration-200 group-hover:bg-${dark ? 'slate-800' : 'white'} ${dark ? '' : 'group-hover:border-gray-200'}`,
          {
            [`!bg-${dark ? 'slate-800' : 'white'} ${dark ? '' : '!border-gray-200'}`]: !isHome || isScrolled,
          }
        )}
      >
        <nav
          className={clsx(
            `text-${dark ? 'white' : 'gray-900'} flex items-center justify-between w-full h-full text-small-regular transition-colors duration-200`,
            {
              [`text-white group-hover:text-${dark ? 'white' : 'gray-900'}`]: isHome && !isScrolled,
            }
          )}
        >
          <div className="flex-1 basis-0 h-full flex items-center">
            <div className="block small:hidden">
              <Hamburger setOpen={toggle} />
            </div>
            <div className="hidden small:block h-full">
              <DropdownMenu dark={dark} />
            </div>
          </div>

          <div className="flex items-center h-full">
            <Link href="/">
              <a className="text-xl-semi uppercase">koneseppa.fi</a>
            </Link>
          </div>

          <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
            <div className="hidden small:flex items-center gap-x-6 h-full">
              {process.env.FEATURE_SEARCH_ENABLED && <DesktopSearchModal />}
              <Link href="/account">
                <a>Account</a>
              </Link>
              <Link href="/cart">
                <a>Cart</a>
              </Link>
            </div>
          </div>
        </nav>
        <MobileMenu />
      </header>
    </div>
  )
}

export default Nav
