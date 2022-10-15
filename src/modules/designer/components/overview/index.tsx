import { Dialog } from "@headlessui/react";
import { useStore } from "@lib/context/store-context";
import Button from "@modules/common/components/button"
import X from "@modules/common/icons/x";
import { DesignerItem } from "@modules/designer/templates"
import { formatAmount, useCart } from "medusa-react"
import { useState } from "react";

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
  const buildId = `${Math.random() * 100000}`;
  const addToCart = async () => {
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
    setIsOpen(false);
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
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-extrabold leading-6 text-white mb-3"
                    >
                      Adding to cart
                    </Dialog.Title>
                    <div className="mt-2 text-white">
                      We are adding your configuration to the cart.<br /><b className="text-red-500">Do not close the website, it will break your order!</b>
                    </div>
                    <div className="w-full h-6 bg-gray-200 rounded-full dark:bg-gray-700 mt-2">
                      <div className="h-6 bg-blue-600 rounded-full dark:bg-blue-500 transition-all" style={{ width: percentage }}></div>
                    </div>
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
          <Button onClick={addToCart}>Add to cart</Button>
        </div>
      </div>
    </>
  );
}

export default Overview;