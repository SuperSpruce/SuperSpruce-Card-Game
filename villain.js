var villainCSVdata = `Name:HP:Attack:Sp. Attack:Speed:Moves Levels:Move IDs:minZone:maxZone:Reward
Fire Crab:5:12:10:14:1,4,7,10:2,1,3,7:1:29:1c
Snappy Snail:6:8:14:20:1,3,5,8:1,3,6,8:1:15:1m
Squeally Squirrel:4:10:12:18:1,3,5,8:1,5,4,8:1:15:0.8x
Spruce Needle:2.5:20:6:4:1:1:2:34:1a
One-Leaf Clover:4:8:10:6:1,5:1,2:1:13:1h
Three-Leaf Clover:6:12:12:8:1,5,15:1,2,7:3:21:0.9h/0.9m/0.9x
Four-Leaf Clover:7:14:14:10:1,5,15:1,2,7:4:99:1.2h/1.2m/1.2x/1.2a
Evil Flower:5:10:15:10:1,4,6,10,20:1,11,9,10,12:7:999:0.6h0.6a
Antimatter:10:5:10:5:1,9:1,15:6:299:-0.5h
Five-Leaf Clover:8:16:16:15:1,5,15:1,2,7:8:199:1.5h/1.5m/1.5x/1.5a/1c
`;


var moveCSVdata = `Name:P or S:Effect String:Type
Tackle:P:-1.4h:Normal
Ember:S:-1c:Fire
Tail Whip:T:-1sd:Normal
Mean Look:T:1F:Ghost
Growl:T:-1sa:Normal
Drink:T:2hv:Water
Bi-Attack:S:-1h-0.5c:Fire
Mud Shot:S:-1.4h:Ground
Water Gun:P:0.8hv:Water
Make It Rain:T:1hva:Water
Flower Power:S:-1.5h#ef:Normal
Deflower:P:-3h-0.5hv:Normal
Triple Leaves:S:-1h-0.5c0.5hv:Grass
Quad Leaves:S:-1sd-1sa-1h-0.5c:Grass
Annihilate:P:-2hh-100hv:Normal
`;

var villainDex = [];
var moveDex = [];

class Villain {
    constructor(ID, XPa) {
        // Basic attributes
        this.dex = ID;
        this.title = villainDex[ID][0];
        this.XP = XPa;
        this.turnsSurvived = 0;
        this.level = Math.floor(Math.pow(1+this.XP/3, 0.3));
        this.attackPriority = 0;

        // Villain stats, based on level and base stats
        this.maxHealth = Math.round(villainDex[ID][1] * (0.04*Math.pow(zone, 1.5) + 0.96) * (1 + 0.01*Math.pow(p1._villainsKOedThisTurn, 3)));
        this.currentHealth = this.maxHealth;
        this.pattack = villainDex[ID][2] * (0.2*this.level + 0.8) / 10;
        this.sattack = villainDex[ID][3] * (0.2*this.level + 0.8) / 10;
        this.speed = Number(villainDex[ID][4]);

        // The moves that the villain can use
        this.moveset = [];
        let i = 0;
        let moveLevels = villainDex[ID][5].split(",");
        let moveLearnset = villainDex[ID][6].split(",");
        while(i < moveLevels.length && moveLevels[i] <= this.level) {
            i++;
        }
        let j = 0;
        for(j; (i>0 && j<4); j++) {
            i--;
            this.moveset.push(moveLearnset[i]);
        }
    }


    // Helper functions for saving
    toJSON() {
        return {
            dex: this.dex,
            title: this.title,
            turnsSurvived: this.turnsSurvived,
            XP: this.XP,
            level: this.level,
            maxHealth: this.maxHealth,
            currentHealth: this.currentHealth,
            pattack: this.pattack,
            sattack: this.sattack,
            speed: this.speed,
            moveset: this.moveset,
            attackPriority: this.attackPriority
        };
    }
    static fromJSON(json) {
        const villain = new Villain(json.dex, json.XP);
        villain.title = json.title;
        villain.turnsSurvived = json.turnsSurvived;
        villain.level = json.level;
        villain.maxHealth = json.maxHealth;
        villain.currentHealth = json.currentHealth;
        villain.pattack = json.pattack;
        villain.sattack = json.sattack;
        villain.speed = json.speed;
        villain.moveset = json.moveset;
        villain.attackPriority = json.attackPriority;
        return villain;
    }



    static setUpNew() {
        // First, since this function is only called when setting up villains for the first time, remove all existing villains
        
        // Gets the number of villains
        let numVillains = 2;
        if(zone >= 5) numVillains = 3;
        if(zone >= 10) numVillains = 4;
        if(zone >= 25) numVillains = 5;
        if(zone >= 50) numVillains = 6;
        // Gets the starting XP and level
        let startingXP = 10*zone*zone-10;
        if(zone >= 15) startingXP *= 2;
        let r;
        for(let i=1; i<=numVillains; i++) {
            do {
                r = Math.ceil(Math.random() * (villainDex.length-1));
            } while ((villainDex[r][7] > zone) || (villainDex[r][8] < zone));
            createVillainSlot(i, new Villain(r, 0));
            Villain.gainXP(i);
        }
    }

    static setUpOld() {
        for(let i=1; i<=villainList.length; i++) {
            createVillainSlot(i, new Villain(villainList[i].dex, villainList[i].XP));
        }
    }


    static allAttack() {
        // Checks the speed of the villains first
        let speedArray = [];
        speedArray.push(0);
        for(let i=1; i<villainList.length; i++) {
            speedArray[i] = villainList[i].speed * (1+Math.random());
        }
        let effectStr = "";
        for(let i=1; i<villainList.length; i++) {
            let s = speedArray.indexOf(Math.max(...speedArray));
            speedArray[s] = 0;
            effectStr += villainList[s].attack(s);
            effectStr += "<br>";
        }
        document.getElementById("playerStatusText").innerHTML = effectStr;
        p1._turnState = 1;
    }


