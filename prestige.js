// These are all of the relavant prestige data.
var pr = {
    // The mighty prestige currencies
    r: 0,    // Rubies
    s: 0,    // Sapphires
    e: 0,    // Emeralds
    // TAB 1: Player buffs
    mh1: 0,  // Max health upgrade, flat increase
    mh2: 0,  // Max health upgrade, bigger increase when lives are lower
    ml1: 0,  // Max lives upgrade, flat increase
    // TAB 2: Turn buffs
    ic1: 0,  // Upgrade to draw more cards at the start of your turn
    x11: 0,  // Gains elixir on your first turn
    m11: 0,  // Gains money on your first turn
    a11: 0,  // Gains attack on your first turn
    // TAB 3: Shop buffs
    sb1: 0,  // Makes cards that you buy go in your hand instead of in the discard, n times per game
    sc1: 0,  // Raises the number of cards available to buy in the shop
    rx1: 0,  // Allows the shop cards to be rerolled for elixir.
    rm1: 0,  // Allows the shop cards to be rerolled for money.
    sru: 0,  // Unhooks the elixir and money costs of rerolling the shop.
    srb: 0,  // Lowers the base cost of rerolling the shop.
    srr: 0,  // Nerfs the cost raise when the shop is rerolled.
    srd: 0,  // Makes the shop reroll cost decrease to the base cost quicker.
    // TAB 4: Villain nerfs
    xv1: 0,  // Nerfs villain XP gain by a multiplicative amount
    xv2: 0,  // Nerfs villain XP gain by lowering the zone power
    st1: 0,  // Nerfs the stun penalty by making your lost money round down
    st2: 0,  // Nerfs the stun penalty by making your lost cards round down
    // TAB 5: Softcap Nerfs
    csa: 0,  // Makes the card softcap less abrupt
    csr: 0,  // Raises the number of cards before the card softcap
    csx: 0,  // Makes the card softcap less extreme
    // TAB 6: Prestige currency boosts
    grs: 0,  // Upgrade to gain more rubies, costs sapphires
    gre: 0,  // Upgrade to gain more rubies, costs emeralds
    gsr: 0,  // Upgrade to gain more sapphires, costs rubies
    gse: 0,  // Upgrade to gain more sapphires, costs emeralds
    ger: 0,  // Upgrade to gain more emeralds, costs rubies
    ges: 0,  // Upgrade to gain more emeralds, costs 
    // TAB 7: Prestige currency exchange
    // TAB 8: Start New Game
    zsc_max: 0,  // Start at a higher zone, but decrease zone scaling (optional)
    zsc: 0,
    lol: 0,  // Lives or location, don't implement until 1.2
    // META
    tab: -1
};
var currencyFrom = 0;
var currencyTo = 0;


// Prestige UI functions
function prestigeTab(t = 0) {
    document.getElementById("prestigeScreen").style.display = "block";
    document.getElementById("loadingScreen").style.display = "none";
    if(t <= 0) {
        t = 8;
    }
    for(let i=1; i<=8; i++) {
        if(t == i) {
            document.getElementById("prestigeTabButton" + i).style.backgroundColor = `rgb(${170}, ${230}, ${230})`;
            document.getElementById("prestigeTab" + i).style.display = "grid";
        }
        else {
            document.getElementById("prestigeTabButton" + i).style.backgroundColor = `rgb(${210}, ${210}, ${210})`;
            document.getElementById("prestigeTab" + i).style.display = "none";
        }
    }
    // Color the upgrade buttons
    colorUpgradeButtons(t);
}


