class Player {
    constructor(name1) {
        // Sets basic variables
        this._name = name1;
        this._maxLives = 3 + pr.ml1;
        this._lives = this._maxLives;
        this._maxHealth = 10 + pr.mh1 + Math.floor((this._maxLives - this._lives) * pr.mh2/2);
        this._health = this._maxHealth;
        this._elixir = pr.x11;
        this._money = pr.m11;
        this._attack = pr.a11;
        this._KOed = false;
        this._initialCards = 5 + 0.1*pr.ic1;
        this._cardsToDraw = 0;
        this._unnerfedCardsToDraw = 0;
        this._cardsDrawnThisTurn = 0;
        this._effectiveCardsDrawnThisTurn = 0;
        this._shopCardsPlacedInHand = 0;
        this._attackStage = 0;
        this._defenseStage = 0;
        this._specialDefenseStage = 0;
        this._villainsKOed = 0;
        this._villainsKOedThisTurn = 0;
        // Less useful but interesting stats
        this._score = 0;
        this._totalElixir = 0;
        this._totalMoney = 0;
        this._totalAttack = 0;
        this._damageDealt = 0;

        // Sets state-based variables
        this._turnState = 0;

        // Starter deck
        //this._deck = new Deck([2, 3, 5, 5, 32, 32, 21, 21, 7, 8, 9]);
        this._deck = new Deck([1, 1, 1, 1, 1, 2, 3, 10, 10, 10]);

        // Sets up health and UI stuff
        document.getElementById("p1score").innerHTML = this._score;
        document.getElementById("p1lives").innerHTML = this._lives;
        setPlayerHealthLevel(this._health, this._maxHealth);
        document.getElementById("playerAvailableCards").innerHTML = this._initialCards;
        // Sets the draw pile to draw cards upon click.
        // Use an arrow function to retain the outer `this` context
        document.getElementById("playerDrawPile").onclick = () => {
            this.drawCards();
        };
    }


    // Saving helper functions
    toJSON() {
        return {
            _name: this._name,
            _lives: this._lives,
            _maxLives: this._maxLives,
            _health: this._health,
            _maxHealth: this._maxHealth,
            _elixir: this._elixir,
            _money: this._money,
            _attack: this._attack,
            _attackStage: this._attackStage,
            _defenseStage: this._defenseStage,
            _specialDefenseStage: this._specialDefenseStage,
            _initialCards: this._initialCards,
            _cardsToDraw: this._cardsToDraw,
            _unnerfedCardsToDraw: this._unnerfedCardsToDraw,
            _cardsDrawnThisTurn: this._cardsDrawnThisTurn,
            _effectiveCardsDrawnThisTurn: this._effectiveCardsDrawnThisTurn,
            _shopCardsPlacedInHand: this._shopCardsPlacedInHand,
            _villainsKOed: this._villainsKOed,
            _villainsKOedThisTurn: this._villainsKOedThisTurn,
            _KOed: this._KOed,
            _score: this._score,
            _totalElixir: this._totalElixir,
            _totalMoney: this._totalMoney,
            _totalAttack: this._totalAttack,
            _damageDealt: this._damageDealt,
            _turnState: this._turnState,
            _deck: this._deck.toJSON()
        };
    }
    static fromJSON(json) {
        var player = new Player(json._name);
        // Sets each property
        player._lives = json._lives;
        player._maxLives = json._maxLives;
        player._health = json._health;
        player._maxHealth = json._maxHealth;
        player._elixir = json._elixir;
        player._money = json._money;
        player._attack = json._attack;
        player._attackStage = json._attackStage;
        player._defenseStage = json._defenseStage;
        player._specialDefenseStage = json._specialDefenseStage;
        player._initialCards = json._initialCards;
        player._cardsToDraw = json._cardsToDraw;
        player._unnerfedCardsToDraw = json._unnerfedCardsToDraw;
        player._cardsDrawnThisTurn = json._cardsDrawnThisTurn;
        player._effectiveCardsDrawnThisTurn = json._effectiveCardsDrawnThisTurn;
        player._shopCardsPlacedInHand = json._shopCardsPlacedInHand != null ? json._shopCardsPlacedInHand : 0;
        player._villainsKOed = json._villainsKOed;
        player._villainsKOedThisTurn = json._villainsKOedThisTurn;
        player._KOed = json._KOed;
        player._score = json._score;
        player._totalElixir = json._totalElixir;
        player._totalMoney = json._totalMoney;
        player._totalAttack = json._totalAttack;
        player._damageDealt = json._damageDealt;
        player._turnState = json._turnState;
        player._deck = Deck.fromJSON(json._deck);
        return player;
    }



