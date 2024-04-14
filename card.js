var cardCSVdata = `Name:Elixir Cost:Money Cost:Rank:Frequency:Effect Sentence:Effect String
Chess Titans Move:0:0:0:0:Gain 1 elixir.:1x
Chess Titans Capture:0:0:0:0:Gain 1 attack.:1a
Chess Titans Check:0:0:0:0:Gain 1 attack or gain 2 health.:1a/2h
Chess Titans Lose:2:0:1:1:Gain 1 health. If you discard this card, gain 1 elixir.:1h1xd
Chess Titans Win:3:0:1:1:Gain 2 health. If you defeat a villain this turn, gain 2 money.:2h2mwt
Pkmn G1 W:2:0:1:1:Gain 1 elixir and 1 health.:1x1h
Pkmn G1 T:3:0:1:1:Gain 1 attack and 1 health.:1a1h
Pkmn G1 G:5:0:2:1:Gain 2 elixir and 2 health.:2x2h
Pkmn G1 C:8:0:3:1:Gain 2 attack, 2 health, and draw a card.:2a2h1c
CoC Clouds:0:0:0:0:Gain 1 money.:1m
CoC Normal Battle:3:0:1:0.75:Gain 2 money.:2m
CoC Pre-Builder Base Battle:2:0:1:0.5:Gain 1 attack. If this card is forcibly discarded, gain 1 elixir.:1a1xdf
CoC Builder Base Battle:4:0:1:0.5:Gain 1 attack. If this card is forcibly discarded, gain 4 money.:1a4mdf
CoC Clan War Theme:3:0:1:0.4:Gain 1 elixir. If you discard this card, gain 1 elixir.:1x1xd
CoC Goblin Attack:5:0:2:1:Gain 2 attack.:2a
CoC Party Wizard:10:0:3:0.5:Draw 4 cards.:4c
Stereo Madness:0:1:1:0.4:Gain 2 elixir.:2x
Back On Track:0:2:1:0.5:Gain 2 elixir, or draw a card.:2x/1c
Polargeist:0:3:1:0.5:Gain 1 elixir, or 1 attack, or 1 health, or draw a card.:1x/1a/1h/1c
Dry Out:0:4:1:0.5:Gain 2 elixir or 2 health.:2x/2h
Base After Base:0:5:2:0.5:Gain 2 attack. If you defeat a villain this turn, gain 1 attack.:2a1awt
Can’t Let Go:0:6:2:0.5:Draw a card. If you discard this card, draw a card.:1c1cd
Jumper:0:7:2:0.5:Gain 2 money, or gain 1 attack.:2m/1a
Time Machine:0:8:2:0.5:Gain 3 elixir.:3x
Cycles:0:9:2:0.5:Gain 1 elixir, 1 money, and draw a card.:1x1m1c
Xstep:0:9:2:0.5:Gain 2 money and 2 elixir.:2m2x
Clutterfunk:0:11:2:0.5:Gain 3 elixir, or gain 1 attack, or gain 1 health.:3x/1a/1h
Theory of Everything:0:10:2:0.5:Gain 1 money, 1 elixir, 1 health, and 1 attack.:1m1x1h1a
Electroman Adventures:0:11:2:0.5:Gain 2 attack, or draw 2 cards.:2a/2c
Clubstep:0:36:3:0.3:Gain 5 attack.:5a
Electrodynamix:0:30:3:0.4:Draw a card. If you discard this card, draw 2 cards and gain 1 attack.:1c2cd1ad
Hexagon Force:0:18:3:0.5:Gain 3 elixir. If you defeat a villain this turn, gain 3 elixir.:3x3xwt
Blast Processing:0:12:2:0.5:Gain 1 elixir and 1 attack. If you KO a villain this turn, gain 2 attack and $1.:1x1a2awt1mwt
Theory of Everything 2:0:40:3:0.3:Gain 2 money, 2 elixir, 2 health, 2 attack, and 2 cards.:2m2x2h2a2c
Geometrical Dominator:0:15:3:0.5:Draw 2 cards. If this card is forcibly discarded, draw 3 cards.:2c3cdf
Deadlocked:0:50:3:0.3:Gain 4 attack, and gain 6 health.:4a6h
Fingerdash:0:21:3:0.5:Gain 3 attack, and gain 2 health.:3a2h
My Heart:4:6:2:0.5:Gain 3 health.:3h
Frag Out:5:8:2:0.5:Gain 1 attack, and 1 elixir or 1 money.:1a1x/1a1m
Multex Gravity:6:10:2:0.5:Gain 4 money.:4m
Cold Blooded Love:6:8:2:0.5:Gain 2 attack, or gain 2 health.:2a/2h
Carol of the Bells:4:5:2:0.5:Gain 1 elixir and 2 health.:1x2h
Give Me Candy:5:7:2:0.5:Gain 2 money and 1 health, or gain 2 elixir.:2m1h/2x
King Taco:3:3:1:0.5:Gain 1 attack, or gain 2 elixir.:1a/2x
Never Coming Down:7:14:2:0.5:Gain 3 attack.:3a
Dash:0:22:3:0.5:Gain 3 attack, and gain 1 health or draw a card.:3a1h/3a1c
Shootin Stars:6:9:2:0.5:Gain 3 money, or 1 money and 2 elixir.:3m/1m2x
Holystone:7:13:3:0.5:Gain 2 attack. If this card is forcibly discarded, gain 2 attack.:2a2adf
Hellcat:9:24:3:0.5:Gain 4 attack but lose 1 health, or gain 2 attack.:4a-1h/2a
`;
var cards = [];




