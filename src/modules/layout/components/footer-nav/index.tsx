import clsx from "clsx"
import { useCollections } from "medusa-react"
import Link from "next/link"
import CountrySelect from "../country-select"

const FooterNav = () => {
  const { collections } = useCollections()

  return (
    <div className="content-container flex flex-col gap-y-8 pt-16 pb-8">
      <div className="flex flex-col gap-y-6 xsmall:flex-row items-start justify-between">
        <div>
          <Link href="/">
            <a className="text-xl-semi uppercase">koneseppa.fi</a>
          </Link>
        </div>
        <div className="text-small-regular grid grid-cols-3 gap-x-16">
          <div className="flex flex-col gap-y-2">
            <span className="text-base-semi">Prebuilts</span>
            <ul
              className={clsx("grid grid-cols-1 gap-y-2", {
                "grid-cols-2": (collections?.filter((i) => i.metadata.set === "0")?.length || 0) > 4,
              })}
            >
              {collections?.filter((i) => i.metadata.set === "0")?.map((c) => (
                <li key={c.id}>
                  <Link href={`/collections/${c.handle}`}>
                    <a>{c.title}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-y-2">
            <span className="text-base-semi">Accessories</span>
            <ul
              className={clsx("grid grid-cols-1 gap-y-2 gap-x-2", {
                "grid-cols-2": (collections?.filter((i) => i.metadata.set === "1")?.length || 0) > 4,
              })}
            >
              {collections?.filter((i) => i.metadata.set === "1")?.map((c) => (
                <li key={c.id}>
                  <Link href={`/collections/${c.handle}`}>
                    <a>{c.title}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-y-2">
            <span className="text-base-semi">Company</span>
            <ul className="grid grid-cols-1 gap-y-2">
              <li>
                <Link href="/meista" passHref>
                  <a>
                    About us
                  </a>
                </Link>
              </li>
              <li>
              <Link href="/tietosuoja" passHref>
                  <a>
                    Privacy policy
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/kayttoehdot" passHref>
                  <a>
                    Terms of service
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/takuu" passHref>
                  <a>
                    Warranty
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex flex-col-reverse gap-y-4 justify-center xsmall:items-center xsmall:flex-row xsmall:items-end xsmall:justify-between">
        <span className="text-xsmall-regular text-gray-500">
          © Copyright 2022 Koneseppa.fi
        </span>
      </div>
    </div>
  )
}

export default FooterNav
