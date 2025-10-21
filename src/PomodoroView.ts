import ConsentTracker from 'consent-tracker'
import { Timer } from './Timer'
import type { PomodoroHtmlElements, PomodoroTime } from './types'
import { Validator } from './Validator'

export class PomodoroView {
  #pomodoroView: HTMLElement

  #htmlContainer: HTMLElement

  #inputSessionMinutes!: HTMLInputElement
  #submitMinutesButton!: HTMLElement

  #timeAndButtonsDiv!: HTMLElement
  #timeElement!: HTMLElement
  #startButton!: HTMLElement
  #pauseButton!: HTMLElement
  #resetButton!: HTMLElement

  #validator = new Validator()
  #consentTracker = new ConsentTracker()

  #timer!: Timer

  constructor(htmlContainer: HTMLElement) {
    this.#htmlContainer = htmlContainer
    this.#pomodoroView = this.#createView()

    const pomodoroHtmlElements = this.#selectPomodoroHtmlElements(
      this.#pomodoroView
    )

    this.#validateHtmlElements(pomodoroHtmlElements)

    this.#assignHtmlElementsToPrivateFields(pomodoroHtmlElements)

    this.#attachEventListeners()

    this.#decideAdBannerView()

    this.#initializeTimer()
  }

  #createView(): HTMLElement {
    const template = document.querySelector(
      '#pomodoro-view'
    ) as HTMLTemplateElement

    const templateClone = template.content.cloneNode(true) as DocumentFragment

    return templateClone.firstElementChild as HTMLElement
  }

  #selectPomodoroHtmlElements(htmlElement: HTMLElement) {
    const pomodoroHtmlElements: PomodoroHtmlElements = {
      sessionInput: htmlElement.querySelector(
        '#pomodoro-session-input'
      ) as HTMLElement,
      timeAndButtons: htmlElement.querySelector(
        '#pomodoro-time-and-buttons'
      ) as HTMLElement,
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
        '#pomodoro-study-input'
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
    this.#timeAndButtonsDiv = pomodoroHtmlElements.timeAndButtons
    this.#timeElement = pomodoroHtmlElements.displayElement
    this.#startButton = pomodoroHtmlElements.startButton
    this.#pauseButton = pomodoroHtmlElements.pauseButton
    this.#resetButton = pomodoroHtmlElements.resetButton
    this.#inputSessionMinutes = pomodoroHtmlElements.minutesInput
    this.#submitMinutesButton = pomodoroHtmlElements.submitMinutesButton
  }

  update(time: PomodoroTime) {
    this.#timeElement.textContent = `${time.minutes}:${time.seconds}`
  }

  renderPomodoroView(): void {
    this.#decideView()
  }

  #decideAdBannerView() {
    const hasMarketingConsent = this.#checkMarketingConsent()

    if (hasMarketingConsent) {
      this.#renderBanner()
    }
  }

  #checkMarketingConsent(): boolean {
    try {
      const agreements = this.#consentTracker.getConsents()

      return this.#hasMarketingAgreement(agreements)
    } catch (error) {
      return false
    }
  }

  #hasMarketingAgreement(consents: any) {
    return consents.marketing
  }
  #renderBanner() {
    const bannerHtml = this.#createBanerView()
    this.#validator.validateHtmlElement(bannerHtml)

    this.#htmlContainer.appendChild(bannerHtml)
  }

  #createBanerView() {
    const template = document.querySelector(
      '#pomodoro-ad-banner'
    ) as HTMLTemplateElement

    const templateClone = template.content.cloneNode(true) as DocumentFragment
    return templateClone.firstElementChild as HTMLElement
  }

  #decideView() {
    const storedMinutes = localStorage.getItem('pomodoro-minutes')

    if (storedMinutes) {
      this.#showPomodoroView(storedMinutes)
    } else {
      this.#showInputView()
    }

    this.#htmlContainer.appendChild(this.#pomodoroView)
  }

  #showPomodoroView(storedMinutes: String) {
    const sessionInput = this.#pomodoroView.querySelector(
      '#pomodoro-session-input'
    ) as HTMLElement
    sessionInput.style.display = 'none'

    const minutes = Number(storedMinutes)
    this.#timer.start(minutes)
  }

  #showInputView() {
    this.#timeAndButtonsDiv.style.display = 'none'
  }

  #attachEventListeners() {
    this.#submitMinutesButton.addEventListener('click', () => {
      this.#handleTimeSubmit()
    })
    this.#startButton.addEventListener('click', () => {
      this.#timer.resume()
    })

    this.#pauseButton.addEventListener('click', () => {
      this.#timer.pause()
    })

    this.#resetButton.addEventListener('click', () => {
      this.#timer.reset()
    })
  }

  #handleTimeSubmit() {
    const studyMinutes = Number(this.#inputSessionMinutes.value)

    this.#hideSessionInput()

    this.#timer.start(studyMinutes)
  }

  #hideSessionInput() {
    const sessionInput = this.#pomodoroView.querySelector(
      '#pomodoro-session-input'
    ) as HTMLElement
    sessionInput.style.display = 'none'
    this.#timeAndButtonsDiv.style.display = 'block'
  }

  #initializeTimer() {
    const inputStudyMinutes = Number(this.#inputSessionMinutes.value)
    this.#timer = new Timer(
      (time: PomodoroTime) => this.update(time),
      inputStudyMinutes
    )
  }
}
