import { PomodoroApp } from './PomodoroApp'
import './styles/styles.css'

new PomodoroApp(
  document.querySelector('#pomodoro-app-container') as HTMLElement
)
