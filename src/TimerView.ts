import type { PomodoroHtmlElements, PomodoroTime } from './types'
import { Validator } from './Validator'

export class TimerView {
  #inputMinutes!: HTMLElement
  #submitMinutesButton!: HTMLElement

  #displayElement!: HTMLElement
  #startButton!: HTMLElement
  #pauseButton!: HTMLElement
  #resetButton!: HTMLElement

  #validator = new Validator()

  constructor(pomodoroHtmlContainer: HTMLElement) {
    const pomodoroHtmlElements = this.#selectPomodoroHtmlElements(
      pomodoroHtmlContainer
    )

    this.#validateHtmlElements(pomodoroHtmlElements)

    this.#assignHtmlElementsToPrivateFields(pomodoroHtmlElements)
  }

  #selectPomodoroHtmlElements(htmlElement: HTMLElement) {
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

    return pomodoroHtmlElements
  }

  #validateHtmlElements(htmlElements: PomodoroHtmlElements) {
    for (const htmlElement of Object.values(htmlElements)) {
      this.#validator.validateHtmlElement(htmlElement)
    }
  }

  #assignHtmlElementsToPrivateFields(
    pomodoroHtmlElements: PomodoroHtmlElements
  ) {
    this.#displayElement = pomodoroHtmlElements.displayElement
    this.#startButton = pomodoroHtmlElements.startButton
    this.#pauseButton = pomodoroHtmlElements.pauseButton
    this.#resetButton = pomodoroHtmlElements.resetButton
    this.#inputMinutes = pomodoroHtmlElements.minutesInput
    this.#submitMinutesButton = pomodoroHtmlElements.submitMinutesButton
  }

  update(time: PomodoroTime) {
    this.#displayElement.textContent = `${time.minutes}:${time.seconds}`
  }
}
