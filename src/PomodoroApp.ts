import { TimerDisplay } from './TimerDisplay'
import { Validator } from './Validator'
import type { pomodoroHtmlElements } from './types'

export class PomodoroApp {
  #timerDisplay: TimerDisplay

  #startButton: HTMLElement
  #pauseButton: HTMLElement
  #resetButton: HTMLElement

  #inputMinutes: HTMLElement

  #validator = new Validator()

  constructor(htmlElements: pomodoroHtmlElements) {
    this.#validateHtmlElements(htmlElements)

    this.#startButton = htmlElements.startButton
    this.#pauseButton = htmlElements.pauseButton
    this.#resetButton = htmlElements.resetButton
    this.#inputMinutes = htmlElements.minutesInput

    this.#timerDisplay = new TimerDisplay(htmlElements.displayElement)

    this.#testApp()
  }

  #testApp() {
    this.#startButton.textContent = 'Test'
    this.#timerDisplay.update({ minutes: 22, seconds: 62 })
  }

  #validateHtmlElements(htmlElements: pomodoroHtmlElements) {
    for (const htmlElement of Object.values(htmlElements)) {
      this.#validator.validateHtmlElement(htmlElement)
    }
  }
}
