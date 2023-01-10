import { ShopifyProductColor, ShopifyProductRoom } from '../types'
import { removeEdges } from './removeEdges'

export const mapProduct = (product: any) => {
  if (!product) {
    return null
  }
  const mapMedia = (media: any) => {
    if (media.mediaContentType === 'IMAGE') {
      return {
        mediaType: 'image',
        mediaObject: {
          src: media.originalSrc,
          width: media.width,
          height: media.height,
          alt: media.altText,
          id: media.id,
          from: 'shopify'
        }
      }
    } else if (media.mediaContentType === 'VIDEO') {
      return {
        mediaType: 'video',
        mediaObject: {
          from: 'shopify',
          sources: media.sources
        }
      }
    } else {
      return null
    }
  }

  const productVariants = removeEdges(product.variants)
  const productMedia = product.media ? removeEdges(product.media).map((item) => mapMedia(item)) : null

  const productImages = removeEdges(product.images).map((item) => mapMedia({ ...item, mediaContentType: 'IMAGE' }))

  let primaryImage = productImages[0] ?? null
  let secondaryImage = productImages[1] ?? null

  let color: ShopifyProductColor[] = []
  product.tags.map((tag: string) => {
    if (tag.includes('color-')) {
      color.push({
        name: tag.toLowerCase().replace('color-', '')
      })
    }
  })

  let room: ShopifyProductRoom[] = []
  product.tags.map((tag: string) => {
    if (tag.includes('room-')) {
      room.push({
        name: tag.toLowerCase().replace('room-', '')
      })
    }
  })

  const prices = productVariants.map((variant: any) => variant.priceV2)
  const compareAtPrices = productVariants.map((variant: any) => variant.compareAtPriceV2)
  const price = prices[0]
  const compareAtPrice = compareAtPrices[0]

  const restProduct = {
    color,
    tags: product.tags,
    room,
    media:
      product.media && productMedia
        ? [...productMedia.filter((e: any) => e.type === 'VIDEO'), ...productImages]
        : productImages,
    primaryImage,
    secondaryImage,
    relatedProducts: [],
    price,
    compareAtPrice
  }

  return {
    ...product,
    ...restProduct,
    variants: productVariants.map((variant: any) => ({
      title: variant.title,
      id: variant.id,
      quantityAvailable: variant.quantityAvailable,
      sku: variant.sku,
      available: variant.availableForSale,
      isLowStock: false,
      isFinalSale: false,
      color,
      room,
      productId: product.id,
      productHandle: product.handle
    }))
  }
}