    // The function that is called when you click the draw pile
    drawCards() {
        var numCards;
        // Checks if it is the start of the turn to see if you just draw the hand instead of extra cards
        if(Math.abs(this._turnState) == 1 && this._cardsToDraw < 1 && isArrayNull(p1._deck.hand)) {
            this.endTurn();
            this.drawCards();
            return;
        }
        else if(this._turnState == 0) {
            numCards = stochasticRound(this._initialCards);
            this._cardsToDraw = numCards;
            this.initialHandDraw();
        }
        else {
            numCards = this._cardsToDraw;
            if(getDecimalPart(this._cardsToDraw) == 0)
                document.getElementById("cardSoftcap").innerHTML = "";
            else
                document.getElementById("cardSoftcap").innerHTML = "(softcapped)";

        }
        for(let i=1; i<=numCards; i++) {
            this._deck.drawCard();
            this._cardsDrawnThisTurn++;
            this._effectiveCardsDrawnThisTurn++;
            this._cardsToDraw--;
            this._unnerfedCardsToDraw--;
        }
        document.getElementById("playerAvailableCards").innerHTML = 0;
        save();
    }

    playCard(cardHTMLidNum, optionn = 0) {
        
        // Gets the HTML card
        let card = document.getElementById("card" + cardHTMLidNum);
        let id = card.getAttribute("cid");

        // Checks for multiple effects
        let FX = getFXfromStr(cards[id][6]);
        
        // Displays choices to the user
        let choice = 0;
        if(this._turnState == -1) {
            // Time for the Villains to attack!
            let line4 = document.getElementById("playerStatusText");
            line4.innerHTML = "You must let the villains attack before playing a card.  ";
            let button = document.createElement("button");
            button.style.height = "32px";
            button.style.borderRadius = "16px";
            button.style.fontSize = "20px";
            button.style.margin = "0px 8px";
            button.style.color = "#eeeeee";
            button.style.backgroundColor = "#551111";
            button.style.zIndex = "5";
            button.textContent = "Resolve Villain Attacks"
            // Set the function for the button
            button.onclick = function() {
                Villain.allAttack();
            };
            line4.appendChild(button);
            return;
        }
        else if(this._turnState == 2 || this._turnState == 6) {
            this._turnState = 1;
            choice = optionn-1;
            document.getElementById("playerStatusText").innerHTML = "Play a card.";
            removeButtonsFromStatusLine();
            // Get all elements with the "card" class
            let cards = document.getElementsByClassName("card");
            let shopCards = document.getElementsByClassName("shopCard");
            // Iterate through the collection and apply the style to each element
            for (let i = 0; i < cards.length; i++) {
                cards[i].style.border = "solid 4px #222222";
            }
            for (let i = 0; i < shopCards.length; i++) {
                shopCards[i].style.border = "solid 4px #222222";
            }
        }
        else if(FX.length > 1 && this._turnState == 1) {
            card.style.border = "solid 4px #999999";
            let line3 = document.getElementById("playerStatusText");
            line3.innerHTML = "Choose One:  ";
            p1._turnState = 2;
            for(let i=0; i<FX.length; i++) {
                // Show the choices to the user
                let button = document.createElement("button");
                button.style.height = "32px";
                button.style.borderRadius = "16px";
                button.style.fontSize = "20px";
                button.style.margin = "0px 8px";
                button.style.color = "#111111";
                button.style.backgroundColor = "#dd5544";
                button.style.zIndex = "5";
                button.textContent = scoutEffects(FX[i], [0,1]);
                // Set the function for the button
                button.onclick = function() {
                    p1.playCard(cardHTMLidNum, i+1);
                };
                // Append the button to the line3 element
                line3.appendChild(button);
            }
        }
        
        // Checks if the turn state is 1
        // If the state was 2 when clicking on a card, the choice will be -1 and this will not run
        if(this._turnState == 1 && choice >= 0) {
            // Removes the buttons from the status line
            removeButtonsFromStatusLine();

            // Applies the card's effects
            this.applyEffects(id, [0,1], choice);

            // Removes the card from the hand, and puts it into the discard pile.
            this._deck.discardCard(cardHTMLidNum);

            // Checks to see if you are out of cards to draw or play
            if(this._cardsToDraw < 1 && isArrayNull(this._deck.hand)) {
                this.endTurn();
            }
        }
    }


