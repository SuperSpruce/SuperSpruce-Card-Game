// Initializes the game variables
var numPlayers = 1;
var p1;
//p1 = new Player("Red");
var zone = 1;
var turnNum = 1;
var villainList = [];
var fieldEffects = [];
var highscores = [0, 0, 0, 0, 0];
var shop = {
    drawnShopCards: 0,
    shopCardList: [],
    rerollCostElixir: 99,
    rerollCostMoney: 99
};

// Write saving code here
function save() {
    const gameState = {
        numPlayers: numPlayers,
        zone: zone,
        turnNum: turnNum,
        fieldEffects: fieldEffects,
        highscores: highscores,
        shop: shop,
        pr: pr,
        p1: p1.toJSON(),
        villainList: villainList.map(villain => (villain ? villain.toJSON() : null))
      };
    
      const gameStateJSON = JSON.stringify(gameState);
      localStorage.setItem('gameState', gameStateJSON);
}

function load(option = 0) {
    // Show loading screen initially
    //document.getElementById("loadingScreen").style.display = "flex";

    // Gets all data variables
    cards = readCSV(cardCSVdata);
    villainDex = readCSV(villainCSVdata);
    moveDex = readCSV(moveCSVdata);

    // Gets the game state
    const gameStateJSON = localStorage.getItem('gameState');

    if (gameStateJSON && option == 0) {  // Loading a previous save
        console.log("Notice: You are loading an existing save.");
        const gameState = JSON.parse(gameStateJSON);

        numPlayers = gameState.numPlayers;
        zone = gameState.zone;
        turnNum = gameState.turnNum;
        fieldEffects = gameState.fieldEffects;
        highscores = gameState.highscores;
        shop = gameState.shop;
        pr = gameState.pr;
        p1 = Player.fromJSON(gameState.p1);
        villainList = gameState.villainList.map(villainJSON => {
            if (villainJSON === null) {
              return null;
            }
            return Villain.fromJSON(villainJSON);
        });

        // Checks for missing variables
        checkForMissingVariables();

        // Additional logic to initialize or update your game state
        if(p1._lives <= 0) {
            document.getElementById("loadingScreen").style.display = "block";
        }
        else {
            document.getElementById("gameScreen").style.display = "block";
        }
    }
    else {  // First load into the game. Welcome!
        console.log("Notice: You are loading a fresh save.");
        // Removes existing cards, because we want a fresh start
        let cardhand = document.getElementById("mainCardHand");
        let handCards = cardhand.getElementsByClassName("card");
        let numHandCards = handCards.length;
        for(let i=0; i<numHandCards; i++) {
            cardhand.removeChild(handCards[0]);
        }
        let shop = document.getElementById("cardShop");
        let shopCards = shop.getElementsByClassName("shopCard");
        let numShopCards = shopCards.length;
        for(let i=0; i<numShopCards; i++) {
            shop.removeChild(shopCards[0]);
        }
        // Initializes the game
        numPlayers = 1;
        p1 = new Player("Red");
        zone = 1;
        turnNum = 1;
        shop.drawnShopCards = 0;
        shop.shopCardList = [];
        fieldEffects = [];
        highscores = [0, 0, 0, 0, 0];
        Villain.setUpNew();
        for(let i=0; i<4; i++) {
            addCardToShop(i);
        }
        p1._cardsToDraw = p1._initialCards;
        document.getElementById("gameScreen").style.display = "block";
    }
    updateEverything();
}



function checkForMissingVariables() {
    if(!pr) {
        load(1);
    }
    else if(!pr.srb) {
        pr.srb = 0;
        pr.srd = 0;
        pr.srr = 0;
        pr.sru = 0;
    }
    else if(!pr.zsc_max) {
        pr.zsc = 0;
        pr.zsc_max = 0;
    }
}



// Updates all UI elements
function updateEverything() {
    if(pr.tab == -1) {
        document.getElementById("prestigeScreen").style.display = "none";
    }
    else if(pr.tab == -2) {
        document.getElementById("prestigeScreen").style.display = "none";
    }

    if(p1._turnState == 0) {
        document.getElementById("playerStatusText").innerHTML = "Draw your initial hand.";
        p1._cardsToDraw = p1._initialCards;
    }

    document.getElementById("turnText").innerHTML = turnNum;
    document.getElementById("zoneText").innerHTML = zone;
    document.getElementById("p1lives").innerHTML = p1._lives;
    document.getElementById("p1score").innerHTML = p1._score;
    document.getElementById("p1elixir").innerHTML = p1._elixir;
    document.getElementById("p1money").innerHTML = p1._money;
    document.getElementById("p1attack").innerHTML = p1._attack;
    document.getElementById("playerAvailableCards").innerHTML = p1._cardsToDraw;

    setPlayerHealthLevel(p1._health, p1._maxHealth);
    changeLivesColor(p1);
    changeZoneLevelColor();

    // Player cards
    let i;
    let cardhand = document.getElementById("mainCardHand");
    let handCards = cardhand.getElementsByClassName("card");
    let numHandCards = handCards.length;
    for(i=0; i<numHandCards; i++) {
        cardhand.removeChild(handCards[0]);
    }
    for(i=0; i<p1._deck.hand.length; i++) {
        if(p1._deck.hand[i] > 0)
            createCardSlot(p1, i+1, p1._deck.hand[i]);
    }
    /*while(i<=p1._deck.hand.length) {
        if(p1._deck.hand[i-1] != null) {
            let temp = p1._deck.hand[i-1];
            removeCard(i);
            createCardSlot(p1, i, temp);
        }
        i++;
    }*/
    // Shop cards
    for(i=0; i<shop.shopCardList.length; i++) {
        if(document.getElementById("shopCard" + i) == null) {
            createCardSlot(0, i, shop.shopCardList[i]);
        }
        setCardAttributes(0, i, shop.shopCardList[i]);
    }
    if(pr.rx1 == 0)
        document.getElementById("shopRerollButtonElixir").style.visibility = "hidden";
    else
        document.getElementById("shopRerollButtonElixir").style.visibility = "visible";
    if(pr.rm1 == 0)
        document.getElementById("shopRerollButtonMoney").style.visibility = "hidden";
    else
        document.getElementById("shopRerollButtonMoney").style.visibility = "visible";
    document.getElementById("shopRerollCostElixir").innerHTML = shop.rerollCostElixir;
    document.getElementById("shopRerollCostMoney").innerHTML = shop.rerollCostMoney;
    changeShopCardColors();

    // Villain attributes
    let villainSlots = document.getElementsByClassName("villain");
    for(i=0; i<villainSlots.length; i++) {
        document.getElementById("villainSection").removeChild(villainSlots[i]);
    }
    for(i=1; i<villainList.length; i++) {
        createVillainSlot(i, villainList[i]);
    }
    flashAttackButtons();
    flashDrawPile();
    advanceZoneMusic();
}


