import { Validator } from './Validator'

export class Timer {
  #minutes: number | null = null
  #displayHTMLElement: HTMLElement
  #timerIntervalID: number | null = null
  #validator = new Validator()

  constructor(displayHTMLElement: HTMLElement) {
    this.#validator.validateHtmlElmement(displayHTMLElement)

    this.#displayHTMLElement = displayHTMLElement
  }

  start(time: number): void {
    this.#minutes = time
    this.#timerIntervalID = window.setInterval(() => {
      this.#tick()
    }, 1000)
  }

  pause(): void {
    if (this.#timerIntervalID !== null) {
      clearInterval(this.#timerIntervalID)
      this.#timerIntervalID = null
    }
  }

  reset(): void {
    this.#timerIntervalID = 0
    this.#updateDisplay()
  }

  #tick(): void {
    this.#minutes--
    this.#updateDisplay

    if (this.#minutes === 0) {
      this.pause()
      alert('Finish!')
    }
  }

  #updateDisplay(): void {
    this.#displayHTMLElement.textContent = this.#minutes.toString()
  }
}
