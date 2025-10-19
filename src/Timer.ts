import { Validator } from './Validator'

export class Timer {
  #minutes = 0
  #seconds = 0
  #timerIntervalID: number | null = null
  #onUpdateCallback: Function
  #validator = new Validator()

  constructor(callbackFunction: Function) {
    this.#onUpdateCallback = callbackFunction
  }

  start(minutes: number): void {
    this.#validator.validateCustomMinutes(minutes)

    this.#minutes = minutes

    this.#onUpdateCallback({ minutes: this.#minutes, seconds: this.#seconds })

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
    this.pause()
    this.#minutes = 25
    this.#seconds = 0
    this.#onUpdateCallback({ minutes: this.#minutes, seconds: this.#seconds })
  }

  #tick(): void {
    if (this.#seconds === 0) {
      if (this.#minutes === 0) {
        this.pause()
        return
      }
      this.#minutes--
      this.#seconds = 59
    } else {
      this.#seconds--
    }
    this.#onUpdateCallback({ minutes: this.#minutes, seconds: this.#seconds })
  }
}