function colorUpgradeButtons(t) {
    // Also updates the rubies, sapphires, and emeralds up top
    document.getElementById("rubiesDisplay").innerHTML = "Rubies: " + pr.r;
    document.getElementById("sapphiresDisplay").innerHTML = "Sapphires: " + pr.s;
    document.getElementById("emeraldsDisplay").innerHTML = "Emeralds: " + pr.e;

    if(t == 7) { // Special case for the prestige currency exchange
        // Color the ruby/sapphire/emerald buttons
        let exchangeFromRubies = document.getElementById("exchangeFromRubies");
        let exchangeFromSapphires = document.getElementById("exchangeFromSapphires");
        let exchangeFromEmeralds = document.getElementById("exchangeFromEmeralds");
        let exchangeToRubies = document.getElementById("exchangeToRubies");
        let exchangeToSapphires = document.getElementById("exchangeToSapphires");
        let exchangeToEmeralds = document.getElementById("exchangeToEmeralds");
        let currentValue;
        let currencyFromString;
        let currencyToString;

        exchangeToRubies.classList.remove("rubySelect1");
        exchangeToSapphires.classList.remove("sapphireSelect1");
        exchangeToEmeralds.classList.remove("emeraldSelect1");
        exchangeToRubies.classList.remove("rubySelect2");
        exchangeToSapphires.classList.remove("sapphireSelect2");
        exchangeToEmeralds.classList.remove("emeraldSelect2");

        exchangeFromRubies.classList.remove("rubySelect2");
        exchangeFromRubies.classList.remove("rubySelect3");
        exchangeFromSapphires.classList.remove("sapphireSelect2");
        exchangeFromSapphires.classList.remove("sapphireSelect3");
        exchangeFromEmeralds.classList.remove("emeraldSelect2");
        exchangeFromEmeralds.classList.remove("emeraldSelect3");

        if(currencyTo == 1) {
            currencyToString = "rubies";
            exchangeToRubies.classList.add("rubySelect3");
            exchangeToSapphires.classList.remove("sapphireSelect3");
            exchangeToEmeralds.classList.remove("emeraldSelect3");
            if(currencyFrom == 1) currencyFrom = 0;
        }
        else if(currencyTo == 2) {
            currencyToString = "sapphires";
            exchangeToSapphires.classList.add("sapphireSelect3");
            exchangeToRubies.classList.remove("rubySelect3");
            exchangeToEmeralds.classList.remove("emeraldSelect3");
            if(currencyFrom == 2) currencyFrom = 0;
        }
        else if(currencyTo == 3) {
            currencyToString = "emeralds";
            exchangeToEmeralds.classList.add("emeraldSelect3");
            exchangeToSapphires.classList.remove("sapphireSelect3");
            exchangeToRubies.classList.remove("rubySelect3");
            if(currencyFrom == 3) currencyFrom = 0;
        }
        if(currencyTo == 0) {
            exchangeToRubies.classList.remove("rubySelect3");
            exchangeToSapphires.classList.remove("sapphireSelect3");
            exchangeToEmeralds.classList.remove("emeraldSelect3");
        }

        if(currencyFrom == 1) {
            currencyFromString = "rubies";
            currentValue = pr.r;
            exchangeFromRubies.classList.add("rubySelect3");
            exchangeToRubies.classList.add("rubySelect1");
        }
        else if(currencyFrom == 2) {
            currencyFromString = "sapphires";
            currentValue = pr.s;
            exchangeFromSapphires.classList.add("sapphireSelect3");
            exchangeToSapphires.classList.add("sapphireSelect1");
        }
        else if(currencyFrom == 3) {
            currencyFromString = "emeralds";
            currentValue = pr.e;
            exchangeFromEmeralds.classList.add("emeraldSelect3");
            exchangeToEmeralds.classList.add("emeraldSelect1");
        }
        if(exchangeFromRubies.classList.length == 1) {
            exchangeFromRubies.classList.add("rubySelect2");
        }
        if(exchangeFromSapphires.classList.length == 1) {
            exchangeFromSapphires.classList.add("sapphireSelect2");
        }
        if(exchangeFromEmeralds.classList.length == 1) {
            exchangeFromEmeralds.classList.add("emeraldSelect2");
        }
        if(exchangeToRubies.classList.length == 1) {
            exchangeToRubies.classList.add("rubySelect2");
        }
        if(exchangeToSapphires.classList.length == 1) {
            exchangeToSapphires.classList.add("sapphireSelect2");
        }
        if(exchangeToEmeralds.classList.length == 1) {
            exchangeToEmeralds.classList.add("emeraldSelect2");
        }

        // Color the exchange buttons
        const upgrades = document.getElementById("prestigeTab7").getElementsByClassName("proportionSelectionUnit");
        if(currencyFrom == 0 || currencyTo == 0) {
            currentValue = 0;
        }
        colorUpgradeButtonsBasic(upgrades[0], currentValue, 5);
        colorUpgradeButtonsBasic(upgrades[1], currentValue, 500);
        colorUpgradeButtonsBasic(upgrades[2], currentValue, 50);
        colorUpgradeButtonsBasic(upgrades[3], currentValue, 10);
        colorUpgradeButtonsBasic(upgrades[4], currentValue, 5);
        let exchangeValue = [5, Math.floor(currentValue*0.01), Math.floor(currentValue*0.1), Math.floor(currentValue*0.5), currentValue];
        for(let i=1; i<=5; i++) {
            if(currencyFrom != 0 && currencyTo != 0)
                document.getElementById("exchange" + i).innerHTML = "Exchange " + exchangeValue[i-1] + " " + currencyFromString + " for " + Math.floor(exchangeValue[i-1]/5) + " " + currencyToString + ".";
            else
                document.getElementById("exchange" + i).innerHTML = "";
        }
    }

    const container = document.getElementById("prestigeTab" + t);
    const upgrades = container.getElementsByClassName("upgrade");
    let effectSpan, levelSpan, costSpan;
    for(let i=0; i<upgrades.length; i++) {
        // Gets the relevant spans
        let upgradeID = upgrades[i].id.substring(1);
        effectSpan = document.getElementById("e" + upgradeID);
        levelSpan = document.getElementById("l" + upgradeID);
        costSpan = document.getElementById("c" + upgradeID);

        let cost = getUpgradeCost(t,i);
        let levels = getUpgradeLevel(t,i);
        let effects = getUpgradeEffect(t,i);
        // Modifies the slider for upgrades with a slider
        if(t == 8) {
            sliderSpan = document.getElementById("i" + upgradeID);
            sliderSpan.max = levels[1];
            sliderSpan.value = levels[0];
        }
        // Modifies the relevant spans
        if(effectSpan == null) {
            effectSpan = document.getElementsByClassName("e" + upgradeID);
            for(let j=0; j<effectSpan.length; j++) {
                effectSpan[j].innerHTML = effects[j];
            }
        }
        if(levelSpan == null) {
            levelSpan = document.getElementsByClassName("l" + upgradeID);
            levelSpan[0].innerHTML = levels[0];
            levelSpan[1].innerHTML = levels[1];
        }
        if(costSpan == null) {
            costSpan = document.getElementsByClassName("c" + upgradeID);
            for(let j=0; j<costSpan.length; j++) {
                costSpan[j].innerHTML = cost[1];
            }
        }
        effectSpan.innerHTML = getUpgradeEffect(t,i);
        levelSpan.innerHTML = getUpgradeLevel(t,i);
        costSpan.innerHTML = cost[1];
        // Turns an numbers into an array
        let costArray = [];
        if(cost[0][0] != undefined) {
            costArray = cost[0];
        }
        else {
            costArray[0] = cost[0];
        }
        let satisfied = true;
        if(costArray.includes(1)) {
            if(pr.r < cost[1]) 
                satisfied = false;
        }
        if(costArray.includes(2)) {
            if(pr.s < cost[1])
                satisfied = false;
        }
        if(costArray.includes(3)) {
            if(pr.e < cost[1]) 
                satisfied = false;
        }
        // Colors the upgrade buttons
        let buttonCheck = document.getElementById("b" + upgradeID);
        if(satisfied) {
            if(buttonCheck != null) {
                buttonCheck.style.backgroundColor = "#44dd55";
            }
            else {
                upgrades[i].style.backgroundColor = "#44dd55";
            }
        } 
        else {
            if(buttonCheck != null) {
                buttonCheck.style.backgroundColor = "#cc5555";
            }
            else {
                upgrades[i].style.backgroundColor = "#cc5555";
            }
        }
    }
}