    // Selects an effect from options
    selectEffect(choice, villainNum=0) {
        if(this._turnState == 3) {
            this.KOVillain(villainNum, choice);
        }
        this._turnState = 1;
        return choice;
    }


    // Applies the effects
    applyEffects(cardID, triggerArr, choice = 0) {
        // Makes a string, whose scope will be retained when functions are called
        var effectStr = "";
        // Gets the card's effects
        let FX = getFXfromStr(cards[cardID][6]);
        //console.log(FX);
        // Applies the effects
        for(let j=0; j<FX[choice].length; j++) {
            for(let k=0; k<triggerArr.length; k++)
                effectStr += FX[choice][j].apply(triggerArr[k]);
        }
        // Display the effect on the status line
        document.getElementById("playerStatusText").innerHTML = effectStr;
        return effectStr;
    }


    // Applies the effects from an array
    applyEffectsFromArray(FX, triggerArr, choice = 0) {
        // Makes a string, whose scope will be retained when functions are called
        var effectStr = "";
        //console.log(FX);
        // Applies the effects
        for(let j=0; j<FX[choice].length; j++) {
            for(let k=0; k<triggerArr.length; k++)
                effectStr += FX[choice][j].apply(triggerArr[k]);
        }
        // Display the effect on the status line
        document.getElementById("playerStatusText").innerHTML = effectStr;
        return effectStr;
    }



    endTurn() {
        this._deck.hand = [];
        this._turnState = 0;
        document.getElementById("playerAvailableCards").innerHTML = this._initialCards;
        document.getElementById("playerStatusText").innerHTML += "<br>Draw your initial hand.";
        document.getElementById("cardSoftcap").innerHTML = "";
        
        // Saves the game
        save();
    }


    initialHandDraw() {
        // Sets up a new turn
        if(this._KOed) {
            this._health = this._maxHealth;
            setPlayerHealthLevel(this._health, this._maxHealth);
            this._KOed = false;
        }
        turnNum++;
        this._turnState = -1;
        this._score += 10*this._elixir;
        this._score += 5*zone;
        let prevZone = zone;
        zone = 1 + pr.zsc + Math.floor(turnNum/Math.sqrt(36+12*pr.zsc));
        // Check if new villain appears
        let r;
        if((prevZone < zone) && (zone == 5 || zone == 10 || zone == 25 || zone == 50)) {
            do {
                r = Math.ceil(Math.random() * (villainDex.length-1));
            } while ((villainDex[r][7] > zone) || (villainDex[r][8] < zone));
            createVillainSlot(villainList.length, new Villain(r, 0));
        }
        // Villains will gain XP
        for(let i=1; i<villainList.length; i++) {
            Villain.gainXP(i);
        }

        // Lowers the shop reroll costs
        shop.rerollCostElixir = 6 - pr.srb + (pr.srb-6 + shop.rerollCostElixir) * (2/3*Math.pow(0.9, pr.srd));
        shop.rerollCostMoney = 6 - pr.srb + (pr.srb-6 + shop.rerollCostMoney) * (2/3*Math.pow(0.9, pr.srd));
        document.getElementById("shopRerollCostElixir").innerHTML = Math.round(shop.rerollCostElixir);
        document.getElementById("shopRerollCostMoney").innerHTML = Math.round(shop.rerollCostMoney);

        fieldEffects = [];
        this._elixir = turnNum == 1 ? pr.x11 : 0;
        this._attack = turnNum == 1 ? pr.a11 : 0;
        this._money = turnNum == 1 ? pr.m11 : this._money;
        this._attackStage = 0;
        this._defenseStage = 0;
        this._unnerfedCardsToDraw = this._cardsToDraw;
        this._villainsKOedThisTurn = 0;
        this._cardsDrawnThisTurn = 0;
        this._effectiveCardsDrawnThisTurn = 0;
        this._specialDefenseStage = 0;
        changeZoneLevelColor();
        changeShopCardColors();
        document.getElementById("turnText").innerHTML = turnNum;
        document.getElementById("zoneText").innerHTML = zone;
        document.getElementById("p1score").innerHTML = this._score;
        document.getElementById("p1elixir").innerHTML = this._elixir;
        document.getElementById("p1attack").innerHTML = this._attack;
        document.getElementById("p1attack").innerHTML = this._money;
        let line4 = document.getElementById("playerStatusText");
        line4.innerHTML = "Villains attack!  ";
        let button = document.createElement("button");
        button.style.height = "32px";
        button.style.borderRadius = "16px";
        button.style.fontSize = "20px";
        button.style.margin = "0px 8px";
        button.style.color = "#eeeeee";
        button.style.backgroundColor = "#551111";
        button.style.zIndex = "5";
        button.textContent = "Resolve Villain Attacks"
        // Set the function for the button
        button.onclick = function() {
            Villain.allAttack();
        };
        line4.appendChild(button);
    }



