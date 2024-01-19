const target = document.getElementById("target");

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const API = "https://www.deckofcardsapi.com/api/deck/new/";

// {
//     "success": true,
//     "deck_id": "3p40paa87x90",
//     "shuffled": false,
//     "remaining": 52
// }

// Shuffle Cards:
// https://www.deckofcardsapi.com/api/deck/<<deck_id>>/shuffle/

// Draw a Card:
// https://www.deckofcardsapi.com/api/deck/<<deck_id>>/draw/?count=2

// {
//     "success": true,
//     "deck_id": "kxozasf3edqu",
//     "cards": [
//         {
//             "code": "6H",
//             "image": "https://deckofcardsapi.com/static/img/6H.png",
//             "images": {
//                           "svg": "https://deckofcardsapi.com/static/img/6H.svg",
//                           "png": "https://deckofcardsapi.com/static/img/6H.png"
//                       },
//             "value": "6",
//             "suit": "HEARTS"
//         },
//         {
//             "code": "5S",
//             "image": "https://deckofcardsapi.com/static/img/5S.png",
//             "images": {
//                           "svg": "https://deckofcardsapi.com/static/img/5S.svg",
//                           "png": "https://deckofcardsapi.com/static/img/5S.png"
//                       },
//             "value": "5",
//             "suit": "SPADES"
//         }
//     ],
//     "remaining": 50
// }

class DeckOfCardsAPI {
  constructor(numCards) {
    this.deck_id = "";
    this.remainingCards = numCards;
  }

  async initializeDeck() {
    try {
      this.deck_id = await this.getDeckID();
      await this.shuffle();
    } catch (err) {
      console.log("Error initializing deck");
    }
  }

  async getDeckID() {
    try {
      const response = await fetch(API);
      const json = await response.json();
      return json["deck_id"];
    } catch (err) {
      console.log("Error getting deck id");
    }
  }

  async shuffle() {
    try {
      await fetch(
        `https://www.deckofcardsapi.com/api/deck/${this.deck_id}/shuffle/`
      );
    } catch (err) {
      console.log("Error shuffling deck");
    }
  }

  async drawCards(count = 1) {
    if (this.deck_id !== "") {
      if (this.remainingCards <= 0) {
        throw new Error("Error drawing cards"); // TODO: fix this!, want this to bubble up
      }
      try {
        const response = await fetch(
          `https://www.deckofcardsapi.com/api/deck/${this.deck_id}/draw/?count=${count}`
        );
        const json = await response.json();
        const cards = json.cards.map(
          ({ code, value, suit, images: { png: image } }) => ({
            code,
            value,
            suit,
            image,
          })
        );
        return cards;
      } catch (err) {
        console.log("Error drawing cards");
      }
    }
  }
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

class Card {
  constructor(code, value, suit, image) {
    this.code = code;
    this.value = value;
    this.suit = suit;
    this.image = image;
  }
}

class CardFactory {
  createCard(code, value, suit, image) {
    return new Card(code, value, suit, image);
  }
}

/**
 * Use builder pattern to create decks of different difficulties
 * Pass the deckbuilder to deck
 */
class DeckBuilder {
  constructor(cardFactory, numCards) {
    this.numCards = numCards;
    this.cards = [];
    this.cardFactory = cardFactory;
  }

  addCard(code, value, suit, image) {
    const card = this.cardFactory.createCard(code, value, suit, image);
    this.cards.push(card);
  }
}

/**
 * Pass the deck to game
 */
class Deck {
  constructor(deckBuilder, deckAPI) {
    this.deckBuilder = deckBuilder;
    this.deckAPI = deckAPI;
  }

  async initializeDeck() {
    try {
      await this.deckAPI.initializeDeck();
      const card = await this.deckAPI.drawCards();
      console.log(card);
      // limit card drawing
    } catch (err) {
      // could have error here from initializing or drawing cards
      console.log(err.message);
    }
  }
}

class Player {
  constructor() {
    this.score = 0;
  }
}

class Game {
  constructor() {}
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

(async () => {
  const difficulty = 2;
  const deckAPI = new DeckOfCardsAPI(difficulty);
  await deckAPI.initializeDeck();
  const cardFactory = new CardFactory();
  const deckBuilder = new DeckBuilder(cardFactory, difficulty);
  const deck = new Deck(deckBuilder, deckAPI);
})();
