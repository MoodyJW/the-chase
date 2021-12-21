- [x] start
- [x] pause
- [x] resume
- [x] reset
- [x] game over
- [x] disable buttons based on current state (start disabled while running, etc)
- [x] move dot when it's clicked
- [ ] maybe have chaos setting where all dots move when one is clicked?
- [ ] consider rewriting the service, it's a little chaotic and might have redundant functionality
- [ ] styles
  - [x] game over animation
    - [x] adjust positioning and size
    - [x] tune animation timing/positioning
  - [ ] buttons
    - [x] basic icons
    - [ ] not sure yet
  - [ ] dots
    - [ ] might add some sort of animation for the timer
    - [ ] scale based on window size
    - [ ] play with borders/colors/flashing/etc to make the dots look less terrible
  - [ ] board
    - [x] need to contain the dots
    - [ ] not really sure what it will look like overall
- [ ] write some tests...
- [ ] ideas
  - [x] only add new dots after so many clicks or some amount of time
  - [ ] add powerups like +1 to all dots each click or maybe a slow time ability
  - [ ] inputs for difficulty settings (more dots, less time, etc)
  - [ ] if adding settings, make a popover or something
  - [ ] vary size of dots as clicked
  - [ ] use collision detection to prevent dot overlap
  - [x] change game to add dots after n seconds and slowly speed that time up
        instead of every click adding a dot, remove dots after so many clicks
        this would mean the user has one dot, clicks it 3 times and it disappears
        but after 5 seconds, another dot would appear, so at first it would be easy
        but gets progressively more difficult
