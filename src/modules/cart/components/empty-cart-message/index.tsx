import UnderlineLink from "@modules/common/components/underline-link"

const EmptyCartMessage = () => {
  return (
    <div className="bg-amber-100 px-8 py-24 flex flex-col justify-center items-center text-center">
      <h1 className="text-2xl-semi">Et ole valinnut osia tai tietokonetta</h1>
      <p className="text-base-regular mt-4 mb-6 max-w-[32rem]">
        Valitse tietokone valmisvalikoimastamme tai valitse osat itse!
      </p>
      <div>
        <UnderlineLink href="/store">Valmismallisto</UnderlineLink>
      </div>
      <div>
        <UnderlineLink href="/designer">Designer</UnderlineLink>
      </div>
    </div>
  )
}

export default EmptyCartMessage
