import axios from 'axios'

interface CountryProps {
  flag: string
  name: string
  alpha2Code: string
}

class CountryUtils {
  static async getAll() {
    const res = await axios.get(
      'https://restcountries.eu/rest/v2/all?fields=name;flag;alpha2Code',
    )
    const data: CountryProps[] = await res.data
    return data
  }

  static async getCountryByName(name: string) {
    try {
      const res = await axios.get(
        `https://restcountries.eu/rest/v2/name/${name}?fields=name;flag;alpha2Code`,
      )
      const data: CountryProps[] = await res.data
      return data
    } catch (error) {
      return []
    }
  }

  static async getCountryByCode(code: string) {
    try {
      const res = await axios.get(
        `https://restcountries.eu/rest/v2/alpha/${code}?fields=name;flag;alpha2Code`,
      )
      const data: CountryProps = await res.data
      return data
    } catch (error) {
      return null
    }
  }
}

export default CountryUtils
