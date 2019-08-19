# Prerequisites
This project was built using Node.js v10.15.

# Installation
To install dependencies run `npm install`

# Running
To run the application run `npm start` and go to the server address displayed in the console. It runs at `http://localhost:1234` by default.

# Tests
There are a handful of unit tests for the game logic. They can be run by executing `npm test`.

# Architecture
## Views
1. Splash page
   - New game -> initialize new game and go to Game view
2. Game
   1. Initialize new game
      1. randomly place battleships for each player
      2. Both players move list initialized
      3. Set player 1 as active
   2. Players Turns
      1. Click Start turn button (to reveal players board)
      2. Click Attack map to choose location to fire on
      3. Click confirm
      4. Display attack feedback
      5. Transition to next Player start screen (after some period of time)
   3. End of game condition
3. Game Over
   - Return to Spash page
   - Start a new game

# Hours
## Day 1 (4 hours)
6:50pm - 7:15pm Project initialization and setup

7:15pm - 7:45pm Game design and specification

7:45pm - 8:15pm Game view flow implementation Lobby -> Game -> exit back to lobby

8:15pm - 10:40pm  Game initialization and boat/board generation

## Day 2 (2.5 hours)
8:00pm - 9:45pm Game board UI

9:45pm - 10:30pm Debugging issue. Turned out that Parcel started to run a service worker which cached assets.

## Day 3 (2.5 hours)
10:00am - 12:00pm Game flow implemented

12:00pm - 12:30pm Documentation and clean up for submission