function colorUpgradeButtonsBasic(element, amount, cost) {
    if(amount >= cost) {
        element.style.backgroundColor = "#44dd55";
    }
    else {
        element.style.backgroundColor = "#cc5555";
    }
}



// Gets the cost of each upgrade
function getCost_mh1() {return Math.round(10*Math.pow(pr.mh1+1, 2.5));}    // rubies
function getCost_mh2() {return Math.round(50*Math.pow(pr.mh2+1, 2.5));}    // rubies
function getCost_ml1() {return 100*Math.pow(pr.ml1+1, 4);}     // rubies
function getCost_ic1() {return Math.round(0.01*Math.pow(pr.ic1, 5) + Math.pow(pr.ic1, 3) + 50*pr.ic1 + 40);} // emeralds
function getCost_x11() {return 625*Math.pow(4, pr.x11);}      // emeralds
function getCost_m11() {return 400*Math.pow(4, pr.m11);}      // emeralds
function getCost_a11() {return 640*Math.pow(4, pr.a11);}      // sapphires
function getCost_sb1() {return 50*(pr.sb1+1);}           // emeralds
function getCost_sc1() {return Math.pow(10, pr.sc1+1)}   // emeralds
function getCost_rx1() { // emeralds
    if(pr.rx1 == 0) return 60;
    else return Infinity;
}
function getCost_rm1() { // emeralds
    if(pr.rm1 == 0) return 60;
    else return Infinity;
}
function getCost_sru() { // emeralds
    if(pr.sru == 0) return 2000;
    else return Infinity;
}  
function getCost_srb() {return Math.pow(2, Math.pow(2, pr.srb+3));}  // emeralds
function getCost_srr() { // emeralds
        if(pr.srr < 20) return Math.round(1e7/(Math.pow(20-pr.srr, 4)));
        else return Infinity;
}  
function getCost_srd() {return 100*Math.pow(pr.srd+1, 3);}  // emeralds
function getCost_xv1() {return Math.round(0.1*Math.pow(pr.xv1, 4) - Math.pow(pr.xv1, 3) + 5*pr.xv1*pr.xv1 + 10*pr.xv1 + 10);}  // sapphires
function getCost_xv2() {return 100*factorial(pr.xv2+1);}  // sapphires
function getCost_st1() {  // sapphires
    if(pr.st1 == 0) return 50;
    else return Infinity;
}
function getCost_st2() {  // sapphires
    if(pr.st2 == 0) return 150;
    else return Infinity;
}
function getCost_csa() {  // emeralds
    if(pr.csa < 5) return 500*Math.pow(pr.csa+1, 2);
    else return Infinity;
}
function getCost_csr() {return 1000*Math.round(Math.pow(pr.csr+1, 5 + 0.1*Math.log10(pr.csr+1)));}  // emeralds
function getCost_csx() {return 5000*Math.pow(2, pr.csx);}   // emeralds
function getCost_grs() {return Math.pow(pr.grs+3, 4);}      // sapphires
function getCost_gre() {return Math.pow(pr.gre+3, 4);}      // emeralds
function getCost_gsr() {return Math.pow(pr.gsr+3, 4);}      // rubies
function getCost_gse() {return Math.pow(pr.gse+3, 4);}      // emeralds
function getCost_ger() {return Math.pow(pr.ger+3, 4);}      // rubies
function getCost_ges() {return Math.pow(pr.ges+3, 4);}      // sapphires
function getCost_zsc() {return 25*Math.pow(pr.zsc_max+1, 3);}     // rubies, sapphires

