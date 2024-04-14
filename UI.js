// Creates a new HTML div representing a card
// CardNum is the position of the div in the flexbox
// CardID is the ID of the card (from the CSV)
function createCardSlot(player, cardNum, cardID) {
    // Create a new div
    const newDiv = document.createElement("div");

    // Get a reference to the container element
    let container;
    if(player == 0) {
        container = document.getElementById("cardShop");
        // Set basic attributes for the div
        newDiv.id = "shopCard" + cardNum; // Assign a unique ID
        newDiv.className = "shopCard"; // You can add classes if needed
    }
    else {
        container = document.getElementById("mainCardHand");
        // Set basic attributes for the div
        newDiv.id = "card" + cardNum; // Assign a unique ID
        newDiv.className = "card"; // You can add classes if needed
    }

    // Append the new div to the container
    container.appendChild(newDiv);
    
    // Set custom attributes for the div
    setCardAttributes(player, cardNum, cardID);
}



function setCardAttributes(player, cardHTMLidNum, cardID) {
    // Gets the HTML card
    let card;
    let type = 0;
    if(player == 0) {
        card = document.getElementById("shopCard" + cardHTMLidNum);
        // Sets the onclick value to a function
        if(card == null) {
            return;
        }
        card.onclick = function() {
            buyCard(cardHTMLidNum, cardID);
        };
        type = 1;
    }
    else {
        card = document.getElementById("card" + cardHTMLidNum);
        // Sets the onclick value to a function
        card.onclick = function() {
            player.playCard(cardHTMLidNum);
        };
    }

    // Calculates if the card costs both elixir and money, or only requires one.
    let costConj = "and";
    if(cards[cardID][1] > 0 && cards[cardID][2] > 0) {
        costConj = "or";
    }
    
    // Sets the attributes to the values specified in the card array
    card.setAttribute("cid", cardID);
    card.setAttribute("cname", cards[cardID][0]);
    card.setAttribute("cecost", Math.abs(cards[cardID][1]));
    card.setAttribute("cmcost", Math.abs(cards[cardID][2]));
    card.setAttribute("cccost", costConj);
    card.setAttribute("ceffect", cards[cardID][5]);

    //Displays the card attributes
    displayCardAttributes(cardHTMLidNum, type);
}



// Function to display card attributes inside the card
function displayCardAttributes(cardHTMLidNum, type = 0) {
    // Gets the HTML card
    let card;
    if(type == 0)
        card = document.getElementById("card" + cardHTMLidNum);
    else
        card = document.getElementById("shopCard" + cardHTMLidNum);
  
    // Remove all existing text first
    card.innerHTML = "";
  
    // Get card attributes
    let name1 = card.getAttribute("cname");
    let mcost1 = card.getAttribute("cmcost");
    let ecost1 = card.getAttribute("cecost");
    let conj1 = card.getAttribute("cccost");
    let effect1 = card.getAttribute("ceffect");
    
    // Create elements for each attribute
    let name = document.createElement("p");
    let effect = document.createElement("p");
    let mcost = document.createElement("p");
    let ecost = document.createElement("p");
    let conj = document.createElement("p");
  
    // Set content for cost elements
    name.textContent = "\n" + name1;
    effect.textContent = effect1;
    mcost.textContent = "$" + mcost1;
    ecost.textContent = ecost1 + "e";
    conj.textContent = conj1;

    // Add styles to elements (adjust as needed)
    name.style.position = "absolute";
    name.style.top = "12px";
    name.style.textAlign = "center";
    effect.style.position = "absolute";
    effect.style.top = "48px";
    effect.style.textAlign = "center";
    effect.style.width = "100%"
    ecost.style.position = "absolute";
    ecost.style.top = "-8px";
    ecost.style.left = "2px";
    mcost.style.position = "absolute";
    mcost.style.top = "-8px";
    mcost.style.right = "2px";
    conj.style.position = "absolute";
    conj.style.top = "-8px";
    conj.style.textAlign = "center";
    if(conj1 == "and") conj.style.color = "#774444";
    else conj.style.color = "#444477";

    // Append name, value, and suit elements to the card
    card.appendChild(ecost);
    card.appendChild(mcost);
    card.appendChild(name);
    card.appendChild(effect);
    card.appendChild(conj);
}


function displayAllCardAttributes() {
    // Get all cards
    let elements = document.getElementsByClassName("card");
    // Display card attributes of each card
    for (let i = 0; i < elements.length; i++) {
        displayCardAttributes(elements[i].id);
    }
    // Get all shop cards
    elements = document.getElementsByClassName("shopCard");
    // Display card attributes of each card
    for (let i = 0; i < elements.length; i++) {
        displayCardAttributes(elements[i].id, 1);
    }
}



