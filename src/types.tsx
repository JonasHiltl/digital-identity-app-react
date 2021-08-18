import { KeyPair } from '@iota/identity-wasm/node'

export interface Country {
  name: string
  alpha2Code: string
}

export interface DID {
  id: string
  created: string
  key: KeyPair
  messageId: string
}
