class Deck {
    constructor(cardIDarray) {
        this.draw = [];
        this.hand = [];
        this.discard = cardIDarray;
        this.shuffleDiscard();
    }


    // Helper functions for saving
    toJSON() {
        return {
            discard: this.discard,
            draw: this.draw,
            hand: this.hand
        };
    }
    static fromJSON(json) {
        const deck = new Deck([1]);
        deck.discard = json.discard;
        deck.draw = json.draw;
        deck.hand = json.hand;
        return deck;
    }
    

    getDraw() {return this.draw;}
    getHand() {return this.hand;}
    getDiscard() {return this.discard;}

    size() {
        return this.getCurrentHandCards().length + this.draw.length + this.discard.length;
    }


    // Gets non-null cards from hand
    // Returns the card IDs of each card currently in hand
    getCurrentHandCards() {
        let cardArray = [];
        for(let i=0; i<this.hand.length; i++) {
            if(this.hand[i] != null)
                cardArray.push(this.hand[i]);
        }
        return cardArray;
    }

    // When a card is drawn from the draw pile.
    drawCard() {
        // Get the top card from the draw pile.
        let drawnCard = this.draw.pop();
        // Check if the card exists.
        if(drawnCard == undefined) 
            console.log("ERROR! You tried to draw a nonexistant card.");
        else {
            this.hand.push(drawnCard);
            // Display the new card as well. p1 is a placeholder for player.
            createCardSlot(p1, this.hand.length, drawnCard);
        }
        // Now, shuffle, if the draw pile is empty
        if(this.draw.length == 0) {
            this.shuffleDiscard();
        }
    }

    discardCard(cardHTMLidNum) {
        // Gets the card to play
        let card = document.getElementById("card" + cardHTMLidNum);
        // Resolves the card's effects
        //resolveEffects(card.getAttribute("cid"), 0);
        // Moves the card to the discard pile
        if(this.hand[cardHTMLidNum-1] == null)
            console.log("ERROR! You tried to discard a nonexistant card.");
        else {
            this.hand[cardHTMLidNum-1] = null;
            removeCard(cardHTMLidNum);
        }
        this.discard.push(card.getAttribute("cid"));
    }

    shuffleDiscard() {
        // The draw pile is the shuffled version of the discard array
        this.draw = shuffleArray(this.discard);
        // Now, clear the discard array.
        this.discard = [];
        // Also, check for an excessive hand array length and trim it.
    }
};

// Shuffles an array
function shuffleArray(originalArray) {
    // Create a copy of the original array to avoid modifying it directly
    let shuffledArray = originalArray.slice();

    // Fisher-Yates shuffle algorithm
    for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }

    return shuffledArray;
}

// Checks if an array is completely null
function isArrayNull(array) {
    return array.every(value => value === null);
  }