function removeCard(cardHTMLidNum) {
    //playCard(cardHTMLidNum);
    if(document.getElementById("card" + cardHTMLidNum) != null)
        document.getElementById("card" + cardHTMLidNum).remove();
    else console.log("Attempted to remove a null card: " + cardHTMLidNum);
}



function changeShopCardColors() {
    let cardShop = document.getElementById("cardShop");
    for(let i=0; i<shop.shopCardList.length; i++) {
        if((p1._elixir >= cards[shop.shopCardList[i]][1] && cards[shop.shopCardList[i]][1] > 0) || (p1._money >= cards[shop.shopCardList[i]][2] && cards[shop.shopCardList[i]][2] > 0)) {
            cardShop.querySelector(`#shopCard${i}`).style.backgroundColor = "#99ccaa";
        }
        else {
            cardShop.querySelector(`#shopCard${i}`).style.backgroundColor = "#ccbbaa";
        }
    }
    // Shop reroll buttons
    let shopRerollButtonElixir = document.getElementById("shopRerollButtonElixir");
    let shopRerollButtonMoney = document.getElementById("shopRerollButtonMoney");
    document.getElementById("shopRerollCostElixir").innerHTML = Math.round(shop.rerollCostElixir);
    document.getElementById("shopRerollCostMoney").innerHTML = Math.round(shop.rerollCostMoney);
    if(p1._elixir >= Math.round(shop.rerollCostElixir))
        shopRerollButtonElixir.style.backgroundColor = "#aacc99";
    else
        shopRerollButtonElixir.style.backgroundColor = "#cc9988";
    if(p1._money >= Math.round(shop.rerollCostMoney))
        shopRerollButtonMoney.style.backgroundColor = "#aacc99";
    else
        shopRerollButtonMoney.style.backgroundColor = "#cc9988";
}



function setPlayerHealthLevel(currentHealth, maxHealth) {
    let percentage = 100*currentHealth/maxHealth;
    const healthLevelElement = document.getElementById("playerHealthLevel");
    const playerCurrentHealthElement = document.getElementById("playerCurrentHealth");
    const playerMaxHealthElement = document.getElementById("playerMaxHealth");
    // Scale the color components (Red to Green) based on the percentage
    const red = Math.min(255, -4 * percentage + 400);
    const green = Math.min(200, 4 * percentage);
    const blue = 0;

    playerCurrentHealthElement.innerHTML = currentHealth;
    playerMaxHealthElement.innerHTML = maxHealth;
    healthLevelElement.style.width = percentage + "%";
    healthLevelElement.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
}



function createVillainSlot(villainNum, villain) {
    // Get a reference to the container element
    const container = document.getElementById("villainSection");

    // Updates the Villain List
    if(villainList[villainNum] != undefined && villainList[villainNum] != null && document.getElementById("villain" + villainNum) != null) {
        if(villainList[villainNum].currentHealth <= 0) { // villain has no HP left, remove it
            
        }
        else {
            console.log("WARNING: Attempting to overwrite an existing villain slot.");
        }
        document.getElementById("villain" + villainNum).remove();
    }
    villainList[villainNum] = villain;

    // Create a new div
    const newDiv = document.createElement("div");

    // Set basic attributes for the div
    newDiv.id = "villain" + villainNum; // Assign a unique ID
    newDiv.className = "villain"; // You can add classes if needed
    newDiv.setAttribute("vid", villain.dex); // This is the ID of the villain

    // Append the new div to the container
    container.appendChild(newDiv);
    
    // Set custom attributes for the div
    setVillainAttributes(villainNum, villain);
}


