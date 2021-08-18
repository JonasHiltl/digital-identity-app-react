import * as SecureStore from 'expo-secure-store'

class SecureStorage {
  static async save(key: string, value: string) {
    await SecureStore.setItemAsync(key, value)
  }

  static async get(key: string): Promise<string | null> {
    const result = await SecureStore.getItemAsync(key)
    if (result) {
      return result
    } else {
      return null
    }
  }

  static async delete(key: string) {
    const result = await SecureStore.deleteItemAsync(key)
  }
}

export default SecureStorage