function displayCSV(content) {
    let rows = data.split("\n");
    rows.forEach(row => {
        let columns = row.split(":");  // Splitting by comma for simplicity, consider using a CSV parsing library for advanced features
        console.log(columns);
    });
  // You can now parse the CSV content or perform any other operations.
}



function readCSV(input) {
    const rows = input.trim().split('\n');
    const output = [];

    for (const row of rows) {
        const columns = row.split(':').map(col => col.trim());
        output.push(columns);

        //Translate numbers to effect groups
        //numsToEffectGroups(columns[4]);
    }

    return output;
}


function getFXfromStr(str) {
    // This is a 2D array. Each row is a choice of effects.
    var FX = [];
    var FXgroup = [];
    var params = [0,0,0,0];  // Type, intensity, affection, trigger
    var lastIndex = 0;
    var state = 0;  // 0 = working on number, 1 = working on type, 2+ = working on trigger or affection
    for(let i=0; i<str.length; i++) {
        if(str[i] == "/") { // This is the logical or
            state = 0;
            lastIndex = i+1;
            FXgroup.push(new Effect(params[0], params[1], params[2], params[3]));
            params[0] = params[1] = params[2] = params[3] = 0;
            FX.push(FXgroup);
            FXgroup = [];
        }
        else if(str[i] == "0" || str[i] == "1" || str[i] == "2" || str[i] == "3" || str[i] == "4" || str[i] == "5" || str[i] == "6" || str[i] == "7" || str[i] == "8" || str[i] == "9" || str[i] == "-" || str[i] == ".") {
            if(state != 0) {
                state = 0;
                lastIndex = i;
                FXgroup.push(new Effect(params[0], params[1], params[2], params[3]));
                params[0] = params[1] = params[2] = params[3] = 0;
            }
        }
        else if(str[i] == "#") {
            state = 11;
            i++;
        }
        else if(str[i] == "a" && state == 0) { // a for attack
            params[0] = 3;
            params[1] = Number(str.substring(lastIndex, i));
            state = 1;
        }
        else if(str[i] == "c" && state == 0) { // c for cards
            params[0] = 6;
            params[1] = Number(str.substring(lastIndex, i));
            state = 1;
        }
        else if(str[i] == "h" && state == 0) { // h for health
            params[0] = 4;
            params[1] = Number(str.substring(lastIndex, i));
            state = 1;
        }
        else if(str[i] == "m" && state == 0) { // m for money
            params[0] = 2;
            params[1] = Number(str.substring(lastIndex, i));
            state = 1;
        }
        else if(str[i] == "x" && state == 0) { // x for elixir
            params[0] = 1;
            params[1] = Number(str.substring(lastIndex, i));
            state = 1;
        }
        else if(str[i] == "s" && state == 0) { // s for stage
            params[1] = Number(str.substring(lastIndex, i));
            state = 10;
        }
        else if(str[i] == "F" && state == 0) { // F for force attack on one villain
            params[0] = 16;
            params[1] = Number(str.substring(lastIndex, i));
            state = 1;
        }
        else if(str[i] == "a" && state == 10) { // sa for stage attack
            params[0] = 13;
            state = 1;
        }
        else if(str[i] == "s" && state == 10) { // ss for stage special defense
            params[0] = 12;
            state = 1;
        }
        else if(str[i] == "d" && state == 10) { // sd for stage defense
            params[0] = 11;
            state = 1;
        }
        else if(str[i] == "d" && state == 1) { // *d for when card is discarded
            params[3] = 1;
            state = 2;
        }
        else if(str[i] == "f" && state == 2) { // *df for when card is forcibly discarded
            params[3] = 11;
            state = 3;
        }
        else if(str[i] == "w" && state == 1) { // *w for win against villain
            params[3] = 3;
            state = 2;
        }
        else if(str[i] == "t" && state == 2) { // *wt for win against villain this turn
            params[3] = -3;
            state = 3;
        }
        else if(str[i] == "h" && state == 1) { // hh for health per hitpoint of villain
            params[0] = 18;
            state = 2;
        }
        else if(str[i] == "v" && state == 1) { // hv for heal villain
            params[0] = 14;
            state = 2;
        }
        else if(str[i] == "a" && state == 2) { // hva for heal all villains
            params[0] = 15;
            state = 2;
        }
        else if(str[i-1] == "e" && str[i] == "f" && state == 11) { // Special effect for the move Flower Power. Powers up by sqrt(#flowers)
            let flowers = 0;
            let vdex;
            for(let j=1; j<villainList.length; j++) {
                vdex = villainList[j].dex;
                if(vdex == 8) 
                    flowers++;
            }
            state = 1;
            params[1] = (Number(str.substring(lastIndex, i-3))) * Math.sqrt(flowers);
        }
        else {
            console.log("ERROR! Invalid effect string! " + str[i] + " " + i + " " + str);
        }
    }
    // Adds the final effect group to the total effects
    FXgroup.push(new Effect(params[0], params[1], params[2], params[3]));
    FX.push(FXgroup);
    return FX;
}





