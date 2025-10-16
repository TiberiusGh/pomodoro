export class ConsentView {
  #htmlContainer
  #consentsBanner

  constructor(htmlContainer: HTMLElement) {
    this.#htmlContainer = htmlContainer

    this.#consentsBanner = this.#createHtmlBaner()
  }

  #createHtmlBaner(): HTMLElement {
    const banner = document.createElement('div')
    banner.innerHTML = `
     <div class="p-6 max-w-xl mx-auto">
      <h2 class="text-xl font-semibold text-gray-900 mb-4">
        We use local storage
      </h2>
      <p class="text-gray-600 text-sm mb-8">
        We use local storage to save your preferences. If you decline, your
        preferences won't be saved and this message will appear on each visit.
      </p>

      <div class="flex flex-col gap-4 min-w-fit">
        <button
          class="px-5 py-2.5 bg-amber-400 hover:bg-amber-500 text-gray-900 font-medium rounded-lg transition-colors duration-200 shadow-sm"
        >
          Accept All
        </button>
        <button
          class="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors duration-200"
        >
          Necessary Only
        </button>
        <button
          class="px-5 py-2.5 border border-gray-300 hover:bg-gray-50 text-gray-600 rounded-lg transition-colors duration-200"
        >
          Decline
        </button>
      </div>
    </div>
    `
    return banner
  }

  renderConsentBanner(): void {
    this.#htmlContainer.appendChild(this.#consentsBanner)
  }
}
