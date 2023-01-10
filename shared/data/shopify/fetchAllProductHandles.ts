import fetchShopify from './fetchShopify'
import { fetchProductsHandlesQuery } from './graphql/fetchProductsHandlesQuery'
import { removeEdges } from '../../utils/removeEdges'

async function fetchAllProductHandles() {
  const query = async () => {
    let products: any = {
      edges: []
    }

    let lastProductCursor = null
    let hasNextPage = false
    let data

    do {
      data = await fetchShopify(fetchProductsHandlesQuery, {
        query: '',
        sortKey: 'CREATED_AT',
        sortIndex: 0,
        reverse: false,
        first: 250,
        cursor: lastProductCursor
      })
      products.edges = [...products.edges, ...data.products.edges]

      hasNextPage = data.products.pageInfo.hasNextPage
      if (hasNextPage) {
        lastProductCursor = data.products.edges[data.products.edges.length - 1].cursor
      }
    } while (hasNextPage)

    return removeEdges(products).map((p: any) => ({ handle: p.handle }))
  }

  const responses = await Promise.all([query()])

  return responses.flat()
}

export default fetchAllProductHandles
