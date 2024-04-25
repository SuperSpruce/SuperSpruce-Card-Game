var music = {
    current: null,
    currentZone: 0,
    next: null,
    nextZone: 0,
    on: false,
    order: true
};

// Create a function to load the media file when the zone advances
function advanceZoneMusic(advance = false) {
    // Don't download music when the music is off
    if(!music.on) {
        return;
    }
    // Pause current music
    if(music.current) {
        music.current.pause();
        music.next.pause();
    }
    // Check if music.current is already set
    if (!music.current || !advance) {
        // No music loaded, set current and next zones
        music.order = true;
        music.currentZone = zone > 35 ? 35 : zone;
        music.current = document.createElement('audio');
        music.current.src = 'Audio/Zone ' + music.currentZone + '.mp3';
        music.current.loop = true;
        document.body.appendChild(music.current);

        music.nextZone = zone >= 35 ? 35 : zone + 1;
        music.next = document.createElement('audio');
        music.next.src = 'Audio/Zone ' + music.nextZone + '.mp3';
        music.next.loop = true; // Preload next zone by setting loop
        document.body.appendChild(music.next);
    } else if (advance) {
        // Update current music to next zone
        console.log(music.order);
        if(!music.order) {
            music.order = true;
            music.nextZone = zone >= 35 ? 35 : zone + 1;
            music.next.src = 'Audio/Zone ' + music.nextZone + '.mp3';
        }
        else {
            music.order = false;
            music.currentZone = zone >= 35 ? 35 : zone + 1;
            music.current.src = 'Audio/Zone ' + music.currentZone + '.mp3';
        }
    }
    playMusic();
}


// Sets the loop and plays the music
function playMusic() {
    if(music.order) {
        music.current.play();
    }
    else {
        music.next.play();
    }
}

// Toggles the music
function toggleMusic() {
    if(music.on) {
        music.on = false;
        music.current.pause();
        music.next.pause();
    }
    else {
        music.on = true;
        if(!music.current) {
            advanceZoneMusic();
        }
        playMusic();
    }
}