    // When you attack the villain
    attackVillain(villainNum, magnitude, mode=0) {
        let intensity;
        if(magnitude < 0) { // Here, the villain actually being healed.
            villainList[villainNum].currentHealth -= magnitude;
            if(villainList[villainNum].currentHealth > villainList[villainNum].maxHealth) {
                villainList[villainNum].currentHealth = villainList[villainNum].maxHealth;
            }
            setVillainHealthBar(villainNum, villainList[villainNum]);
            return;
        }
        else if(this._attack > 0 && mode == 0) {
            // You spend your attack
            this._attack -= magnitude;
            magnitude *= 3/(3-p1._attackStage);
            // First, round non-integer intensity values
            intensity = stochasticRound(magnitude);

            // Check for highest attack priority. The villain with the highest priority is attacked.
            let highestPriority = villainList[villainNum].attackPriority;
            for(let i=1; i<villainList.length; i++) {
                if(villainList[i].attackPriority > highestPriority) {
                    villainNum = i;
                }
            }
        }
        else if(mode == 1) { // villain attacks itself here
            intensity = stochasticRound(magnitude);
        }
        else { 
            return;
        }

        if(intensity < villainList[villainNum].currentHealth) { // You DON'T KO the villain here
            this._damageDealt += intensity;
            villainList[villainNum].currentHealth -= intensity;
            setVillainHealthBar(villainNum, villainList[villainNum]);
            document.getElementById("p1attack").innerHTML = this._attack;
        }
        else { // You DO KO the villain here. Things are A LOT more complicated.
            if(mode == 0) {
                let spareIntensity = intensity - villainList[villainNum].currentHealth;
                spareIntensity *= (3-p1._attackStage)/3;
                // First, round non-integer intensity values and recover lost attack
                let intensity2 = stochasticRound(spareIntensity);
                this._attack += intensity2;
                this._damageDealt += villainList[villainNum].currentHealth;
                this._score += 10*villainList[villainNum].maxHealth;
            }
            if(mode == 1) {
                this._score += villainList[villainNum].currentHealth;
            }

            // Now, actually KO the villain
            villainList[villainNum].currentHealth = 0;
            setVillainHealthBar(villainNum, villainList[villainNum]);
            document.getElementById("p1attack").innerHTML = this._attack;
            document.getElementById("p1score").innerHTML = this._score;
            if(villainList[villainNum].resolveReward(villainNum, -1) != "STOP") {
                p1.KOVillain(villainNum);
            }
        }
    }


