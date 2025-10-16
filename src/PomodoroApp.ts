import { TimerView } from './TimerView'
import { Validator } from './Validator'

export class PomodoroApp {
  #timerView: TimerView
  #validator = new Validator()

  constructor(htmlContainer: HTMLElement) {
    this.#validator.validateHtmlElement(htmlContainer)
    this.#timerView = new TimerView(htmlContainer)
  }
}
