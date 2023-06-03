export interface ImportMetaEnv extends Readonly<Record<string, string>> {
  readonly VITE_URLBASE: string
}

export interface ImportMeta {
  readonly env: ImportMetaEnv
}
