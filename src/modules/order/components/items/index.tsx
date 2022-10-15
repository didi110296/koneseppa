import useEnrichedLineItems from "@lib/hooks/use-enrich-line-items"
import { LineItem, Region } from "@medusajs/medusa"
import { groupBy } from "@modules/cart/templates/items"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import Thumbnail from "@modules/products/components/thumbnail"
import SkeletonLineItem from "@modules/skeletons/components/skeleton-line-item"
import { formatAmount } from "medusa-react"
import Link from "next/link"
import { CalculatedVariant } from "types/medusa"

type ItemsProps = {
  items: LineItem[]
  region: Region
  cartId: string
}

const itemMap = [
  'Case', // case
  'Processor', // processor
  'Graphics card', // gpu
  'Motherboard', // mobo
  'RAM', // ram
  'SSD', // ssd
  'Extra disk', // extra_ssd
  'Cooler', // cooler
  'Extra fans', // extra_fans
  'Cabling', // cable
  'Power supply', // psu
  'Operating system', // os
  'Services and extra', // services
]

const Items = ({ items, region, cartId }: ItemsProps) => {
  const enrichedItems = useEnrichedLineItems(items, cartId)
  
  const groups = groupBy((enrichedItems || []).sort((a, b) => {
    return a.created_at < b.created_at ? -1 : 1
    }), (i) => i.metadata.designer);

  return (
    <div className="p-10 border-b border-gray-200 gap-y-4 flex flex-col">
      {Array.from( groups ).length
        ? Array.from( groups ).map(([ key, value ]) => {
            if (key === undefined) {
              return value.map((item) => {
                return (
                  <div className="grid grid-cols-[122px_1fr] gap-x-4" key={item.id}>
                    <div className="w-[122px]">
                      <Thumbnail thumbnail={item.thumbnail} size="full" />
                    </div>
                    <div className="flex flex-col justify-between flex-1">
                      <div className="flex flex-col flex-1 text-small-regular">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-base-regular overflow-ellipsis overflow-hidden whitespace-nowrap mr-4">
                              <Link
                                href={`/products/${item.variant.product.handle}`}
                              >
                                <a>{item.title}</a>
                              </Link>
                            </h3>
                            <span>Quantity: {item.quantity}</span>
                          </div>
                          <div className="flex justify-end">
                            <LineItemPrice
                              quantity={item.quantity}
                              region={region}
                              variant={item.variant as CalculatedVariant}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            } else {
              return (
                <div className="grid grid-cols-[122px_1fr] gap-x-4" key={value[0].id}>
                    <div className="w-[122px]">
                      <Thumbnail thumbnail={value[0].thumbnail} size="full" />
                    </div>
                    <div className="flex flex-col justify-between flex-1">
                      <div className="flex flex-col flex-1 text-small-regular">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-base-regular overflow-ellipsis overflow-hidden whitespace-nowrap mr-4">
                              <Link
                                href={`/designer`}
                              >
                                <a>Design your own computer</a>
                              </Link>
                            </h3>
                            {value.map((item, index) => (
                              <span key={item.id} className="text-small-regular text-gray-700">
                                {index >= itemMap.length ? itemMap[itemMap.length - 1] : itemMap[index]}{" "}
                                <span className="text-black">{item.title}</span>
                                <br />
                              </span>
                            ))}
                          </div>
                          <div className="flex justify-end">
                          <div className="flex flex-col text-gray-700 text-right">
                            <span>
                              {formatAmount({
                                amount: value.reduce((p, c) => p + (c.unit_price * c.quantity), 0),
                                region: region,
                                includeTaxes: false,
                              })}
                            </span>
                          </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
              )
            }
          })
        : Array.from(Array(items.length).keys()).map((i) => {
            return <SkeletonLineItem key={i} />
          })}
    </div>
  )
}

export default Items
