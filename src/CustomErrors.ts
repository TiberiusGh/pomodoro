export class InvalidHTMLElementError extends Error {
  constructor(message = 'Invalid HTML element') {
    super(message)
    this.name = 'InvalidHtmlElement'
  }
}

export class InvalidNumberOfMinutes extends Error {
  constructor(
    message = 'The number of minutes used are outside of scope 1-60'
  ) {
    super(message)
    this.name = 'InvalidNumberOfMinutes'
  }
}