function addCardToShop(cardHTMLidNum) {
    // Sets min and max ranks for shop cards
    shop.drawnShopCards++;
    let minRank = 1;
    let maxRank = 1;
    if(shop.drawnShopCards > 8) maxRank = 2;
    if(shop.drawnShopCards > 16) maxRank = 3;
    let r;
    // Selects a card based on rank
    do {
        r = Math.ceil(Math.random() * (cards.length-1));
    } while (cards[r][3] < minRank || cards[r][3] > maxRank || Math.random() > cards[r][4]);
    createCardSlot(0, cardHTMLidNum, r);
    shop.shopCardList[cardHTMLidNum] = r;
}


function rerollShop(currency=0) {
    // Check if eligible to reroll shop first
    // Currency: 1 = elixir, 2 = money
    if((currency == 1 && p1._elixir >= Math.round(shop.rerollCostElixir)) || (currency == 2 && p1._money >= Math.round(shop.rerollCostMoney))) {
        console.log(currency);
        if(currency == 1) {
            p1._elixir -= Math.round(shop.rerollCostElixir);
            document.getElementById("p1elixir").innerHTML = p1._elixir;
        }
        else if(currency == 2) {
            p1._money -= Math.round(shop.rerollCostMoney);
            document.getElementById("p1money").innerHTML = p1._money;
        }
        if(currency == 1 || pr.sru == 0) {
            shop.rerollCostElixir += (20-pr.srr);
            document.getElementById("shopRerollCostElixir").innerHTML = Math.round(shop.rerollCostElixir);
        }
        if(currency == 2 || pr.sru == 0) {
            shop.rerollCostMoney += (20-pr.srr);
            document.getElementById("shopRerollCostMoney").innerHTML = Math.round(shop.rerollCostMoney);
        }
    }
    else if(currency != 0) {
        return;
    }

    // The actual reroll part
    let numCards = shop.shopCardList.length;
    for(let i=0; i<numCards; i++) {
        document.getElementById("shopCard" + i).remove();
        shop.drawnShopCards--;
    }
    for(let i=0; i<numCards; i++) {
        addCardToShop(i);
    }
    changeShopCardColors();
}


