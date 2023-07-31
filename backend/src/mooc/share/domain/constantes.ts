export interface IConstantes {
  readonly HOST: string
  readonly PORT: number
  readonly SERVERURL: string
  readonly COMPANYNAME: string
  readonly PAYMENTURL: string
  readonly PAYMENTSECRET: string
  readonly CLIENTPAYMENTID: string
  readonly PAYMENTSUBSCRIPTIONSURL: string
  readonly USERADMIN: string
  readonly PASSWORDADMIN: string
  readonly EMAILADMIN: string
  readonly SENTRYDNS: string
  readonly FRONTENDURL: string
  readonly SERVEREMAIL: string
  readonly SERVEREMAILPASSWORD: string
  readonly ENCRYPTTOKEN: string
  readonly COMPANYLOGO: string
  readonly PAYMENTPLANID: string
}

export type TypekeyOfIConstantes = keyof IConstantes
