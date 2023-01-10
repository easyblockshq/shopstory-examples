import { CollectionFilter } from '../../types'

const COLORS = [
  {
    hex: '#2a4363',
    name: 'blue',
    fullName: 'Blue',
    isLight: false
  },
  {
    hex: '#3a5633',
    name: 'green',
    fullName: 'Green',
    isLight: false
  },
  {
    hex: '#f1e9dc',
    name: 'beige',
    fullName: 'Beige',
    isLight: false
  },
  {
    hex: '#000000',
    name: 'black',
    fullName: 'Black',
    isLight: false
  },
  {
    hex: '#521819',
    name: 'burgundy',
    fullName: 'Burgundy',
    isLight: false
  },
  {
    hex: '#dad6d4',
    name: 'light-grey',
    fullName: 'Light Grey',
    isLight: false
  },
  {
    hex: '#ccb18d',
    name: 'oak',
    fullName: 'Oak',
    isLight: false
  },
  {
    hex: '#b6452f',
    name: 'terracotta',
    fullName: 'Terracotta',
    isLight: false
  },
  {
    hex: '#7f655a',
    name: 'walnut',
    fullName: 'Walnut',
    isLight: false
  },
  {
    hex: '#FCD431',
    name: 'yellow',
    fullName: 'Yellow',
    isLight: false
  }
]

export function getCollectionColor(colorName: string) {
  return COLORS.find((c) => c.name === colorName)
}

const filterCollectionFunction = (collection: any, options: any) => {
  let collectionNoFilter = collection

  if (options.available) {
    const products = collection.products.filter((p: any) => p.variants.some((v: any) => v.available))

    collection = {
      ...collection,
      products
    }
  }

  if (Array.isArray(options.room)) {
    const products = collection.products.filter(
      (p: any) => p.room.filter((r: any) => r.name && options.room.includes(r.name)).length > 0
    )

    collection = {
      ...collection,
      products
    }
  }

  if (Array.isArray(options.color)) {
    const products = collection.products.filter(
      (p: any) => p.color.filter((m: any) => m.name && options.color.includes(m.name)).length > 0
    )

    collection = {
      ...collection,
      products
    }
  }

  if (options.sort) {
    const products = [...collection.products]

    if (options.sort === 'newest') {
      products.sort((x, y) => {
        let priceX = Date.parse(x.publishedAt)
        let priceY = Date.parse(y.publishedAt)

        if (priceX < priceY) {
          return 1
        } else if (priceX === priceY) {
          return 0
        } else {
          return -1
        }
      })
    } else if (options.sort === 'price-asc' || options.sort === 'price-desc') {
      products.sort((x, y) => {
        let priceX = parseFloat(x.price.amount)
        let priceY = parseFloat(y.price.amount)

        if (options.sort === 'price-asc') {
          let tmp = priceX
          priceX = priceY
          priceY = tmp
        }

        if (priceX < priceY) {
          return 1
        } else if (priceX === priceY) {
          return 0
        } else {
          return -1
        }
      })
    }

    collection = {
      ...collection,
      products
    }
  }

  let filters: [CollectionFilter?] = []

  filters.push({
    id: 'sort',
    label: 'Sort by',
    type: 'select',
    options: [
      {
        id: 'featured',
        label: 'Featured'
      },
      {
        id: 'newest',
        label: 'Newest'
      },
      {
        id: 'price-desc',
        label: 'Price: High-Low'
      },
      {
        id: 'price-asc',
        label: 'Price: Low-High'
      }
    ]
  })

  filters.push({
    id: 'room',
    label: 'Room',
    type: 'multiselect',
    options: [
      {
        id: 'dining-room',
        label: 'Dining room'
      },
      {
        id: 'living-room',
        label: 'Living room'
      },
      {
        id: 'home-office',
        label: 'Home office'
      },
      {
        id: 'hallway',
        label: 'Hallway'
      }
    ]
  })

  filters.push({
    id: 'color',
    label: 'Color',
    type: 'colorselect',
    options: [
      {
        id: 'blue',
        label: 'Blue'
      },
      {
        id: 'green',
        label: 'Green'
      },
      {
        id: 'beige',
        label: 'Beige'
      },
      {
        id: 'black',
        label: 'Black'
      },
      {
        id: 'burgundy',
        label: 'Burgundy'
      },
      {
        id: 'light-grey',
        label: 'Light Grey'
      },
      {
        id: 'oak',
        label: 'Oak'
      },
      {
        id: 'terracotta',
        label: 'Terracotta'
      },
      {
        id: 'walnut',
        label: 'Walnut'
      },
      {
        id: 'yellow',
        label: 'Yellow'
      }
    ]
  })

  return { collection, filters }
}

export function filterCollection(fullCollection: any, options: any) {
  let collection = fullCollection

  if (!collection) {
    throw new Error('can not fetch collection with that handle')
  }

  const filteredCollection = filterCollectionFunction(collection, options)

  // Pagination

  const ITEMS_PER_PAGE = 24

  let maxPages = Math.ceil(filteredCollection.collection.products.length / ITEMS_PER_PAGE)
  let page = parseInt(options.page) || 1
  if (page < 1) {
    page = 1
  }
  if (page > maxPages) {
    page = maxPages
  }

  return {
    filters: filteredCollection.filters,
    options: options,
    collection: {
      ...filteredCollection.collection,
      products: filteredCollection.collection.products.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)
    },
    pagination: {
      current: page,
      max: maxPages
    },
    numberOfItems: filteredCollection.collection.products.length
  }
}