function setVillainAttributes(villainNum, villain) {
    // Get a reference to the container element
    const container = document.getElementById("villain" + villainNum);
    if(container == null) return;

    // First, remove duplicate divs if used to update attributes
    removedName = container.getElementsByClassName("villainName");
    removedLevel = container.getElementsByClassName("villainLevel");
    removedHealthBar = container.getElementsByClassName("villainHealthBar");
    removedAttackButtons = container.getElementsByClassName("villainAttackButtons");
    if(removedName.length > 0) container.removeChild(removedName[0]);
    if(removedLevel.length > 0) container.removeChild(removedLevel[0]);
    if(removedHealthBar.length > 0) container.removeChild(removedHealthBar[0]);
    if(removedAttackButtons.length > 0) container.removeChild(removedAttackButtons[0]);

    // Dealing with linebreaks
    var childNodes = container.childNodes;
    for (let i = childNodes.length - 1; i >= 0; i--) {
        let node = childNodes[i];
        if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'BR') {
            container.removeChild(node);
        }
    }
    const br1 = document.createElement("br");
    const br2 = document.createElement("br");

    // The name part of the villain
    let nameDiv = document.createElement("div");
    nameDiv.classList.add("villainName");
    nameDiv.textContent = villain.title;

    // The level part of the villain
    let levelDiv = document.createElement("div");
    levelDiv.classList.add("villainLevel");
    let levelSpan = document.createElement("span");
    levelSpan.textContent = "Level " + villain.level;
    levelDiv.appendChild(levelSpan);

    // The health bar part
    let healthBarDiv = document.createElement("div");
    healthBarDiv.classList.add("villainHealthBar");
    healthBarDiv.id = "villainHealthBar" + villainNum;
    let healthLevelDiv = document.createElement("div");
    healthLevelDiv.classList.add("villainHealthLevel");
    healthLevelDiv.id = "villainHealthLevel";
    healthBarDiv.appendChild(healthLevelDiv);

    // The health readout part
    let healthReadoutDiv = document.createElement("div");
    healthReadoutDiv.classList.add("villainHealthReadout");

    let cHealthSpan = document.createElement("span");
    let mHealthSpan = document.createElement("span");
    cHealthSpan.id = "villainCurrentHealthSpan";
    mHealthSpan.id = "villainMaxHealthSpan";
    //cHealthSpan.textContent = villain.currentHealth;
    //mHealthSpan.textContent = villain.maxHealth;

    let slashTextNode = document.createTextNode("/");
    healthReadoutDiv.appendChild(cHealthSpan);
    healthReadoutDiv.appendChild(slashTextNode); // Append the text node
    healthReadoutDiv.appendChild(mHealthSpan);
    healthBarDiv.appendChild(healthReadoutDiv);

    // The attack buttons
    let villainAttackDiv = document.createElement("div");
    let attack1button = document.createElement("button");
    let attackMaxbutton = document.createElement("button");
    villainAttackDiv.className = "villainAttackButtons";
    attack1button.className = "villainDamage1";
    attackMaxbutton.className = "villainDamageMax";
    attack1button.textContent = "- 1a";
    attackMaxbutton.textContent = "-Max";

    attack1button.onclick = function() {
        p1.attackVillain(villainNum, 1);
    };
    attackMaxbutton.onclick = function() {
        p1.attackVillain(villainNum, p1._attack);
    };

    villainAttackDiv.appendChild(attack1button);
    villainAttackDiv.appendChild(attackMaxbutton);

    // appends the new divs to the container div
    container.appendChild(br1);
    container.appendChild(nameDiv);
    container.appendChild(br2);
    container.appendChild(levelDiv);
    container.appendChild(healthBarDiv);
    container.appendChild(villainAttackDiv);

    // Modify the health bar readout
    setVillainHealthBar(villainNum, villain);
    changeVillainLevelColor(villainNum, villain.level);
}

function setVillainHealthBar(villainNum, villain) {
    let ch = villain.currentHealth;
    let mh = villain.maxHealth;
    let percentage = ch/mh*100;

    const container = document.getElementById("villainHealthBar" + villainNum);
    const healthLevelElement = container.querySelector("#villainHealthLevel");
    const currentHealthElement = container.querySelector("#villainCurrentHealthSpan");
    const maxHealthElement = container.querySelector("#villainMaxHealthSpan");

    // Scale the color components (Red to Green) based on the percentage
    const red = Math.min(127, 4 * percentage);
    const green = 20;
    const blue = Math.max(0, -2 * percentage + 200);

    currentHealthElement.innerHTML = ch;
    maxHealthElement.innerHTML = mh;
    healthLevelElement.style.width = percentage + "%";
    healthLevelElement.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
}

function changeVillainLevelColor(villainNum, nLevel) {
    const container = document.getElementById("villain" + villainNum);
    const levelText = container.getElementsByClassName("villainLevel")[0];
    const red = Math.min(255, Math.floor(235 + 0.2*nLevel));
    const green = Math.max(0, 238 - 3*(nLevel-1));
    const blue = Math.max(0, 238 - 15*(nLevel-1));
    levelText.style.color = `rgb(${red}, ${green}, ${blue})`;
}

function changeZoneLevelColor() {
    const zoneText = document.getElementsByClassName("zoneCount")[0];
    const red = Math.min(255, 155 + 10*(zone-1));
    const green = Math.max(0, 238 - 3*(zone-1));
    const blue = Math.max(0, 155 - 10*(zone-1));
    zoneText.style.color = `rgb(${red}, ${green}, ${blue})`;
}

function changeLivesColor(player) {
    const livesText = document.getElementsByClassName("playerLives")[0];
    let ratio = (player._lives - 1) / (player._maxLives - 1);
    const red = Math.min(255, Math.round(256*Math.sqrt(1-ratio)));
    const green = Math.max(0, Math.round(238*ratio));
    const blue = 0;
    livesText.style.color = `rgb(${red}, ${green}, ${blue})`;
}