    KOVillain(villainNum, choice = 0) {
        // Resolve rewards
        let effectStr = "Villain Rewards: ";
        effectStr += villainList[villainNum].resolveReward(villainNum, choice);
        // Resolve card triggers for KOing a villain
        effectStr += "<br>Card Rewards: ";
        let c = this._effectiveCardsDrawnThisTurn;
        for(let i=0; i<this._deck.getCurrentHandCards().length; i++) {
            if(this._villainsKOedThisTurn == 0) {
                effectStr += this.applyEffects(this._deck.getCurrentHandCards()[i], [-3,3]);
            }
            else {
                effectStr += this.applyEffects(this._deck.getCurrentHandCards()[i], [3]);
            }
            c--;
        }
        // Checks the discard pile as well
        for(c; c>0; c--) {
            if(this._deck.discard.length >= c) {
                if(this._villainsKOedThisTurn == 0) {
                    effectStr += this.applyEffects(this._deck.discard[this._deck.discard.length-c], [-3,3]);
                }
                else {
                    effectStr += this.applyEffects(this._deck.discard[this._deck.discard.length-c], [3]);
                }
            }
        }
        document.getElementById("playerStatusText").innerHTML = effectStr;

        // Create the new villain here
        this._villainsKOed++;
        this._villainsKOedThisTurn++;
        let r;
        do {
            r = Math.ceil(Math.random() * (villainDex.length-1));
        } while ((villainDex[r][7] > zone) || (villainDex[r][8] < zone));
        let startingXP = 4 * Villain.setXPScalingFactor() * Math.pow(0.95, pr.xv1) * (Math.pow(zone, 2+0.005*zone-0.05*pr.xv2)-1);
        if(zone >= 15) startingXP *= 2;
        createVillainSlot(villainNum, new Villain(r, startingXP));
    }



    // When you run out of health
    stun() {
        // Lose a life and check for game over
        this._lives--;
        document.getElementById("p1lives").innerHTML = this._lives;
        changeLivesColor(p1);
        if(this._lives <= 0) {
            document.getElementById("playerStatusText").innerHTML = "GAME OVER";
            this.gameOver();
        }
        else {
            // Lose half of your cards (random), half of your money, and all your elixir and attack and cards to be drawn
            // Losing your current cards
            let cardsInHand = 0;
            for(let i=0; i<this._deck.hand.length; i++) {
                if(this._deck.hand[i] != null) {
                    cardsInHand++;
                    this.applyEffects(this._deck.hand[i], [4]);
                }
            }
            let discarding;
            if(pr.st2)
                discarding = new Effect(60, Math.floor(cardsInHand/2), 0, 4);
            else
                discarding = new Effect(60, Math.ceil(cardsInHand/2), 0, 4);
            discarding.apply(4);

            // Raise your max health based on the mh2 prestige upgrade
            this._maxHealth = 10 + pr.mh1 + Math.floor((this._maxLives - this._lives) * pr.mh2/2);
            this._elixir = 0;
            this._attack = 0;
            this._cardsToDraw = 0;
            this._unnerfedCardsToDraw = 0;
            let moneyLost = Math.ceil(this._money/2);
            if(pr.st1)
                moneyLost = Math.floor(this._money/2);
            this._money -= moneyLost;
            this._KOed = true;
            changeShopCardColors();
            document.getElementById("p1elixir").innerHTML = p1._elixir;
            document.getElementById("p1attack").innerHTML = p1._attack;
            document.getElementById("p1money").innerHTML = p1._money;
            document.getElementById("playerAvailableCards").innerHTML = this._cardsToDraw;
            let KOstring = "<br>You got KOed! You lost all your elixir and attack, " + Math.ceil(cardsInHand/2) + " cards, and $" + moneyLost + ".<br>";
            return KOstring;
        }
    }



    gameOver() {
        if(this._turnState == -128) {
            console.log("The game was already over!");
            return;
        }
        this._turnState = -128;
        console.log("Game over");
        // Performs initial calculations
        this._score += 20 * this._money;
        let finalScore = this._score;
        document.getElementById("p1score").innerHTML = this._score;
        // Sees if you got on the leaderboard
        let place;
        for(let i=0; i<5; i++) {
            if(highscores[i] < finalScore) {
                for(let j=4; j>i; j--) {
                    highscores[j] = highscores[j-1];
                }
                place = i;
                highscores[i] = finalScore;
                break;
            }
        }
        this._money = 0;
        this.gameOverUI(place);
    }


