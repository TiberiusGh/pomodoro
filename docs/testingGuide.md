# Minimum viable product tests

## Test cases

### 1. The application is available trough internet

1. Navigate to the repository’s URL on GitHub
2. In the “About” section, click the link provided

Expected Result:
The user is redirected to a running instance of the application.

### 2. Control over local storage

1. When first visiting the application, a banner, explaining the use of localstorage appears
2. Choose one of the options
3. The user is asked for study and pause minutes

Expected results:
If the user clicks on ´Accept all`:

- a banner for ads appear above the pomodoro view
- input minutes for study and pause would be stored in localstorage
- the banner asking for consents won't appear when next visiting the application at a later time
  If the user clicls on `Accept necessary`:
- the input minutes for study and pause would be stored in localstorage
- the banner asking for consents won't appear when next visiting the application at a later time
  If the user clicks on `Decline All`:
- nothing would be stored in the localstorage
- the banner would appear when visiting the website again.

### 3. Custom time for study and pause sessions

1. Open the application
2. Enter custom values for study and pause durations when prompted
3. Start the timer

Expected results:

- The app asks for both study and pause durations in minutes
- Only values between 1–60 are accepted
- The timer starts using the entered durations

### 4. Timer control

1. Start the timer
2. Click Pause
3. Click Resume
4. Click Reset

Expected results:

- Pause: The countdown stops and current time is maintained
- Resume: The countdown continues from where it was paused
- Reset: The timer stops and returns to the original starting value

### 5. App core functionality

1. Start the timer
2. Let the study session countdown finish
3. Observe the automatic switch to pause session
4. Let the pause session finish
5. Observe the automatic switch to study session

Expected results:

- The timer starts in study mode and counts down from the set duration
- When the study session ends, it automatically switches to pause
- When the pause ends, it automatically switches back to study
- Remaining time is clearly displayed at all times

# Future development tests