function getUpgradeCost(t, i, c=0) {
    // 1 = rubies
    // 2 = sapphires
    // 3 = emeralds
    if(t < 1 || t > 8 || i < 0) return;
    switch(t) {
        case 1:
            switch(i) {
                case 0: return [1, getCost_mh1()];
                case 1: return [1, getCost_mh2()];
                case 2: return [1, getCost_ml1()];
            }
        case 2:
            switch(i) {
                case 0: return [3, getCost_ic1()];
                case 1: return [3, getCost_x11()];
                case 2: return [3, getCost_m11()];
                case 3: return [2, getCost_a11()];
            }
        case 3:
            switch(i) {
                case 0: return [3, getCost_sb1()];
                case 1: return [3, getCost_sc1()];
                case 2: return [3, getCost_rx1()];
                case 3: return [3, getCost_rm1()];
                case 4: return [3, getCost_sru()];
                case 5: return [3, getCost_srb()];
                case 6: return [3, getCost_srr()];
                case 7: return [3, getCost_srd()];
            }
        case 4:
            switch(i) {
                case 0: return [2, getCost_xv1()];
                case 1: return [2, getCost_xv2()];
                case 2: return [2, getCost_st1()];
                case 3: return [2, getCost_st2()];
            }
        case 5:
            switch(i) {
                case 0: return [3, getCost_csa()];
                case 1: return [3, getCost_csr()];
                case 2: return [3, getCost_csx()];
            }
        case 6:
            switch(i) {
                case 0: return [2, getCost_grs()];
                case 1: return [3, getCost_gre()];
                case 2: return [1, getCost_gsr()];
                case 3: return [3, getCost_gse()];
                case 4: return [1, getCost_ger()];
                case 5: return [2, getCost_ges()];
            }
        case 8:
            return [[1,2], getCost_zsc()];
    }
}



