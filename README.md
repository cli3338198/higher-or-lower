# Higher or Lower - Simple Card Game

## Classes

1. **Card:**

   - Represents a playing card with a rank and suit.

2. **Deck:**

   - Manages a deck of cards.
   - Factory Pattern: Responsible for creating and initializing a deck of cards.

3. **Player:**

   - Represents a player in the game.
   - Observer Pattern: Observes the game state for updates.
   - Strategy Pattern: Defines different strategies for playing the game (e.g., conservative, aggressive).

4. **Game:**
   - Manages the game state and logic.
   - Observer Pattern: Notifies players about the game state changes.

## Design Patterns

1. **Observer Pattern:**

   - Players subscribe to the game to receive updates about the game state.

2. **Factory Pattern:**

   - The Deck class acts as a factory for creating and initializing a deck of cards.

3. **Strategy Pattern:**
   - The Player class has different strategies for playing the game, which can be switched dynamically.

## Game Rules

1. A deck of cards is shuffled.
2. Each player receives a starting hand of three cards.
3. Players take turns guessing whether the next card in the deck will be higher or lower than their current card.
4. Players earn points for correct guesses and lose points for incorrect guesses.
5. The game continues for a set number of rounds.

## Example Usage

```javascript
// Create a deck using the Factory Pattern
const deck = new Deck();
deck.shuffle();

// Create players
const player1 = new Player("Player 1", new AggressiveStrategy());
const player2 = new Player("Player 2", new ConservativeStrategy());

// Create the game
const game = new Game([player1, player2], deck);

// Play the game for a certain number of rounds
game.playRounds(5);

// Display final scores
console.log("Final Scores:");
game.players.forEach((player) =>
  console.log(`${player.name}: ${player.score}`)
);
```

## How to Play

1. **Game Start:**

   - The game begins with the presentation of a starting card, usually drawn from a standard deck of playing cards.

2. **Make Your Prediction:**

   - Players must decide whether the next card will be higher or lower than the current card.

3. Place Your Bet:

   - After making a prediction, players place their bets on whether the next card will be higher or lower.

4. **Reveal the Next Card:**

   - The next card is revealed, and the result is determined:
     - If the prediction is correct, players win the round.
     - If the prediction is incorrect, players lose the round.

5. **Continue or End the Game:**
   - Players can choose to continue and make predictions for subsequent cards or end the game after any round.

## Objective

The objective of the Higher or Lower game is to make correct predictions about whether the next card in the sequence will be higher or lower than the current one. The game tests players' intuition and decision-making skills as they try to achieve a winning streak. Whether played for fun or as a competitive challenge, the goal is to enjoy the thrill of predicting the outcome and experiencing the excitement of each card flip.
