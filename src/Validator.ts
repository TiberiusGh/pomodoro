import { InvalidHTMLElementError, InvalidNumberOfMinutes } from './CustomErrors'

export class Validator {
  validateHtmlElmement(input: any) {
    if (!(input instanceof HTMLElement)) {
      throw new InvalidHTMLElementError()
    }
  }

  validateCustomMinutes(minutes: any) {
    if (typeof minutes !== 'number' || minutes <= 0 || minutes > 60) {
      throw new InvalidNumberOfMinutes()
    }
  }
}
