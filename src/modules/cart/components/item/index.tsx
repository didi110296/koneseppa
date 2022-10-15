import { useStore } from "@lib/context/store-context"
import { LineItem, Region } from "@medusajs/medusa"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import NativeSelect from "@modules/common/components/native-select"
import Trash from "@modules/common/icons/trash"
import Thumbnail from "@modules/products/components/thumbnail"

type ItemProps = {
  item: Omit<LineItem, "beforeInsert">
  region: Region
}

const Item = ({ item, region }: ItemProps) => {
  return (
    <div className="grid grid-cols-[122px_1fr] gap-x-4">
      <div className="w-[122px]">
        <Thumbnail thumbnail={item.thumbnail} size="full" />
      </div>
      <div className="text-base-regular flex flex-col gap-y-8">
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <span>{item.title}</span>
            <LineItemOptions variant={item.variant} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Item
