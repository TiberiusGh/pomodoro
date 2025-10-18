import ConsentTracker from 'consent-tracker'
import { TimerView } from './TimerView'
import { Validator } from './Validator'
import { ConsentView } from './ConsentView'

export class PomodoroApp {
  #htmlContainer
  #timerView: TimerView
  #validator = new Validator()
  #consentTracker = new ConsentTracker()

  constructor(htmlContainer: HTMLElement) {
    this.#validator.validateHtmlElement(htmlContainer)
    this.#timerView = new TimerView(htmlContainer)
    this.#htmlContainer = htmlContainer

    this.#handleViews()
  }

  #handleViews() {
    const hasConsents = this.#consentTracker.hasConsents()

    if (!hasConsents) {
      this.#renderConsentsView()
    } else {
      this.#renderPomodoro()
    }
  }

  #renderConsentsView() {
    const consentView = new ConsentView(this.#htmlContainer)
    consentView.renderConsentBanner()

    this.#mapPomodoroConsentsToConsentTracker(consentView)
  }

  #mapPomodoroConsentsToConsentTracker(viewComponent: ConsentView) {
    // The function passed as callback needs to be wrapped into an arrow function to not loose it's context
    viewComponent.onAcceptAllConsents(() => {
      this.#consentTracker.acceptAll()
      console.log('Accept all')
    })

    viewComponent.onAcceptNecessaryConsents(() => {
      this.#consentTracker.uppdateConsent('essential', true)
      console.log('Necesarry only')
    })

    viewComponent.onRejectAllConsents(() => {
      this.#consentTracker.declineAll()
      console.log('Declined all')
    })
  }

  #renderPomodoro() {
    console.log('RENDERING POMODORO VIEW')
  }
}