function buyCard(cardHTMLidNum, cardID, currency = 0) {
    // Currency meaning: 0 = any, 1 = elixir, 2 = money
    // First checks for valid turn state
    if(!(p1._turnState == 0 || p1._turnState == 1 || p1._turnState == 2 || p1._turnState == 6))
        return;
    if(p1._turnState == 2 || p1._turnState == 6) {
        p1._turnState = 1;
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

    // Gets the HTML shop card
    let card = document.getElementById("shopCard" + cardHTMLidNum);

    // Gets the elixir and money costs
    let elixirCost;
    let moneyCost;
    if(cards[cardID][1] > 0) 
        elixirCost = cards[cardID][1];
    else 
        elixirCost = Infinity;
    if(cards[cardID][2] > 0) 
        moneyCost = cards[cardID][2];
    else 
        moneyCost = Infinity;

    // Checks to see if the player can afford the card
    if(p1._elixir < elixirCost && p1._money < moneyCost) {  // Cannot afford card
        document.getElementById("playerStatusText").innerHTML = "You cannot afford " + cards[cardID][0] + ", as it costs " + elixirCost + " elixir, or " + moneyCost + " money!";
        return;
    }
    else if(p1._elixir >= elixirCost && p1._money >= moneyCost && currency == 0) {  // Can afford card in both money and elixir
        card.style.border = "solid 4px #999999";
        let line3 = document.getElementById("playerStatusText");
        line3.innerHTML = "Choose One:  ";
        p1._turnState = 6;
        for(let i=0; i<2; i++) {
            // Show the choices to the user
            let button = document.createElement("button");
            button.style.height = "32px";
            button.style.borderRadius = "16px";
            button.style.fontSize = "20px";
            button.style.margin = "0px 8px";
            button.style.color = "#111111";
            button.style.backgroundColor = "#55dd44";
            button.style.zIndex = "5";
            if(i == 0) button.textContent += "Buy with elixir";
            if(i == 1) button.textContent += "Buy with money";
            // Set the function for the button
            button.onclick = function() {
                buyCard(cardHTMLidNum, cardID, i+1);
            };
            // Append the button to the line3 element
            line3.appendChild(button);
        }
        return;
    }
    else if(currency == 1 || (p1._elixir >= elixirCost && p1._money < moneyCost)) {  // Can afford card with elixir, buy it
        // Removes elixir from the player
        p1._elixir -= elixirCost;
        document.getElementById("p1elixir").innerHTML = p1._elixir;
        document.getElementById("playerStatusText").innerHTML = "You bought " + cards[cardID][0] + " for " + elixirCost + " elixir!";
    }
    else if(currency == 2 || (p1._money >= moneyCost && p1._elixir < elixirCost)) {  // Can afford card with money, buy it
        // Removes money from the player
        p1._money -= moneyCost;
        document.getElementById("p1money").innerHTML = p1._money;
        document.getElementById("playerStatusText").innerHTML = "You bought " + cards[cardID][0] + " for " + moneyCost + " money!";
    }
    else return;

    // Removes the card from the shop to be placed in player's discard or hand
    let prevTurnState = p1._turnState;
    document.getElementById("shopCard" + cardHTMLidNum).style.border = "solid 4px #999999";
    placeInHandOrDiscard(prevTurnState, card, cardHTMLidNum, cardID);
}



function placeInHandOrDiscard(prevTurnState, card, cardHTMLidNum, cardID, choice=0) {
    let line3 = document.getElementById("playerStatusText");
    // returns false to place in discard, or true to place in hand
    if(p1._turnState == 7) {  // Select an option
        p1._turnState = prevTurnState;
        removeButtonsFromStatusLine();
        card.style.border = "solid 4px #222222";
        if(choice == 1) {
            p1._deck.discard.push(cardID);
            if(line3.innerText.charAt(line3.innerText.length-1) == ':') {
                line3.innerText = line3.innerText.substring(0, line3.innerText.length-11);
            }
            line3.innerHTML += "<br>" + cards[cardID][0] + " was placed in your discard pile.";
        }
        else {
            p1._shopCardsPlacedInHand--;
            p1._deck.hand.push(cardID);
            if(p1._turnState == 0) {
                p1._turnState = 1;
            }
            line3.innerHTML = cards[cardID][0] + " was placed in your hand!";
            createCardSlot(p1, p1._deck.hand.length, cardID);
        }
        // Adds a new card to the shop
        document.getElementById("shopCard" + cardHTMLidNum).remove();
        addCardToShop(cardHTMLidNum);
        changeShopCardColors();
    }
    else if(p1._shopCardsPlacedInHand > 0) { // Display options
        card.style.border = "solid 4px #999999";
        line3.innerHTML += "<br>Choose One:  ";
        p1._turnState = 7;
        for(let i=0; i<2; i++) {
            // Show the choices to the user
            let button = document.createElement("button");
            button.style.height = "32px";
            button.style.borderRadius = "16px";
            button.style.fontSize = "20px";
            button.style.margin = "0px 8px";
            button.style.color = "#111111";
            button.style.backgroundColor = "#55dd44";
            button.style.zIndex = "5";
            if(i == 0) button.textContent += "Place card in hand (" + p1._shopCardsPlacedInHand + " remaining this game)";
            if(i == 1) button.textContent += "Place card in discard";
            // Set the function for the button
            button.onclick = function() {
                placeInHandOrDiscard(prevTurnState, card, cardHTMLidNum, cardID, i);
            };
            // Append the button to the line3 element
            line3.appendChild(button);
        }
    }
    else {
        p1._turnState = 7;
        placeInHandOrDiscard(prevTurnState, card, cardHTMLidNum, cardID, 1);
    }
}









/*function numsToEffectGroups(str) {
    let index = 0;
    let numEffect = 0;
    //let effects = EffectGroup[1];
    while(index < str.length) {
        let singleEffect = "";
        while(str.substring(index).includes('D') && index < str.length()) {
            singleEffect += str[index];
            index++;
        }
        let singleValues = [0,0,0,0];
        for(let i=0; i<3; i++) {
            
        }
        EffectGroup[numEffect] = EffectNum
    }
}*/



/*const cardCSVdata = [][8];
fetch('CardData.csv')
.then(response => response.text())
  .then(csvContent => {
    // Parse the CSV content and create a 2D array
    cardCSVdata = readCSV(csvContent);
  })
  .catch(error => console.error('Error fetching or parsing CSV file:', error));*/