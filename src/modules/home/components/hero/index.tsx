import UnderlineLink from "@modules/common/components/underline-link"
import Image from "next/image"

const Hero = () => {
  return (
    <div className="h-[90vh] w-full relative">
      <div className="text-white absolute inset-0 z-10 flex flex-col justify-center items-center text-center small:text-left small:items-start small:p-32">
        <h1 className="text-6xl mb-16 drop-shadow-md shadow-black" style={{ fontFamily: "'Catamaran', sans-serif", fontWeight: 900 }}>
          Time for a new computer?
        </h1>
        <p className="text-base-regular max-w-[32rem] mb-6 drop-shadow-md shadow-black ">
          You can design your own computer easily with our designer tool or choose from our amazing prebuilt catalog.
        </p>
        <UnderlineLink href="/designer">Design your own computer</UnderlineLink>
        <br />
        <UnderlineLink href="/store">Prebuilts</UnderlineLink>
      </div>
      <Image
        src="/hero.jpg"
        layout="fill"
        loading="eager"
        priority={true}
        quality={90}
        objectFit="cover"
        alt="Landing Page Taustakuva"
        className="absolute inset-0"
        draggable="false"
      />
    </div>
  )
}

export default Hero
