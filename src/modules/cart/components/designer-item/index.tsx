import { useStore } from "@lib/context/store-context"
import { LineItem, Region } from "@medusajs/medusa"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import NativeSelect from "@modules/common/components/native-select"
import Trash from "@modules/common/icons/trash"
import Thumbnail from "@modules/products/components/thumbnail"

type ItemProps = {
  items: Omit<LineItem, "beforeInsert">[]
  region: Region
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
const DesignerItem = ({ items, region }: ItemProps) => {
  console.log(items);
  return (
    <div className="grid grid-cols-[122px_1fr] gap-x-4">
      <div className="w-[122px]">
        <Thumbnail thumbnail={items[0].thumbnail} size="full" />
      </div>
      <div className="text-base-regular flex flex-col gap-y-8">
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <span>Design your own computer</span>
            {items.map((item, index) => (
              <span key={item.id} className="text-small-regular text-gray-700">
                {index >= itemMap.length ? itemMap[itemMap.length - 1] : itemMap[index]}{" "}
                <span className="text-black">{item.title}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DesignerItem