function getUpgradeLevel(t, i) {
    if(t < 1 || t > 8 || i < 0) return;
    switch(t) {
        case 1:
            switch(i) {
                case 0: return pr.mh1;
                case 1: return pr.mh2;
                case 2: return pr.ml1;
            }
        case 2:
            switch(i) {
                case 0: return pr.ic1;
                case 1: return pr.x11;
                case 2: return pr.m11;
                case 3: return pr.a11;
            }
        case 3:
            switch(i) {
                case 0: return pr.sb1;
                case 1: return pr.sc1;
                case 2: return pr.rx1;
                case 3: return pr.rm1;
                case 4: return pr.sru;
                case 5: return pr.srb;
                case 6: return pr.srr;
                case 7: return pr.srd;
            }
        case 4:
            switch(i) {
                case 0: return pr.xv1;
                case 1: return pr.xv2;
                case 2: return pr.st1;
                case 3: return pr.st2;
            }
        case 5:
            switch(i) {
                case 0: return pr.csa;
                case 1: return pr.csr;
                case 2: return pr.csx;
            }
        case 6:
            switch(i) {
                case 0: return pr.grs;
                case 1: return pr.gre;
                case 2: return pr.gsr;
                case 3: return pr.gse;
                case 4: return pr.ger;
                case 5: return pr.ges;
            }
        case 8:
            return [pr.zsc, pr.zsc_max];
    }
}


function getUpgradeEffect(t, i) {
    if(t < 1 || t > 8 || i < 0) return;
    switch(t) {
        case 1:
            switch(i) {
                case 0: return pr.mh1;
                case 1: return (pr.mh2/2).toFixed(1);
                case 2: return pr.ml1;
            }
        case 2:
            switch(i) {
                case 0: return (pr.ic1/10).toFixed(1);
                case 1: return pr.x11;
                case 2: return pr.m11;
                case 3: return pr.a11;
            }
        case 3:
            switch(i) {
                case 0: return pr.sb1;
                case 1: return pr.sc1;
                case 2: return pr.rx1 == 0 ? "" : "Bought!";
                case 3: return pr.rm1 == 0 ? "" : "Bought!";
                case 4: return pr.sru == 0 ? "" : "Bought!";
                case 5: return (6 - pr.srb);
                case 6: return (20 - pr.srr);
                case 7: return (100 - 200/3*Math.pow(0.9, pr.srd)).toFixed(1);
            }
        case 4:
            switch(i) {
                case 0: return Math.pow(0.95, pr.xv1).toFixed(2 - Math.floor(Math.log10(Math.pow(0.95, pr.xv1))));
                case 1: return (1.5-0.05*pr.xv2).toFixed(2);
                case 2: return pr.st1 == 0 ? "" : "Bought!";
                case 3: return pr.st2 == 0 ? "" : "Bought!";
            }
        case 5:
            switch(i) {
                case 0: return 100-20*pr.csa;
                case 1: return 10+pr.csr;
                case 2: return (2/(2-Math.pow(0.95,pr.csx))).toFixed(3);
            }
        case 6:
            switch(i) {
                case 0: return (1+pr.grs/4).toFixed(2);
                case 1: return (1+pr.gre/4).toFixed(2);
                case 2: return (1+pr.gsr/4).toFixed(2);
                case 3: return (1+pr.gse/4).toFixed(2);
                case 4: return (1+pr.ger/4).toFixed(2);
                case 5: return (1+pr.ges/4).toFixed(2);
            }
        case 8:
            return [Number(pr.zsc)+1, Math.sqrt(36+12*pr.zsc).toFixed(2)];
    }
}




