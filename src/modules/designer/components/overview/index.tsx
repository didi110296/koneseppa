import { Dialog } from "@headlessui/react";
import { useStore } from "@lib/context/store-context";
import parseDesignerData from "@lib/util/parse-data";
import { Product } from "@medusajs/medusa";
import Button from "@modules/common/components/button"
import Alert from "@modules/common/icons/alert";
import X from "@modules/common/icons/x";
import { DesignerItem } from "@modules/designer/templates"
import { formatAmount, useCart } from "medusa-react"
import { useState } from "react";
import { ProductPreviewType } from "types/global";

const getProduct = (product: any) => Array.isArray(product) ? product[0] : product;

const itemMap = {
  case: 'Case', // case
  processor: 'Processor', // processor
  gpu: 'Graphics card', // gpu
  mobo: 'Motherboard', // mobo
  ram: 'RAM', // ram
  ssd: 'Disk space', // ssd
  extra_ssd: 'Extra disk space', // extra_ssd
  cooler: 'Cooler', // cooler
  extra_fans: 'Extra fans', // extra_fans
  cable: 'Cabling', // cable
  psu: 'Power supply', // psu
  os: 'Operating system', // os
  services: 'Services and extra', // services
}

const Overview = ({ selected }: { selected: {
  case: DesignerItem | undefined,
  processor: DesignerItem | undefined
  gpu: DesignerItem | undefined
  mobo: DesignerItem | undefined
  ram: DesignerItem | undefined
  ssd: DesignerItem | undefined
  extra_ssd: DesignerItem | undefined
  cooler: DesignerItem | undefined
  extra_fans: DesignerItem | undefined
  cable: DesignerItem | undefined
  psu: DesignerItem | undefined
  os: DesignerItem | undefined
  services: DesignerItem[] | undefined
}}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [percentage, setPercentage] = useState('0%');
  const cart = useCart();
  const { addItemAsync } = useStore()

  const uncompatibleComponents = ['mobo', 'cooler'];

  const getUncompatible = () => {
    return uncompatibleComponents.map((c) => isNotCompatible(c, (selected as any)[c] as any) ? c : null).filter((i) => i !== null)
  }

  const isNotCompatible = (component: string, product: (ProductPreviewType & {
    calculated_price: number;
    product: Product;
  })) => {
    if (product == undefined) return false;
    const data = parseDesignerData(getProduct(product).product.subtitle || '');
    switch (component) {
      case 'mobo':
        const data2 = parseDesignerData(selected.processor?.product.subtitle || '');
        if (data.socket && data2.socket && data.socket !== data2.socket) {
          return true;
        }
        break;
      case 'cooler':
        const data3 = parseDesignerData(selected.processor?.product.subtitle || '');
        if (data.socket && data3.socket && (Array.isArray(data.socket) ? !data.socket.includes(data3.socket) : data.socket !== data3.socket)) {
          return true;
        }
        break;
      default:
        return false;
    }
    return false;
  }

  const addToCart = async () => {
    const buildId = `${Math.random() * 100000}`;
    setIsOpen(true);
    setPercentage('0%');
    let indx = 0;
    for (const item of Object.values(selected)) {
      if (item === undefined) {
        continue;
      }
      if (Array.isArray(item)) {
        for (const item2 of item) {
          await addItemAsync({
            quantity: 1,
            variantId: item2.product.variants[0].id,
            id: buildId
          })
        }
      } else {
        await addItemAsync({
          quantity: 1,
          variantId: item.product.variants[0].id,
          id: buildId
        })
      }
      indx++;
      setPercentage(`${~~((indx / (Object.values(selected).length)) * 100)}%`)
    }
  }

  const total = Object.keys(selected).map((key) => {
      const item = (selected as any)[key] as DesignerItem | DesignerItem[];
      if (item === undefined) {
        return 0;
      }
      if (Array.isArray(item)) {
        return item.reduce((prev, cur: DesignerItem) => prev + cur.calculated_price, 0)
      }
      return item.calculated_price;
    })
    .reduce((prev, cur) => prev + cur, 0);

  return (
    <>
      <Dialog open={isOpen} onClose={() => {}} >
            <div className="fixed inset-0" style={{ backgroundColor: '#000000CC' }} aria-hidden="true" />
            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                  <Dialog.Panel
                    className="w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all"
                    style={{
                      backgroundColor: 'rgb(30 41 59)'
                    }}
                  >
                    {percentage !== '100%' ? (
                      <>
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-extrabold leading-6 text-white mb-3"
                        >
                          Adding to cart
                        </Dialog.Title>
                        <div className="mt-2 text-white">
                          We are adding your configuration to the cart.<br /><br /><b className="text-red-500">Do not close the website, it will break your order!</b>
                        </div>
                        <div className="w-full h-6 bg-gray-200 rounded-full dark:bg-gray-700 mt-6">
                          <div className="h-6 bg-blue-600 rounded-full dark:bg-blue-500 transition-all" style={{ width: percentage }}></div>
                        </div>
                      </>
                      ) : (
                        <>
                          <Dialog.Title
                            as="h3"
                            className="text-lg font-extrabold leading-6 text-white mb-3"
                          >
                            Added to cart!
                          </Dialog.Title>
                          <div className="mt-2 text-white">
                            Your computer has been added to the cart.
                          </div>
                          <div className="mt-4">
                            <button
                              type="button"
                              className="inline-flex justify-center rounded-md border border-transparent bg-blue-800 px-4 py-2 text-sm font-medium text-white hover:bg-blue-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                              onClick={() => window.location.replace('/cart')}
                            >
                              Go to cart
                            </button>
                          </div>
                          <div className="mt-4">
                            <button
                              type="button"
                              className="inline-flex justify-center rounded-md border border-transparent bg-blue-800 px-4 py-2 text-sm font-medium text-white hover:bg-blue-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                              onClick={() => setIsOpen(false)}
                            >
                              Continue designing
                            </button>
                          </div>
                        </>
                      )}
                  </Dialog.Panel>
              </div>
            </div>
        </Dialog>
      <div className="product-page-constraint">
        <div className="flex flex-col items-center text-center mb-16">
          <span className="font-bold text-white">
            Total price
          </span>
          <p className="text-2xl-regular max-w-lg mb-6" style={{ color: '#1cc1eb', fontFamily: "'Rubik', sans-serif", fontWeight: 800 }}>
            {formatAmount({
              amount: total,
              region: cart.cart?.region || {
                currency_code: 'EUR',
                tax_code: '1001',
                tax_rate: 0,
              },
              includeTaxes: true,
            })}
          </p>
          <span className="font-bold text-white">
            {/* TODO: ADD delivery estimating based on Jimms data */}
            Estimated delivery
          </span>
          <p className="text-2xl-regular max-w-lg" style={{ color: '#1cc1eb', fontFamily: "'Rubik', sans-serif", fontWeight: 800 }}>
            5-10 business days
          </p>
          {getUncompatible().length !== 0 ? (
            <div className="flex justify-center gap-1 text-red-500 font-bold">
              <Alert size={24} /> There are uncompatible parts! ({getUncompatible().map(i => (itemMap as any)[i || '']).join(" ")})
            </div>
          ) : (<></>)}
          <Button onClick={addToCart} className="medium:max-w-md mt-5" {...(getUncompatible().length !== 0 ? { disabled: true } : {})}>Add to cart</Button>
        </div>
      </div>
    </>
  );
}

export default Overview;