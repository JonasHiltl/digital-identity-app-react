import axios from 'axios'
/* import {
  Client,
  Config,
  Document,
  KeyType,
  Network,
  KeyPair,
} from '@iota/identity-wasm/node' */

import { DID } from '../../types'
import SecureStorage from '../../utils/secureStorage'
import CLIENT_CONFIG from '../../config'
import {
  KeyPair,
  KeyType,
  Document,
  Config,
  Network,
  Client,
} from '@iota/identity-wasm/node'

class DIDUtils {
  /* static async create() {
    // Create a DID Document (an identity).
    const key: KeyPair = new KeyPair(KeyType.Ed25519)
    const doc: Document = Document.fromKeyPair(key)

    // Sign the DID Document with the generated key.
    doc.sign(key)

    // Create a default client configuration from the parent config network.
    const config = Config.fromNetwork(Network.mainnet())

    // Create a client instance to publish messages to the Tangle.
    const client = Client.fromConfig(config)

    // Publish the Identity to the IOTA Network, this may take a few seconds to complete Proof-of-Work.
    const messageId = await client.publishDocument(doc.toJSON())

    const id = doc.id.toString()
    const created = doc.created.toRFC3339()
    const did: DID = {
      id,
      created,
      key,
      messageId,
    }

    return did
  } */
  static async create() {
    const res = await axios.get(
      'https://digital-identity-nestjs.herokuapp.com/did/create/',
    )
    const didJson: DID = res.data
    const id = didJson.id
    const created = didJson.created
    const key = didJson.key
    const messageId = didJson.messageId

    const did: DID = {
      id,
      created,
      key,
      messageId,
    }

    SecureStorage.save('did', JSON.stringify(did))
    return did
  }
}

export default DIDUtils
