export function getContentfulConfiguration() {
  if (!process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN) {
    throw new Error('NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN is not defined')
  }
  if (!process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_ACCESS_TOKEN) {
    throw new Error('NEXT_PUBLIC_CONTENTFUL_PREVIEW_ACCESS_TOKEN is not defined')
  }
  if (!process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID) {
    throw new Error('NEXT_PUBLIC_CONTENTFUL_SPACE_ID is not defined')
  }

  return {
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
    environment: process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT ?? 'master',
    previewAccessToken: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_ACCESS_TOKEN,
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID
  }
}
