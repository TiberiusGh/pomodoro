import ConsentTracker from 'consent-tracker'
import { PomodoroView } from './PomodoroView'
import { Validator } from './Validator'
import { ConsentView } from './ConsentView'
import type { PomodoroTime } from './types'

export class PomodoroApp {
  #htmlContainer
  #validator = new Validator()
  #consentTracker = new ConsentTracker()

  constructor(htmlContainer: HTMLElement) {
    this.#validator.validateHtmlElement(htmlContainer)
    this.#htmlContainer = htmlContainer

    this.#handleViews()
  }

  #handleViews() {
    const hasConsents = this.#consentTracker.hasConsents()

    if (!hasConsents) {
      this.#renderConsentsView()
    } else {
      this.#renderPomodoroView()
    }
  }

  #renderConsentsView() {
    const consentView = new ConsentView(this.#htmlContainer)
    consentView.renderConsentView()
    this.#mapPomodoroConsentsToConsentTracker(consentView)
  }

  #mapPomodoroConsentsToConsentTracker(viewComponent: ConsentView) {
    // The function passed as callback needs to be wrapped into an arrow function to not loose it's context
    viewComponent.onAcceptAllConsents(() => {
      this.#consentTracker.acceptAll()
      this.#madeConsentChoice(viewComponent)
    })

    viewComponent.onAcceptNecessaryConsents(() => {
      this.#consentTracker.uppdateConsent('essential', true)
      this.#madeConsentChoice(viewComponent)
    })

    viewComponent.onRejectAllConsents(() => {
      this.#consentTracker.declineAll()
      this.#madeConsentChoice(viewComponent)
    })
  }

  #madeConsentChoice(consentView: ConsentView) {
    consentView.remove()
    this.#renderPomodoroView()
  }

  #renderPomodoroView() {
    console.log('RENDERING POMODORO VIEW')
    const pomodoroView = new PomodoroView(this.#htmlContainer)

    const time: PomodoroTime = { minutes: 12, seconds: 34 }
    pomodoroView.update(time)
  }
}