// Function to start a new game. Does not reset prestige currency or highscores.
function softReset() {
    console.log("Notice: You are loading a new round.");
    // Removes existing cards, because we want a fresh start
    let cardhand = document.getElementById("mainCardHand");
    let handCards = cardhand.getElementsByClassName("card");
    let numHandCards = handCards.length;
    for(let i=0; i<numHandCards; i++) {
        cardhand.removeChild(handCards[0]);
    }
    let shopElement = document.getElementById("cardShop");
    let shopCards = shopElement.getElementsByClassName("shopCard");
    let numShopCards = shopCards.length;
    for(let i=0; i<numShopCards; i++) {
        shopElement.removeChild(shopCards[0]);
    }
    // Takes number of villains down to 2
    let villains = document.getElementsByClassName("villain");
    let villainSection = document.getElementById("villainSection");
    while(villainList.length > 3) {
        villainList.pop();
        villainSection.removeChild(villains[villainList.length-1]);
    }
    // Goes to the game screen
    pr.tab = -1;
    // Initializes a new round
    p1 = new Player("Red");
    zone = 1+pr.zsc;
    turnNum = 0;
    shop.drawnShopCards = 0;
    shop.shopCardList = [];
    shop.rerollCostElixir = 6-pr.srb;
    shop.rerollCostMoney = 6-pr.srb;
    fieldEffects = [];
    Villain.setUpNew();
    for(let i=0; i<4+pr.sc1; i++) {
        addCardToShop(i);
    }
    p1._elixir = 0;
    p1._money = 0;
    p1._attack = 0;
    p1._cardsToDraw = stochasticRound(p1._initialCards);
    p1._shopCardsPlacedInHand = pr.sb1;
    document.getElementById("gameScreen").style.display = "block";
    document.getElementById("loadingScreen").style.display = "none";
    document.getElementById("prestigeScreen").style.display = "none";
    updateEverything();
    save();
}


// Function to Hard Reset the game
function hardReset() {
    let confirmation = confirm("WARNING! If you click 'OK', all of your progress through all of your runs will be lost! Do you really wish to proceed??")
    if(!confirmation)
        return;
    localStorage.removeItem('gameState');
    load();
}



function copyTextToClipboard(text) {
    navigator.clipboard.writeText(text)
        .then(() => {
        alert('Save successfully exported to clipboard!');
        })
        .catch((error) => {
        console.error('Unable to export save to clipboard: ', error);
        });
}

function exportSave() {
    // Gets the game state
    const gameStateJSON = localStorage.getItem('gameState');
    copyTextToClipboard(gameStateJSON);
}

function showImportWindow() {
    document.getElementById("importWindow").style.visibility = "visible";
}
function closeImportWindow() {
    document.getElementById("importWindow").style.visibility = "hidden";
}

function importSave() {
    const textInput = document.getElementById('saveImport');
    let save = textInput.value.trim();
    
    if (save && save.substring(0,1) == "{") {
        let confirmation = confirm("WARNING! If you click 'OK', your save will be overwritten! Are you sure you want to do this?");
        if(!confirmation)
            return;

        localStorage.gameState = save;
        load();
        alert("Save successfully imported!");
        closeImportWindow();
    } 
    else if(save) {
        alert('Error! Invalid save!');
    }
    else {
        alert('Please paste your savefile before importing the save.');
    }
  }


// Loads the game
load();

// Wait for all DOM content to be loaded to prevent bugs resulting from a partially loaded game
document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM Content Loaded");
    // The DOM is ready, hide the loading screen
    setTimeout(function () {
        if(p1._lives != null && p1._lives > 0) {
            // Hide the loading screen
            document.getElementById("loadingScreen").style.display = "none";

            // Show the game content
            document.getElementById("gameScreen").style.display = "block";
        }
        else {
            p1.gameOverUI(-1);
        }
    }, 0);
});