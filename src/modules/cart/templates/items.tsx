import { LineItem, Region } from "@medusajs/medusa"
import Item from "@modules/cart/components/item"
import SkeletonLineItem from "@modules/skeletons/components/skeleton-line-item"
import DesignerItem from "../components/designer-item"

type ItemsTemplateProps = {
  items?: Omit<LineItem, "beforeInsert">[]
  region?: Region
}

/**
 * @description
 * Takes an Array<V>, and a grouping function,
 * and returns a Map of the array grouped by the grouping function.
 *
 * @param list An array of type V.
 * @param keyGetter A Function that takes the the Array type V as an input, and returns a value of type K.
 *                  K is generally intended to be a property key of V.
 *
 * @returns Map of the array grouped by the grouping function.
 */
function groupBy<K, V>(list: Array<V>, keyGetter: (input: V) => K): Map<K, Array<V>> {
  const map = new Map<K, Array<V>>();
  list.forEach((item) => {
       const key = keyGetter(item);
       const collection = map.get(key);
       if (!collection) {
           map.set(key, [item]);
       } else {
           collection.push(item);
       }
  });
  return map;
}

const ItemsTemplate = ({ items, region }: ItemsTemplateProps) => {
  let groups: Map<unknown, Omit<LineItem, "beforeInsert">[]> | undefined;
  if (items) {
    groups = groupBy(
      items
        .sort((a, b) => {
          return a.created_at < b.created_at ? -1 : 1
        }),
      (item) => item.metadata.designer
    );
  }
  console.log(items);
  return (
    <div>
      <div className="border-b border-gray-200 pb-3 flex items-center">
        <h1 className="text-xl-semi">Ostoskori</h1>
      </div>
      <div className="grid grid-cols-1 gap-y-8 py-8">
        {groups && region
          ? Array.from( groups )
              .map(([key, value]) => {
                if (key === undefined) {
                  return value.map((item) => {
                    return <Item key={item.id} item={item} region={region} />
                  })
                } else {
                  return <DesignerItem key={`${key}`} items={value} region={region} />
                }
              })
          : Array.from(Array(5).keys()).map((i) => {
              return <SkeletonLineItem key={i} />
            })}
      </div>
    </div>
  )
}

export default ItemsTemplate