// Functions that actually buy the upgrades
function buy_mh1() {
    let cost = getCost_mh1();
    if(pr.r >= cost) {
        pr.r -= cost;
        pr.mh1++;
        colorUpgradeButtons(1);
    }
}

function buy_mh2() {
    let cost = getCost_mh2();
    if(pr.r >= cost) {
        pr.r -= cost;
        pr.mh2++;
        colorUpgradeButtons(1);
    }
}

function buy_ml1() {
    let cost = getCost_ml1();
    if(pr.r >= cost) {
        pr.r -= cost;
        pr.ml1++;
        colorUpgradeButtons(1);
    }
}


function buy_ic1() {
    let cost = getCost_ic1();
    if(pr.e >= cost) {
        pr.e -= cost;
        pr.ic1++;
        colorUpgradeButtons(2);
    }
}

function buy_x11() {
    let cost = getCost_x11();
    if(pr.e >= cost) {
        pr.e -= cost;
        pr.x11++;
        colorUpgradeButtons(2);
    }
}

function buy_m11() {
    let cost = getCost_m11();
    if(pr.e >= cost) {
        pr.e -= cost;
        pr.m11++;
        colorUpgradeButtons(2);
    }
}

function buy_a11() {
    let cost = getCost_a11();
    if(pr.s >= cost) {
        pr.s -= cost;
        pr.a11++;
        colorUpgradeButtons(2);
    }
}


function buy_sb1() {
    let cost = getCost_sb1();
    if(pr.e >= cost) {
        pr.e -= cost;
        pr.sb1++;
        colorUpgradeButtons(3);
    }
}

function buy_sc1() {
    let cost = getCost_sc1();
    if(pr.e >= cost) {
        pr.e -= cost;
        pr.sc1++;
        addCardToShop(1);
        colorUpgradeButtons(3);
    }
}

function buy_rx1() {
    let cost = getCost_rx1();
    if(pr.e >= cost) {
        pr.e -= cost;
        pr.rx1++;
        colorUpgradeButtons(3);
    }
}

function buy_rm1() {
    let cost = getCost_rm1();
    if(pr.e >= cost) {
        pr.e -= cost;
        pr.rm1++;
        colorUpgradeButtons(3);
    }
}

function buy_sru() {
    let cost = getCost_sru();
    if(pr.e >= cost) {
        pr.e -= cost;
        pr.sru++;
        colorUpgradeButtons(3);
    }
}

function buy_srb() {
    let cost = getCost_srb();
    if(pr.e >= cost) {
        pr.e -= cost;
        pr.srb++;
        colorUpgradeButtons(3);
    }
}

function buy_srr() {
    let cost = getCost_srr();
    if(pr.e >= cost) {
        pr.e -= cost;
        pr.srr++;
        colorUpgradeButtons(3);
    }
}

function buy_srd() {
    let cost = getCost_srd();
    if(pr.e >= cost) {
        pr.e -= cost;
        pr.srd++;
        colorUpgradeButtons(3);
    }
}


function buy_xv1() {
    let cost = getCost_xv1();
    if(pr.s >= cost) {
        pr.s -= cost;
        pr.xv1++;
        colorUpgradeButtons(4);
    }
}

function buy_xv2() {
    let cost = getCost_xv2();
    if(pr.s >= cost) {
        pr.s -= cost;
        pr.xv2++;
        colorUpgradeButtons(4);
    }
}

function buy_st1() {
    let cost = getCost_st1();
    if(pr.s >= cost) {
        pr.s -= cost;
        pr.st1++;
        colorUpgradeButtons(4);
    }
}

function buy_st2() {
    let cost = getCost_st2();
    if(pr.s >= cost) {
        pr.s -= cost;
        pr.st2++;
        colorUpgradeButtons(4);
    }
}


