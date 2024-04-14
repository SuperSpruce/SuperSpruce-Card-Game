// Function to flash attack buttons
function flashAttackButtons() {
    let attackButtons1 = document.querySelectorAll(".villainDamage1"); // Corrected selector
    let attackButtons2 = document.querySelectorAll(".villainDamageMax"); // Corrected selector
    let attackButtons = Array.from(attackButtons1).concat(Array.from(attackButtons2)); // Combining NodeLists
    if (p1._attack > 0) {
        attackButtons.forEach(button => {
            button.style.backgroundColor = "#cc9900";
        });
        setTimeout(function() {
            attackButtons.forEach(button => {
                button.style.backgroundColor = "#ddaa00";
            });
        }, 500);
    }
    else {
        attackButtons.forEach(button => {
            button.style.backgroundColor = "#aa6600";
        });
    }
}



// Function to flash the draw pile
function flashDrawPile() {
    let drawPile = document.querySelector(".cardpileL");
    if(p1._turnState == 0) {
        if(p1._attack > 0) {
            drawPile.style.backgroundColor = "#dd9999";
        }
        else {
            let canAffordCardElixir = false;
            for(let i=0; i<shop.shopCardList.length; i++) {
                if(p1._elixir >= cards[shop.shopCardList[i]][1] && cards[shop.shopCardList[i]][1] > 0) {
                    canAffordCardElixir = true;
                    break;
                }
            }
            if(canAffordCardElixir) {
                drawPile.style.backgroundColor = "#bbbb99";
            }
            else {
                drawPile.style.backgroundColor = "#99dd99";
            }
        }
    }
    else {
        drawPile.style.backgroundColor = "#999999";
    }
}


// Call flashButtons every second
setInterval(flashAttackButtons, 1000);
setInterval(flashDrawPile, 500);