import { Dialog } from "@headlessui/react";
import parseDesignerData from "@lib/util/parse-data";
import { Product } from "@medusajs/medusa";
import Alert from "@modules/common/icons/alert";
import Info from "@modules/common/icons/info";
import Selected from "@modules/common/icons/selected";
import X from "@modules/common/icons/x";
import { useState } from "react";
import { ProductPreviewType } from "types/global"
import Thumbnail from "../thumbnail"

type DesignerItem = ProductPreviewType & { floatPrice: number; material: string | null; product: Product };

const ComponentOptionMultiple = ({
  options,
  highlighted,
  onClick,
  selected,
  setMultiIndex,
  notCompatible,
  }: {
    options: (DesignerItem)[],
    highlighted: boolean;
    onClick: any;
    selected: any | undefined;
    setMultiIndex: any;
    notCompatible: boolean;
  }
  ) => {
    const [currentOption, setCurrentOption] = useState(options[0]);
    const priceDifference = (currentOption.floatPrice - selected.calculated_price) / 100;
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
                      {currentOption.title}
                    </Dialog.Title>
                    <div className="mt-2">
                      {(currentOption.product.description || 'No product description (remember this is a demo)').split('\\n').map((i: string, index: number) => (
                        <div key={index}>
                          <p className="text-sm text-white">
                            {i}
                          </p>
                          {index !== ((currentOption.product.description || 'No product description (remember this is a demo)').split('\\n').length - 1) && <br />}
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
      <button className={`w-full h-full p-8 transition-all ease-in-out delay-150 ${highlighted ? 'border-8 rounded-lg' : 'border-0 rounded-none'}`} style={{ borderColor: '#1cc1eb', marginBottom: '-1.25rem' }} onClick={onClick}>
        <div>
          <Thumbnail thumbnail={currentOption.thumbnail} size="full" />
          <p className="text-base-regular mt-2">{currentOption.material}</p>
          <div>
            <div className="flex justify-center gap-1">
              <span className="font-bold text-xl">{currentOption.title}</span>
              <button onClick={() => setIsOpen(true)}>
                <Info size={24} />
              </button>
            </div>
            {notCompatible && (
              <div className="flex justify-center items-center">
                <Alert size={32} className="mr-1 text-red-600" />
                Not compatible
              </div>
            )}
            
            <div className="flex justify-center items-center space-x-2 my-2">
            {options.map((o, index) => {
              const data = parseDesignerData(o.product.subtitle || '');
              return (
                <button
                  aria-label="Vaihda värivaihtoehtoa"
                  className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 rounded"
                  key={index}
                  onClick={() => {
                    setCurrentOption(options[index]);
                    if (highlighted) {
                      setMultiIndex(index);
                    }
                  }}
                >
                  {/#(?:[0-9a-fA-F]{3}){1,2}\/#(?:[0-9a-fA-F]{3}){1,2}/.test(data.color) ? (
                    <svg width="15" height="15" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <linearGradient id="split" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" style={{ stopColor: data.color.match(/(#(?:[0-9a-fA-F]{3}){1,2})\/(#(?:[0-9a-fA-F]{3}){1,2})/)[1], stopOpacity:1 }} />
                          <stop offset="57%" style={{ stopColor: data.color.match(/(#(?:[0-9a-fA-F]{3}){1,2})\/(#(?:[0-9a-fA-F]{3}){1,2})/)[1], stopOpacity:1 }} />
                          <stop offset="57%" style={{ stopColor: data.color.match(/(#(?:[0-9a-fA-F]{3}){1,2})\/(#(?:[0-9a-fA-F]{3}){1,2})/)[2], stopOpacity:1 }} />
                          <stop offset="100%" style={{ stopColor: data.color.match(/(#(?:[0-9a-fA-F]{3}){1,2})\/(#(?:[0-9a-fA-F]{3}){1,2})/)[2], stopOpacity:1 }} />
                        </linearGradient>
                      </defs>
                      <circle cx="5" cy="5" r="4.75" fill='url(#split)' stroke="#6B7280" strokeWidth="0.5" />
                    </svg>
                  ) : (
                    <svg width="15" height="15" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="5" cy="5" r="4.75" fill={data.color} stroke="#6B7280" strokeWidth="0.5" />
                    </svg>
                  )}
                </button> 
              )
            })}
          </div>
            <div className="flex justify-center gap-x-2 mt-1">
              {currentOption.price ? 
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
    );
}

export default ComponentOptionMultiple