function buy_csa() {
    let cost = getCost_csa();
    if(pr.e >= cost) {
        pr.e -= cost;
        pr.csa++;
        colorUpgradeButtons(5);
    }
}

function buy_csr() {
    let cost = getCost_csr();
    if(pr.e >= cost) {
        pr.e -= cost;
        pr.csr++;
        colorUpgradeButtons(5);
    }
}

function buy_csx() {
    let cost = getCost_csx();
    if(pr.e >= cost) {
        pr.e -= cost;
        pr.csx++;
        colorUpgradeButtons(5);
    }
}


function buy_grs() {
    let cost = getCost_grs();
    if(pr.s >= cost) {
        pr.s -= cost;
        pr.grs++;
        colorUpgradeButtons(6);
    }
}

function buy_gre() {
    let cost = getCost_gre();
    if(pr.e >= cost) {
        pr.e -= cost;
        pr.gre++;
        colorUpgradeButtons(6);
    }
}

function buy_gsr() {
    let cost = getCost_gsr();
    if(pr.r >= cost) {
        pr.r -= cost;
        pr.gsr++;
        colorUpgradeButtons(6);
    }
}

function buy_gse() {
    let cost = getCost_gse();
    if(pr.e >= cost) {
        pr.e -= cost;
        pr.gse++;
        colorUpgradeButtons(6);
    }
}

function buy_ger() {
    let cost = getCost_ger();
    if(pr.r >= cost) {
        pr.r -= cost;
        pr.ger++;
        colorUpgradeButtons(6);
    }
}

function buy_ges() {
    let cost = getCost_ges();
    if(pr.s >= cost) {
        pr.s -= cost;
        pr.ges++;
        colorUpgradeButtons(6);
    }
}


function buy_zsc() {
    let cost = getCost_zsc();
    if(pr.s >= cost && pr.r >= cost) {
        pr.r -= cost;
        pr.s -= cost;
        pr.zsc++;
        pr.zsc_max++;
        colorUpgradeButtons(8);
    }
}




document.getElementById("izsc").oninput = function() {
    pr.zsc = Number(this.value);
    colorUpgradeButtons(8);
}





function selectCurrency(type, mode) {
    // 0=null, 1=rubies, 2=sapphires, 3=emeralds
    if(mode == 1) {
        currencyFrom = type;
        if(currencyTo == type) {
            currencyTo = 0;
        }
    }
    else if(currencyFrom != type)
        currencyTo = type;
    colorUpgradeButtons(7);
}

function exchangePrestigeCurrencies(amount) {
    if(currencyFrom == 0 || currencyTo == 0) {
        console.log("ERROR! Invalid currency exchange.");
        return;
    }
    // Negative = direct amount, positive = proportion
    if(amount < 0) {
        if(amount > -5)
            return;
        if(currencyFrom == 1) pr.r += amount;
        else if(currencyFrom == 2) pr.s += amount;
        else if(currencyFrom == 3) pr.e += amount;
        if(currencyTo == 1) pr.r -= Math.trunc(amount/5);
        else if(currencyTo == 2) pr.s -= Math.trunc(amount/5);
        else if(currencyTo == 3) pr.e -= Math.trunc(amount/5);
        colorUpgradeButtons(7);
    }
    else {
        let currentValue;
        if(currencyFrom == 1) currentValue = pr.r;
        else if(currencyFrom == 2) currentValue = pr.s;
        else if(currencyFrom == 3) currentValue = pr.e;
        if(amount >= 0.75) {
            let confirmation = confirm("NOTICE! If you click 'OK', you will exchange " + (amount*currentValue) + " of one currency for " + Math.floor(amount*currentValue/5) + " of another! Are you okay with this?");
            if(!confirmation)
                return;
        }
        exchangePrestigeCurrencies(Math.floor(amount*currentValue) * -1)
    }
}






// Helper functions
function factorial(m) {
    let n = Math.round(m);
    if(n < 0)
        return NaN;
    if(n < 2)
        return 1;
    let x = 2;
    for(let i=3; i<=n; i++) {
        x *= i;
    }
    return x;
}