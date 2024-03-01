var cardCSVdata = `Name:Elixir Cost:Money Cost:Rank:Frequency:Effect Sentence:Effect String
Chess Titans Move:0:0:0:0:Gain 1 elixir.:1x
Chess Titans Capture:0:0:0:0:Gain 1 attack.:1a
Chess Titans Check:0:0:0:0:Gain 1 attack or gain 2 health.:1a/2h
Chess Titans Lose:2:0:1:1:Gain 1 health. If you discard this card, gain 1 elixir.:1h1xd
Chess Titans Win:3:0:1:1:Gain 2 health. If you defeat a villain this turn, gain 2 money.:2h2mwt
Pkmn G1 W:2:0:1:1:Gain 1 elixir and 1 health.:1x1h
Pkmn G1 T:3:0:1:1:Gain 1 attack and 1 health.:1a1h
Pkmn G1 G:5:0:2:1:Gain 2 elixir and 2 health.:2x2h
Pkmn G1 C:8:0:3:1:Gain 2 attack, 2 elixir, 2 health, and draw a card.:2a2x2h1c
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
Time Machine:0:8:2:0.5:Gain 2 money and 1 elixir.:2m1x
Cycles:0:9:2:0.5:Gain 1 elixir, 1 money, and draw a card.:1x1m1c
Xstep:0:9:2:0.5:Gain 3 elixir.:3x
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
Cold Blooded Love:5:8:2:0.5:Gain 2 attack, or gain 2 health.:2a/2h
Carol of the Bells:4:5:2:0.5:Gain 1 elixir and 2 health.:1x2h
Give Me Candy:5:7:2:0.5:Gain 2 money and 1 health, or gain 2 elixir.:2m1h/2x
King Taco:3:3:1:0.5:Gain 1 attack, or gain 2 elixir.:1a/2x
Never Coming Down:7:14:2:0.5:Gain 3 attack.:3a
Dash:0:22:3:0.5:Gain 3 attack, and gain 1 health or draw a card.:3a1h/3a1c
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
        else if(str[i] == "v" && state == 1) { // hv for heal villain
            params[0] = 14;
            state = 2;
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
    drawnShopCards++;
    let minRank = 1;
    let maxRank = 1;
    if(drawnShopCards > 8) maxRank = 2;
    if(drawnShopCards > 16) maxRank = 3;
    let r;
    // Selects a card based on rank
    do {
        r = Math.ceil(Math.random() * (cards.length-1));
    } while (cards[r][3] < minRank || cards[r][3] > maxRank || Math.random() > cards[r][4]);
    createCardSlot(0, cardHTMLidNum, r);
    shopCardList[cardHTMLidNum] = r;
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
    else if(p1._elixir >= elixirCost || currency == 1) {  // Can afford card with elixir, buy it
        // Removes elixir from the player
        p1._elixir -= elixirCost;
        document.getElementById("p1elixir").innerHTML = p1._elixir;
        document.getElementById("playerStatusText").innerHTML = "You bought " + cards[cardID][0] + " for " + elixirCost + " elixir!";
    }
    else if(p1._money >= moneyCost || currency == 2) {  // Can afford card with money, buy it
        // Removes elixir from the player
        p1._money -= moneyCost;
        document.getElementById("p1money").innerHTML = p1._money;
        document.getElementById("playerStatusText").innerHTML = "You bought " + cards[cardID][0] + " for " + moneyCost + " money!";
    }
    else return;

    // Removes the card from the shop to be placed in player's discard
    document.getElementById("shopCard" + cardHTMLidNum).remove();
    p1._deck.discard.push(cardID);

    // Adds a new card to the shop
    addCardToShop(cardHTMLidNum);
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



/*
DEPRICATED: The description is now stored in the CSV file

function getDescription(FX) {
    let output = "";
    let i = 0;
    let a = [false, false, false, false];
    let s = "";
    let c = new Array(4).fill(0);

    for(let b = 0; b < 4; b++) {
        if(((FX[i][2] >> b) & 0x1) == 1) 
            a[b] = true;
    }

    while(i < 4 && (i == 0 || FX[i-1][0] == 1)) {
        let n = 4;
        for(let j = 0; j < 4; j++) {
            for(n; n < (11+7*j); n++) {
                if(FX[i][n] != 0) {
                    c[j]++;
                }
            }
            if(c[j] != 0) {
                if(j == 1) output += "If discarded, ";
                if(j == 2) output += "If a Pokemon is defeated, ";
                if(a[j] == false || FX[i][1] == 0) {
                    output += "This player";
                    s = "s";
                }
                else if(a[j] == true) {
                    if(FX[i][1] < 0) {
                        output += "The player " + -1*FX[i][1] + " before this player";
                        s = "s";
                    }
                    else if(FX[i][1] < 11) {
                        output += "The player " + FX[i][1] + " after this player";
                        s = "s";
                    }
                    else if(FX[i][1] == 11) {
                        output += "Any one player";
                        s = "s";
                    }
                    else if(FX[i][1] < 20) {
                        output += "Any " + (FX[i][1] - 10) + " players";
                        s = "";
                    }
                    else {
                        output += "All players ";
                        s = "";
                    }
                }
                if(FX[i][n-7] != 0) output += " gain" + s + " " + FX[i][n-7] + " elixir,";
                if(FX[i][n-6] != 0) output += " gain" + s + " " + FX[i][n-6] + " money,";
                if(FX[i][n-5] != 0) output += " gain" + s + " " + FX[i][n-5] + " attack,";
                if(FX[i][n-4] != 0) output += " gain" + s + " " + FX[i][n-4] + " health,";
                if(FX[i][n-3] != 0) output += " remove" + s + " " + (-1*FX[i][n-3]) + " from the location,";
                if(FX[i][n-2] != 0) output += " draw" + s + " " + FX[i][n-2] + " cards,";
                if(FX[i][n-1] != 0) {
                    output += " banish"
                    if(s == "s") output += "es";
                    output += " " + FX[i][n-1] + " cards,";
                }
                output = output.slice(0, output.length - 1);
                if(j == 3) {
                    output += " for each"
                    // Type crap
                    output += " card played."
                }
                if(FX[i][0] == 1) 
                    output += "; or\n";
                else
                    output += ".\n";
            }
        }
        i++;
    }
    return output;
}*/