export type PomodoroTime = { minutes: number; seconds: number }

export type PomodoroHtmlElements = {
  sessionInput: HTMLElement
  timeAndButtons: HTMLElement
  displayElement: HTMLElement
  startButton: HTMLElement
  pauseButton: HTMLElement
  resetButton: HTMLElement
  minutesInput: HTMLInputElement
  submitMinutesButton: HTMLElement
}
