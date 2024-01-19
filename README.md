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
