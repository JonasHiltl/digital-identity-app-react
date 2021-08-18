import axios from 'axios'
import { Country } from '../types'

class CountryUtils {
  static async getAll() {
    const res = await axios.get(
      'https://restcountries.eu/rest/v2/all?fields=name;alpha2Code',
    )
    const data: Country[] = await res.data
    return data
  }

  static async getCountryByName(name: string) {
    try {
      const res = await axios.get(
        `https://restcountries.eu/rest/v2/name/${name}?fields=name;alpha2Code`,
      )
      const data: Country[] = await res.data
      return data
    } catch (error) {
      return []
    }
  }

  static async getCountryByCode(code: string) {
    try {
      const res = await axios.get(
        `https://restcountries.eu/rest/v2/alpha/${code}?fields=name;alpha2Code`,
      )
      const data: Country = await res.data
      return data
    } catch (error) {
      return null
    }
  }
}

export default CountryUtils