    gameOverUI(place) {
        // Repurposes the loading screen as a game over screen and displays a bunch of stats
        //document.getElementById("loadingScreen").removeChild("StartNewGame");
        let rubiesGained = (turnNum-1) / 12.5 * Math.pow((turnNum+1)/9, 2.25);
        let sapphiresGained = (Math.pow(p1._villainsKOed, 2) + Math.pow(p1._damageDealt/4, 1.75) + Math.pow(p1._totalAttack/5, 1.75)) / 3.75;
        let emeraldsGained = (1/10*Math.pow(p1._deck.size()-10, 2.3) + 1/300*Math.pow(p1._totalElixir, 2.3) + 1/150*Math.pow(p1._totalMoney, 2.3)) / 4;
        rubiesGained = Math.round(rubiesGained * (1+0.25*pr.grs) * (1+0.25*pr.gre));
        sapphiresGained = Math.round(sapphiresGained * (1+0.25*pr.gsr) * (1+0.25*pr.gse));
        emeraldsGained = Math.round(emeraldsGained * (1+0.25*pr.ger) * (1+0.25*pr.ges));
        if(place != -1) {
            pr.r += rubiesGained;
            pr.s += sapphiresGained;
            pr.e += emeraldsGained;
        }
        document.getElementById("gameScreen").style.display = "none";
        document.getElementById("loadingScreen").style.display = "block";
        document.getElementById("loadingText").innerHTML = "GAME OVER!<br><br>";
        document.getElementById("prestigeAccessButton").style.visibility = "visible";
        let startNewGameButtons = document.getElementsByClassName("startNewGameButton");
        for(let i=0; i<startNewGameButtons.length; i++) {
            startNewGameButtons[i].style.visibility = "visible";
        }
        let stats = document.getElementById("loadingText2");
        stats.innerHTML = "<br>Score: <b>" + this._score + "</b>"; 
        stats.innerHTML += "<br><br>Turns survived: " + (turnNum-1) + "<br>Highest Zone: " + zone + "<br>Villains KOed: " + this._villainsKOed;
        stats.innerHTML += "<br>Total elixir gained: " + this._totalElixir;
        stats.innerHTML += "<br>Total money gained: " + this._totalMoney;
        stats.innerHTML += "<br>Total attack gained: " + this._totalAttack;
        stats.innerHTML += "<br>Total damage dealt: " + this._damageDealt;
        stats.innerHTML += "<br>Final deck size: " + this._deck.size();
        stats.innerHTML += "<br>";
        stats.innerHTML += "<br>Rubies gained: " + rubiesGained;
        stats.innerHTML += "<br>Sapphires gained: " + sapphiresGained;
        stats.innerHTML += "<br>Emeralds gained: " + emeraldsGained;
        stats.innerHTML += "<br><br>Highscores:";
        for(let i=0; i<5; i++) {
            if(i == place) 
                stats.innerHTML += "<b><i><br>" + highscores[i] + "</b></i>";
            else 
                stats.innerHTML += "<br>" + highscores[i];
        }
        save();
    }



    /*get name() { return this._name; }
    get health() { return this._health; }
    get elixir() { return this._elixir; }
    get money() { return this._money; }
    get attack() { return this._attack; }
    get KOs() { return this._KOs; }
    get initialCards() { return this._initialCards; }
    get cardsToDraw() { return this._cardsToDraw; }

    set name(a) { this._name = a; }
    set health(a) { this._health = a; }
    set elixir(a) { this._elixir = a; }
    set money(a) { this._money = a; }
    set attack(a) { this._attack = a; }
    set KOs(a) { this._KOs = a; }
    set initialCards(a) { this._initialCards = a; }
    set cardsToDraw(a) { this._cardsToDraw = a; }*/
}



function getDecimalPart(number) {
    // Convert the number to a string and split at the decimal point
    const parts = number.toString().split('.');

    // Check if there is a decimal part
    if (parts.length === 2) {
        // Return the decimal part as a number
        return parseFloat('0.' + parts[1]);
    } else {
        // If there is no decimal part, return 0
        return 0;
    }
}

function stochasticRound(number) {
    const roundedDown = Math.trunc(number);
    const decimalPart = getDecimalPart(number);
    if(number > 0 && Math.random() < decimalPart)
        return roundedDown + 1;
    else if(number < 0 && Math.random() < decimalPart)
        return roundedDown - 1;
    else
        return roundedDown;
}

function removeButtonsFromStatusLine() {
    // Assuming your div has an id "myDiv"
    let myDiv = document.getElementById("playerStatusText");

    // Select all button elements within the div
    let buttons = myDiv.querySelectorAll("button");

    // Iterate through the buttons and remove each one
    buttons.forEach(button => {
        button.remove();
    });
}



/* Turn state meaning
0 = Start of turn
1 = Normal selection
2 = Choosing an effect among multiple effects
*/