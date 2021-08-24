export function validateEmail(input: string): boolean {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const validEmail = re.test(input.toLowerCase())
  return validEmail
}

export function generate4DigitString(): string {
  const digits = Math.floor(1000 + Math.random() * 9000)
  return digits.toString()
}