    attack(position) {
        let validCase = false;
        let moveID;
        while(!validCase) {
            // Selects a move
            let r = Math.floor(Math.random() * 4);
            while(this.moveset[r] == undefined) {
                r = Math.floor(Math.random() * 4);
            }

            // Gets the effects of that move
            moveID = this.moveset[r];

            // Checks if the case is valid. Used for antimatter not annihilating prematurely.
            if(moveID == 15 && this.turnsSurvived < 9) {
                // Invalid use of move. Rerolling.
            }
            else {
                validCase = true;
            }
        }

        let moveFX = getFXfromStr(moveDex[moveID][2]);

        // Makes an effect string
        let effectString = this.title;
        effectString += " used " + moveDex[moveID][0] + "!  ";
        if(moveID > 9) console.log(moveFX[0]);
        // Applies the effects to the player
        for(let i=0; i<moveFX[0].length; i++) {
            // Applies modifiers to the effects
            if(moveDex[moveID][1] == "P")
                moveFX[0][i].intensity *= (this.pattack * (2-p1._defenseStage)/2);
            else if(moveDex[moveID][1] == "S")
                moveFX[0][i].intensity *= (this.sattack * (2-p1._specialDefenseStage)/2);
            effectString += moveFX[0][i].apply(0, position);
        }

        // Display the effect on the status line
        if(!p1._KOed)
            document.getElementById("playerStatusText").innerHTML = effectString;
        return effectString;
    }



    static setXPScalingFactor() {
        if(zone < 5) {
            return (0.9+0.1*Math.pow(zone-1, 2));
        }
        else if(zone < 10) {
            return zone/6;
        }
        else {
            return (zone-6)/4;
        }
    }


    static gainXP(i, turns = 1) { // i is the villain number in the list
        let container = document.getElementById("villain" + i);
        villainList[i].turnsSurvived += turns;
        villainList[i].attackPriority = 0;
        // The XP calculation part
        let XPgain = Villain.setXPScalingFactor() * Math.pow(villainList[i].turnsSurvived, 1.3) * Math.pow(zone, 1.5+0.01*zone-0.05*pr.xv2);
        XPgain *= Math.pow(0.95, pr.xv1);
        villainList[i].XP += XPgain;
        // Moveset stuff
        let prevLevel = villainList[i].level;
        let nextLevel = Math.floor(Math.pow(1+(villainList[i].XP)/3, 0.3));
        villainList[i].level = nextLevel;
        if(nextLevel > prevLevel) { // This means that the villain leveled up
            container.getElementsByClassName("villainLevel")[0].innerHTML = "Level " + villainList[i].level;
            changeVillainLevelColor(i, nextLevel);
            villainList[i].pattack = villainDex[villainList[i].dex][2] * (0.2*villainList[i].level + 0.8) / 10;
            villainList[i].sattack = villainDex[villainList[i].dex][3] * (0.2*villainList[i].level + 0.8) / 10;
            let moveLevels = villainDex[villainList[i].dex][5].split(",");
            let moveLearnset = villainDex[villainList[i].dex][6].split(",");
            let j=0;
            // Check if eligible to learn a new move
            while(moveLevels[j] <= nextLevel) {
                j++;
            }
            if(moveLevels[j-1] > prevLevel) { // This means that the villain learns a new move
                for(let k=villainList[i].moveset.length; k>0; k--) {
                    villainList[i].moveset[k] = villainList[i].moveset[k-1];
                }
                villainList[i].moveset[0] = moveLearnset[j-1];
            }
        }
    }


    resolveReward(num, choice = 0) {
        let dex = this.dex;
        let FX = getFXfromStr(villainDex[dex][9]);
        let prevState = p1._turnState;
        // Select from multiple effects
        if(FX.length > 1 && (p1._turnState == 1 || p1._turnState == 0)) {
            let line3 = document.getElementById("playerStatusText");
            line3.innerHTML = "Choose One:  ";
            p1._turnState = 3;
            for(let i=0; i<FX.length; i++) {
                for(let j=0; j<FX[i].length; j++) { // Rounds the intensity to 2 decimal places
                    FX[i][j].intensity = (FX[i][j].intensity*(1 + 0.5*Math.pow(this.level-1, 0.8))).toFixed(2);
                }
                // Show the choices to the user
                let button = document.createElement("button");
                button.style.height = "32px";
                button.style.borderRadius = "16px";
                button.style.fontSize = "20px";
                button.style.margin = "0px 8px";
                button.style.color = "#111111";
                button.style.backgroundColor = "#dd5544";
                button.style.zIndex = "5";
                button.textContent = scoutEffects(FX[i], [0]);
                // Set the function for the button
                button.onclick = function() {
                    p1.selectEffect(i, num);
                };
                // Append the button to the line3 element
                line3.appendChild(button);
            }
            return "STOP";
        }
        
        if(choice == -1) {
            return "GO";
        }
        else {
            // Apply modifiers to the effect intensity based on level
            for(let i=0; i<FX.length; i++) {
                for(let j=0; j<FX[i].length; j++) { // Rounds the intensity to 2 decimal places
                    FX[i][j].intensity = (FX[i][j].intensity*(1 + 0.5*Math.pow(this.level-1, 0.8))).toFixed(2);
                }
            }
            p1._turnState = prevState;
            let effectStr = p1.applyEffectsFromArray(FX,[0], choice);
            return effectStr;
        }
    }
}