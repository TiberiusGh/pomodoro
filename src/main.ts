import { PomodoroApp } from './PomodoroApp'
import './styles/styles.css'
import type { pomodoroHtmlElements } from './types'

const pomodoroHtmlElements: pomodoroHtmlElements = {
  displayElement: document.querySelector(
    '#pomodoro-display-element'
  ) as HTMLElement,
  startButton: document.querySelector(
    '#pomodoro-startButton-element'
  ) as HTMLElement,
  pauseButton: document.querySelector(
    '#pomodoro-pauseButton-element'
  ) as HTMLElement,
  resetButton: document.querySelector(
    '#pomodoro-resetButton-element'
  ) as HTMLElement,
  minutesInput: document.querySelector(
    '#pomodoro-input-element'
  ) as HTMLInputElement
}

new PomodoroApp(pomodoroHtmlElements)
