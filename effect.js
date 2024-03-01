class Effect {
    constructor(type, intensity, affection, trigger) {
        this.type = type;  //The type of effect. List shown at the bottom of this code.
        this.intensity = intensity;  //The magnitude of the effect. ONE attack vs THREE attack vs NEGATIVE ONE attack (heals instead).
        this.affection = affection;  //Affection modifier. Determines if it can affect this player, the next player, all players, etc. List is shown at the bottom of this code.
        this.trigger = trigger;  //Determines what requirements are necessary for the effect to happen. List shown at the bottom of this code.
    }

    /*get type() { return this.type; }
    get intensity() { return this.intensity; }
    get affection() { return this.affection; }
    get trigger() { return this.trigger; }*/

    
    //Function returning an array of players to affect
    whoToAffect(numPlayers, currentPlayer) {
        let players = [];
        if(this.affection > -11 && this.affection < 11) {
            players[0] = (this.affection + currentPlayer ) % numPlayers;
        }
        else if(this.affection == 20)  {
            for(let i=0; i<numPlayers; i++) {
                players[i] = i;
            }
        }
        else if(this.affection > 10 && this.affection < 20) {
            //Code that lets the user select players goes here
        }

        return players;
    }
    


    apply(trig = 0, villainPos = 0) {
        let effectString = "";
        let KOstring = "";
        if(this.trigger == trig) {
            // First, round non-integer intensity values
            let intensity = Math.trunc(this.intensity); // Rounds towards zero
            let intensityDecimal = Math.abs(this.intensity - intensity);
            if(this.intensity >= 0 && intensityDecimal != 0) {
                let rand = Math.random();
                if(rand < intensityDecimal)
                    intensity++;
            }
            else // Intensity is a negative value
                if(Math.random() < intensityDecimal)
                    intensity--;
            // Adds a +/- prefix to the effect string
            if(this.intensity >= 0) {
                effectString += "+";
            }
            else if(this.intensity < 0 && this.type == 6) {
                // Checks to see if you are discarding cards instead of drawing cards.
                intensity *= -1;
                this.type = 60;
            }
            effectString += intensity;

            switch(this.type) {
                case 1: //elixir
                    p1._elixir += intensity;
                    p1._totalElixir += intensity;
                    p1._score += 10*intensity;
                    document.getElementById("p1score").innerHTML = p1._score;
                    document.getElementById("p1elixir").innerHTML = p1._elixir;
                    effectString += " elixir!";
                    break;
                case 2: //money
                    p1._money += intensity;
                    p1._totalMoney += intensity;
                    p1._score += 10*intensity;
                    document.getElementById("p1score").innerHTML = p1._score;
                    document.getElementById("p1money").innerHTML = p1._money;
                    effectString += " money!";
                    break;
                case 3: //attack
                    p1._attack += intensity;
                    p1._totalAttack += intensity;
                    p1._score += 10*intensity;
                    document.getElementById("p1score").innerHTML = p1._score;
                    document.getElementById("p1attack").innerHTML = p1._attack;
                    effectString += " attack!";
                    break;
                case 4: //health
                    p1._health += intensity;
                    effectString += " health!";
                    if(p1._health > p1._maxHealth) {
                        p1._score += 20*(p1._health - p1._maxHealth);
                        document.getElementById("p1score").innerHTML = p1._score;
                        p1._health = p1._maxHealth;
                    }
                    else if(p1._health <= 0) {
                        p1._health = 0;
                        if(!p1._KOed)
                            KOstring = p1.stun();
                    }
                    else if(p1._KOed)
                        p1._health = 0;
                    setPlayerHealthLevel(100 * p1._health / p1._maxHealth);
                    break;
                case 6: //cards
                    // Add nerf to too many cards drawn to prevent infinite turns
                    p1._unnerfedCardsToDraw += intensity;
                    let cardsThisTurn = p1._initialCards + p1._unnerfedCardsToDraw;
                    let nerfedCTD = Math.min(cardsThisTurn, Math.sqrt(10*cardsThisTurn));
                    if(nerfedCTD == cardsThisTurn)
                        document.getElementById("cardSoftcap").innerHTML = "";
                    else
                        document.getElementById("cardSoftcap").innerHTML = "(softcapped)";
                    p1._cardsToDraw = (nerfedCTD - p1._cardsDrawnThisTurn);
                    document.getElementById("playerAvailableCards").innerHTML = Math.floor(p1._cardsToDraw);
                    // Fix the bug where getting this effect at the end of turn nullifies the effect
                    if(Math.floor(p1._cardsToDraw) > 0 && p1._turnState == 0) {
                        p1._turnState = 1;
                    }
                    effectString += " cards!";
                    break;
                case 11: // +/- player defense stage
                    p1._defenseStage += intensity;
                    effectString += " stages to your defense!";
                    break;
                case 13: // +/- player attack stage
                    p1._attackStage += intensity;
                    effectString += " stages to your attack!";
                    break;
                case 14: // heal this villain
                    effectString += " health to the " + villainList[villainPos].title + "!";
                    p1.attackVillain(villainPos, -1*intensity);
                    break;
                case 16: // +1 attack priority to the villain
                    villainList[villainPos].attackPriority += intensity;
                    effectString += " attack priority to the " + villainList[villainPos].title + "!";
                    break;
                case 60: //random discarding of a card
                    effectString += " random cards are discarded from your hand...";
                    p1._effectiveCardsDrawnThisTurn -= intensity;
                    for(let i=0; i<intensity; i++) {
                        // Checks for an empty hand first
                        if(isArrayNull(p1._deck.hand)) break;
                        // Get all cards in the hand
                        const handHTML = document.getElementById("mainCardHand");
                        const cardsHTML = handHTML.getElementsByClassName("card");
                        // Get a random card
                        const cardToBeDiscarded = cardsHTML[Math.floor(Math.random()*cardsHTML.length)];
                        // Apply discarded and forcibly discarded effects.
                        p1.applyEffects(cardToBeDiscarded.getAttribute("cid"), [1,11]);
                        // Discard that card
                        p1._deck.discardCard(Number(cardToBeDiscarded.id.substring(4)));
                    }
                    // Checks to see if the player has no cards in hand to start a new turn
                    if(p1._cardsToDraw < 1 && isArrayNull(p1._deck.hand)) {
                        p1.endTurn();
                    }
                    break;
            }
            effectString += "  " + KOstring;
        }
        return effectString;
    }
}

