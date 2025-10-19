export class ConsentView {
  #htmlContainer: HTMLElement
  #consentsHtmlView: HTMLElement

  #onAcceptAllConsentsCallback!: () => void
  #onAcceptNecessaryConsentsCallback!: () => void
  #onRejectCallback!: () => void

  constructor(htmlContainer: HTMLElement) {
    this.#htmlContainer = htmlContainer

    this.#consentsHtmlView = this.#createView()
    this.#attachEventListeners()
  }

  #createView(): HTMLElement {
    const template = document.getElementById(
      'pomodoro-consent-view'
    ) as HTMLElement

    // Works even if it shows error
    const templateClone = template.content.cloneNode(true)

    return templateClone.firstElementChild
  }

  #attachEventListeners(): void {
    const acceptAllConsentsButton = this.#consentsHtmlView.querySelector(
      '#pomodoro-consent-accept-btn'
    )

    acceptAllConsentsButton?.addEventListener('click', () => {
      this.#onAcceptAllConsentsCallback?.()
    })

    const acceptNecessaryConsentsButton = this.#consentsHtmlView.querySelector(
      '#pomodoro-consent-accept-necessary-btn'
    )

    acceptNecessaryConsentsButton?.addEventListener('click', () => {
      this.#onAcceptNecessaryConsentsCallback?.()
    })

    const rejectAllConsentsButton = this.#consentsHtmlView.querySelector(
      '#pomodoro-consent-reject-btn'
    )

    rejectAllConsentsButton?.addEventListener('click', () => {
      this.#onRejectCallback?.()
    })
  }

  renderConsentView(): void {
    this.#htmlContainer.appendChild(this.#consentsHtmlView)
  }

  onAcceptAllConsents(callbackFunction: () => void): void {
    this.#onAcceptAllConsentsCallback = callbackFunction
  }

  onAcceptNecessaryConsents(callbackFunction: () => void): void {
    this.#onAcceptNecessaryConsentsCallback = callbackFunction
  }

  onRejectAllConsents(callbackFunction: () => void): void {
    this.#onRejectCallback = callbackFunction
  }
  remove(): void {
    this.#consentsHtmlView.remove()
  }
}
