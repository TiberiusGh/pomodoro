import { TimerDisplay } from './TimerDisplay'
import { Validator } from './Validator'
import type { PomodoroHtmlElements } from './types'

export class PomodoroApp {
  #timerDisplay!: TimerDisplay

  #submitMinutesButton!: HTMLElement

  #startButton!: HTMLElement
  #pauseButton!: HTMLElement
  #resetButton!: HTMLElement

  #inputMinutes!: HTMLElement

  #validator = new Validator()

  constructor(htmlContainer: HTMLElement) {
    // this.#validateHtmlElements(htmlElements)
    this.#validator.validateHtmlElement(htmlContainer)

    this.#initializeRequiredHtmlElements(htmlContainer)

    this.#testApp()
  }

  #initializeRequiredHtmlElements(htmlElement: HTMLElement) {
    const pomodoroHtmlElements: PomodoroHtmlElements = {
      displayElement: htmlElement.querySelector(
        '#pomodoro-display-element'
      ) as HTMLElement,
      startButton: htmlElement.querySelector(
        '#pomodoro-startButton-element'
      ) as HTMLElement,
      pauseButton: htmlElement.querySelector(
        '#pomodoro-pauseButton-element'
      ) as HTMLElement,
      resetButton: htmlElement.querySelector(
        '#pomodoro-resetButton-element'
      ) as HTMLElement,
      minutesInput: htmlElement.querySelector(
        '#pomodoro-input-element'
      ) as HTMLInputElement,
      submitMinutesButton: htmlElement.querySelector(
        '#pomodoro-submit-minutes'
      ) as HTMLButtonElement
    }

    this.#validateHtmlElements(pomodoroHtmlElements)

    this.#assignHtmlElementsToPrivateFields(pomodoroHtmlElements)
  }

  #assignHtmlElementsToPrivateFields(htmlElements: PomodoroHtmlElements) {
    this.#startButton = htmlElements.startButton
    this.#pauseButton = htmlElements.pauseButton
    this.#resetButton = htmlElements.resetButton
    this.#inputMinutes = htmlElements.minutesInput

    this.#timerDisplay = new TimerDisplay(htmlElements.displayElement)
  }

  #testApp() {
    this.#startButton.textContent = 'Test'
    this.#timerDisplay.update({ minutes: 22, seconds: 62 })
  }

  #validateHtmlElements(htmlElements: PomodoroHtmlElements) {
    for (const htmlElement of Object.values(htmlElements)) {
      this.#validator.validateHtmlElement(htmlElement)
    }
  }
}
