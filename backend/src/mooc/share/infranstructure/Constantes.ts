
export const HOST = process.env.SERVER_URL ?? 'http://localhost'
export const port = process.env.PORT !== undefined ? Number(process.env.PORT) : 4000
export const serverUrl = `${HOST}:${port}`
export const companyName = 'Chat Plus'
export const paymentUrl = process.env.PAYMENT_URL
export const paymentSecret = process.env.PAYMENT_SECRET
export const paymentProductUrl = (): string => {
  if (paymentUrl === undefined) return ''
  return `${paymentUrl}/v1/catalogs/products`
}
