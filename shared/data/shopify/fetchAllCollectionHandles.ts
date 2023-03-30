import fetchShopify from './fetchShopify'
import { fetchCollectionsHandlesQuery } from './graphql/fetchCollectionsHandlesQuery'
import { removeEdges } from '../../utils/removeEdges'

async function fetchAllCollectionHandles() {
  const query = async () => {
    const data: any = await fetchShopify(fetchCollectionsHandlesQuery, {})

    return removeEdges(data.collections).map((collection: any) => ({ handle: collection.handle }))
  }

  const responses = await Promise.all([query()])

  return responses.flat()
}

export default fetchAllCollectionHandles
