import { Validator } from './Validator'

export class Timer {
  #submitedMinutes: number
  currentMinutes = 0
  #currentSeconds = 0
  #timerIntervalID: number | null = null
  #onUpdateCallback: Function
  #validator = new Validator()

  constructor(callbackFunction: Function, submitMinutes: number) {
    this.#onUpdateCallback = callbackFunction

    this.#submitedMinutes = submitMinutes
  }

  start(minutes: number): void {
    // So that it can't be called multiple times
    if (this.#timerIntervalID !== null) {
      return
    }

    this.#validator.validateCustomMinutes(minutes)

    this.#submitedMinutes = minutes

    this.currentMinutes = minutes

    this.#onUpdateCallback({
      minutes: this.currentMinutes,
      seconds: this.#currentSeconds
    })

    this.#timerIntervalID = window.setInterval(() => {
      this.#tick()
    }, 1000)
  }

  resume() {
    this.start(this.currentMinutes)
  }

  pause(): void {
    if (this.#timerIntervalID !== null) {
      clearInterval(this.#timerIntervalID)
      this.#timerIntervalID = null
    }
  }

  reset(): void {
    this.pause()
    this.currentMinutes = this.#submitedMinutes
    this.#currentSeconds = 0
    this.#onUpdateCallback({
      minutes: this.currentMinutes,
      seconds: this.#currentSeconds
    })
  }

  #tick(): void {
    if (this.#currentSeconds === 0) {
      if (this.currentMinutes === 0) {
        this.pause()
        return
      }
      this.currentMinutes--
      this.#currentSeconds = 59
    } else {
      this.#currentSeconds--
    }
    this.#onUpdateCallback({
      minutes: this.currentMinutes,
      seconds: this.#currentSeconds
    })
  }
}
