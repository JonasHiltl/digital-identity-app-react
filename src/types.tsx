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

interface Proof {
  type: string
  verificationMethod: string
  signatureValue: string
}

interface PersonalData {
  firstName: string
  lastName: string
  dateOfBirth: string
  sex: string
  streetNumber: string
  city: string
  state: string
  postalCode: string
  country: string
}

export interface PersonalDataCredential {
  context: string
  id: string
  type: string[]
  credentialSubject: PersonalData
  issuer: string
  issuanceDate: string
  proof: Proof
}

export interface Notification {
  type: 'success' | 'error'
  message: string
}
