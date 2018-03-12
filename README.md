# Memory Game Project

## Table of Contents

* [General](#general)
* [Application](#application)

## Instructions

The html renders a list of cards each one with its own symbol. The total amount of cards is 16, the symbols are repeated twice in whole deck wich mean there are always 8 pairs of matching cards.

The css controls animations and graphic style, could be replaced by another template or design.

## Application

- Function restart will reset document and initialize game.
- The empty array will store the card's symbols to compare them for later purpose, the second array stores a list with all cards rendered in the html.
- The variables will store counters for pairing cards and moves.
- Function shuffle will receive the array of cards and randomize it.
- Function cardClicked holds two events. One for initialize the timer and a second one with a function called evalCards for comparing cards' content and status, in this event is also executed function the modal window when users had ended the game.
- Function turnProcessor will register turns and manage the rating logic to assign stars to user's performance.
- Function newOrder will render a new deck from the randomized cards array.
- Added to git hub repo
