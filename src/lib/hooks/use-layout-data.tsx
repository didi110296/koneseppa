import { medusaClient } from "@lib/config"
import { getPercentageDiff } from "@lib/util/get-precentage-diff"
import { Product, ProductCollection, Region } from "@medusajs/medusa"
import { formatAmount, useCart } from "medusa-react"
import { useQuery } from "react-query"
import { ProductPreviewType } from "types/global"
import { CalculatedVariant } from "types/medusa"

type LayoutCollection = {
  id: string
  title: string
  metadata: Record<string, unknown>
  handle: string
}

const fetchCollectionData = async (): Promise<LayoutCollection[]> => {
  let collections: ProductCollection[] = []
  let offset = 0
  let count = 1

  do {
    await medusaClient.collections
      .list({ offset })
      .then(({ collections: newCollections, count: newCount }) => {
        collections = [...collections, ...newCollections]
        count = newCount
        offset = collections.length
      })
      .catch((_) => {
        count = 0
      })
  } while (collections.length < count)

  return collections.map((c) => ({
    id: c.id,
    title: c.title,
    metadata: c.metadata,
    handle: c.handle
  }))
}

export const useNavigationCollections = () => {
  const queryResults = useQuery("navigation_collections", fetchCollectionData, {
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  })

  return queryResults
}

const fetchFeaturedProducts = async (
  cartId: string,
  region: Region
): Promise<ProductPreviewType[]> => {
  const products = await medusaClient.products
    .list({
      is_giftcard: false,
      limit: 4,
      cart_id: cartId,
    })
    .then(({ products }) => products)
    .catch((_) => [] as Product[])

  return products.map((p) => {
    const variants = p.variants as CalculatedVariant[]

    const cheapestVariant = variants.reduce((acc, curr) => {
      if (acc.calculated_price > curr.calculated_price) {
        return curr
      }
      return acc
    })

    return {
      id: p.id,
      title: p.title,
      handle: p.handle,
      thumbnail: p.thumbnail,
      price: {
        calculated_price: formatAmount({
          amount: cheapestVariant.calculated_price,
          region: region,
          includeTaxes: false,
        }),
        original_price: formatAmount({
          amount: cheapestVariant.original_price,
          region: region,
          includeTaxes: false,
        }),
        difference: getPercentageDiff(
          cheapestVariant.original_price,
          cheapestVariant.calculated_price
        ),
        price_type: cheapestVariant.calculated_price_type,
      },
    }
  })
}

export const fetchProductsDesigner = async (
  category: string,
  cart_id: string | undefined,
  region: Region
): Promise<(ProductPreviewType & { calculated_price: number; product: Product } )[]> => {
  const collections = await fetchCollectionData();
  const collection = collections.find(i => i.metadata.designer === category);
  const products = await medusaClient.products
    .list({
      is_giftcard: false,
      collection_id: collection ? [collection.id] : ['null'],
      cart_id: cart_id,
    })
    .then(({ products }) => products)
    .catch((_) => [] as Product[]);

  const items = products.map((p) => {
    const variants = p.variants as CalculatedVariant[];

    const cheapestVariant = variants.reduce((acc, curr) => {
      if (acc.calculated_price > curr.calculated_price) {
        return curr
      }
      return acc
    })

    return {
      id: p.id,
      title: p.title,
      handle: p.handle,
      thumbnail: p.thumbnail,
      calculated_price: cheapestVariant.calculated_price,
      product: p,
      tags: p.tags,
      price: {
        calculated_price: formatAmount({
          amount: cheapestVariant.calculated_price,
          region: region,
          includeTaxes: false,
        }),
        original_price: formatAmount({
          amount: cheapestVariant.original_price,
          region: region,
          includeTaxes: false,
        }),
        difference: getPercentageDiff(
          cheapestVariant.original_price,
          cheapestVariant.calculated_price
        ),
        price_type: cheapestVariant.calculated_price_type,
      },
    }
  })
    .reduce((r, a) => {
      r[a.tags[0]?.id] = r[a.tags[0]?.id] || [];
      r[a.tags[0]?.id].push(a);
      return r;
    }, Object.create(null));

  return Object.keys(items).map((key: string) => {
    if (key === 'undefined') {
      return items['undefined'];
    } else {
      return [
        items[key]
      ];
    }
  })
    .flat()
    .sort((a, b) => {
      const aPrice = Array.isArray(a) ? a[0].calculated_price : a.calculated_price;
      const bPrice = Array.isArray(b) ? b[0].calculated_price : b.calculated_price;
      return aPrice - bPrice;
    });
}

export const useGetDesignerOptions = (category: string) => {
  const { cart } = useCart()

  const queryResults = useQuery(
    ["designer_products_category", category, cart?.id, cart?.region],
    () => fetchProductsDesigner(category, cart?.id, cart?.region!),
    {
      enabled: !!cart?.id && !!category && !!cart?.region,
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    }
  )

  return queryResults
}

export const useFeaturedProductsQuery = () => {
  const { cart } = useCart()

  const queryResults = useQuery(
    ["layout_featured_products", cart?.id, cart?.region],
    () => fetchFeaturedProducts(cart?.id!, cart?.region!),
    {
      enabled: !!cart?.id && !!cart?.region,
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    }
  )

  return queryResults
}