// Merely scouts an effect option to return a string
function scoutEffects(FX, triggers) {
    let str = "";
    for(let i=0; i<FX.length; i++) {
        for(let j=0; j<triggers.length; j++) {
            if(FX[i].trigger == triggers[j]) {
                if(str.length > 0) {
                    str += ", ";
                }
                if(FX[i].intensity >= 0) {
                    str += "+";
                }
                str += FX[i].intensity;
                str += " ";
                switch(FX[i].type) {
                    case 1:
                        str += "elixir";
                        break;
                    case 2:
                        str += "money";
                        break;
                    case 3:
                        str += "attack";
                        break;
                    case 4:
                        str += "health";
                        break;
                    case 6:
                        str += "cards";
                        break;
                    case 60:
                        str += "randomly discarded cards";
                        break;
                }
            }
        }
    }
    return str;
}


/*
Types:
    1: Elixir
    2: Money
    3: Attack
    4: Health
    5: Location
    6: Cards to draw
    11: +/- player defense stage
    12: +/- player special defense stage
    13: +/- player attack stage
    14: Heal this villain
    15: Heal all villains
    16: Forces all attack on this villain
    17: Negates all attack on this villain (can still attack other villains)
    60: Randomly discarded cards from hand
    61: Cards discarded by your choice
    62: Highest rank cards randomly discarded from hand
    63: Lowest rank cards randomly discarded from hand 
    64: Highest value cards randomly discarded from hand
    65: Lowest value cards randomly discarded from hand
    66: Highest rank cards discarded from hand (your choice)
    67: Lowest rank cards discarded from hand (your choice)
    68: Highest value cards discarded from hand (your choice)
    69: Lowest value cards discarded from hand (your choice)
    70: Banish a random card from hand
    71-79: Same as 61-69 except with banish instead of discard
    80-89: Same as 70-79 except it's banished from discard pile
    90-99: Same as 70-79 except it's banished from whole deck




Affection modifiers:
                    0: This player.
                    (-10, 10): The player x after this player.
                    (11, 19): Any (x-10) players.
                    20: All players.
                    21: This player and their neighbors.
                    -101: Player with lowest health
                    101: Player with highest health
                    NaN: Effect doesn't apply to a player (i.e. location effects)


Triggers:
    Negative numbers will allow no stacking. [Stacking is when an Effect happens twice when KO'ing two villians, for example.] Positive numbers allow stacking.
        0: Always happens
        1: When discarding this card
        2: When discarding any card
        3: When KO'ing a villian this turn
        4: When you are KO'd
        5: When any player is KO'd
        6: When buying a card with elixir
        7: When buying a card with money
        8: When buying any card
        9: When something is added to the location
        10: When something is removed from the location
        11: When forcibly discarding this card (closes the "discard loophole")
        12: When forcibly discaring any card
        13: When using this card to KO a villian
        21: When card of normal type is played
                    */









    /* POSSIBLY DEPRECATED
    
    toString(numPlayers) {
        var s = "";
        //Trigger stuff
        switch (this.trigger) {
            case 1:
                s += "If discarded, ";
                break;
            case -2:
                s += "If any card is discarded, ";
                break;
            case 2:
                s += "When discarding any card, ";
                break;
            case -3:
                s += "If a villian is KO'd, ";
                break;
            case 3: 
                s += "When any villian is KO'd, ";
                break;
            case -4:
                s += "If you are KO'd, "
        }
        //Affection stuff
        if(this.affection == 0) s += "This player ";
        else if(this.affection > -11 && this.affection < 0) s += "The player " + this.affection * -1 + "before this player ";
        else if(this.affection > 0 && this.affection < 11) s += "The player " + this.affection + "after this player ";
        else if(this.affection == 11 && numPlayers > 1) s += "Any one player ";
        else if(this.affection > 10 && this.affection < 20 && this.affection - 10 < numPlayers) s += "Any " + (this.affection-10) + " players ";
        else if(affection == NaN)
        //Gains/Loses
        if(this.type < 5) {
            if(this.intensity < 0) s += "loses ";
            else s += "gains ";
            //Goes by type
            if(this.type == 1) s += "elixir.";
            if(this.type == 2) s += "money.";
            if(this.type == 3) s += "attack.";
            if(this.type == 4) s += "health.";
        }
        if(this.type == 5) {
            if(this.intensity < 0) s += this.intensity * -1 + "points are removed from the location.";
            else s += this.intensity + "points are added to the location.";
        }
        if(this.type == 6) s += "draws " + this.intensity + " cards.";
        if(this.type == 60) s += "must discard " + this.intensity + " random cards.";
        if(this.type == 61) s += "must discard " + this.intensity + " cards of their choice.";
    }*/