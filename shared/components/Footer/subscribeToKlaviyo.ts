type Body = {
  email: string
}

export const subscribeToKlaviyo = async (body: Body) => {
  return await fetch('/api/newsletter-subscribe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
}
