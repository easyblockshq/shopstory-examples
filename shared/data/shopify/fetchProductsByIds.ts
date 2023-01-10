import { mapProduct } from '../../utils/mapProduct'
import fetchShopify from './fetchShopify'
import { fetchProductsByIdsQuery } from './graphql/fetchProductsByIds'
import { ShopifyProduct } from '../../types'

export const fetchProductsByIds = async (ids: string[]): Promise<ShopifyProduct[]> => {
  const data = await fetchShopify(fetchProductsByIdsQuery, {
    ids
  })

  return data.nodes.map(mapProduct).filter((product: any) => !!product)
}
