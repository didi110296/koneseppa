import { Dialog } from "@headlessui/react";
import Alert from "@modules/common/icons/alert";
import Info from "@modules/common/icons/info";
import Selected from "@modules/common/icons/selected";
import X from "@modules/common/icons/x";
import { useState } from "react";
import { ProductPreviewType } from "types/global"
import Thumbnail from "../thumbnail"

const ComponentOption = ({
  title,
  highlighted,
  thumbnail,
  price,
  onClick,
  material,
  selected,
  floatPrice,
  notCompatible,
  product
}: ProductPreviewType & { highlighted: boolean; onClick: any; floatPrice: number; material: string | null; selected: any | undefined, notCompatible: boolean, product: any }) => {
  const priceDifference = (floatPrice - selected.calculated_price) / 100;
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
            <div className="fixed inset-0" style={{ backgroundColor: '#000000CC' }} aria-hidden="true" />
            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                  <Dialog.Panel
                    className="w-full max-w-4xl transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all"
                    style={{
                      backgroundColor: 'rgb(30 41 59)'
                    }}
                  >
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-extrabold leading-6 text-white"
                    >
                      {title}
                    </Dialog.Title>
                    <div className="mt-2">
                      {(product.description || 'No product description (remember this is a demo)').split('\\n').map((i: string, index: number) => (
                        <div key={index}>
                          <p className="text-sm text-white">
                            {i}
                          </p>
                          {index !== ((product.description || 'No product description (remember this is a demo)').split('\\n').length - 1) && <br />}
                        </div>
                      ))}
                    </div>

                    <div className="mt-4">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={() => setIsOpen(false)}
                      >
                        <X /> Close
                      </button>
                    </div>
                  </Dialog.Panel>
              </div>
            </div>
        </Dialog>
      <button className={`w-full h-full p-8 transition-all ease-in-out delay-150 ${highlighted ? 'border-8 rounded-lg' : 'border-0 rounded-none'}`} style={{ borderColor: '#1cc1eb' }} onClick={onClick}>
        <div>
          <Thumbnail thumbnail={thumbnail} size="full" />
          <p className="text-base-regular mt-2">{material}</p>
          <div>
            <div className="flex justify-center gap-1">
              <span className="font-bold text-xl">{title}</span>
              <button onClick={() => setIsOpen(true)}>
                <Info size={24} />
              </button>
            </div>
            {notCompatible ? (
              <div className="flex justify-center items-center">
                <Alert size={32} className="mr-1 text-red-600" />
                Not compatible
              </div>
            ): ( <div className="my-7" /> )}
            
            <div className="flex justify-center gap-x-2 mt-1 text-base-regular">
              {price ? 
                highlighted ? (<Selected color="#1cc1eb" size={32} />) : (
                <>
                  <span className="font-extrabold text-2xl" style={{ color: '#1cc1eb', fontFamily: "'Rubik', sans-serif", fontWeight: 800 }}>
                    {(priceDifference < 1 ? '' : '+') + priceDifference}{' €'}
                  </span>
                </>
              ) : (
                <div className="w-20 h-6 animate-pulse bg-gray-100"></div>
              )}
            </div>
          </div>
        </div>
      </button>
      </>
  )
}

export default ComponentOption
