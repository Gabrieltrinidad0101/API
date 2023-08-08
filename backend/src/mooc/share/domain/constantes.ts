export interface IConstantes {
  readonly HOST: string
  readonly PORT: number
  readonly SERVER_URL: string
  readonly COMPANY_NAME: string
  readonly PAYMENT_URL: string
  readonly PAYMENT_SECRET: string
  readonly CLIENT_PAYMENT_ID: string
  readonly PAYMENT_SUBSCRIPTIONS_URL: string
  readonly USER_ADMIN: string
  readonly CELLPHONE_ADMIN: string
  readonly PASSWORD_ADMIN: string
  readonly EMAIL_ADMIN: string
  readonly SENTRY_DNS: string
  readonly FRONTEND_URL: string
  readonly SERVER_EMAIL: string
  readonly SERVER_EMAIL_PASSWORD: string
  readonly ENCRYPT_TOKEN: string
  readonly COMPANY_LOGO: string
  readonly PAYMENT_PLAN_ID: string
}

export type TypekeyOfIConstantes = keyof IConstantes
