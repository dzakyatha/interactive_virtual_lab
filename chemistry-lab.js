// File untuk mengelola logika, state, dan reaksi kimia

// Variabel Global
let beakerContents = [];
let completedReactions = new Set();
let unlockedChemicals = new Set(['acid', 'base', 'salt', 'water']);
let achievements = [];

// Fungsi state dasar
function hasChemicals(chemicals) {
    return chemicals.every(chemical => beakerContents.includes(chemical));
}

function isBeakerFull() {
    return beakerContents.length >= MAX_CHEMICALS;
}

function isBeakerEmpty() {
    return beakerContents.length === 0;
}

function isChemicalUnlocked(chemical) {
    return unlockedChemicals.has(chemical);
}

// Fungsi untuk mendapatkan reaksi berdasarkan bahan kimia yang dicampur
function getReactionKey(reaction) {
    if (!reaction) return null;
    
    // Variabel untuk memeriksa apakah ada bahan kimia
    const hasAcid = hasChemicals(['acid']);
    const hasBase = hasChemicals(['base']);
    const hasWater = hasChemicals(['water']);
    const hasSalt = hasChemicals(['salt']);

    // Memeriksa reaksi dengan 4 bahan kimia
    if (hasAcid && hasBase && hasSalt && hasWater) {
        return 'acid-base-salt-water';
    }

    // Memeriksa reaksi dengan 3 bahan kimia
    else if (hasAcid && hasBase && hasSalt) {
        return 'acid-base-salt';
    }
    else if (hasAcid && hasBase && hasWater) {
        return 'acid-base-water';
    }
    else if (hasAcid && hasSalt && hasWater) {
        return 'acid-salt-water';
    }
    else if (hasBase && hasSalt && hasWater) {
        return 'base-salt-water';
    }

    // Memeriksa reaksi dengan 2 bahan kimia
    else if (hasAcid && hasBase) {
        return 'acid-base';
    }
    else if (hasAcid && hasWater) {
        return 'acid-water';
    }
    else if (hasBase && hasWater) {
        return 'base-water';
    }
    else if (hasSalt && hasWater) {
        return 'salt-water';
    }
    else if (hasAcid && hasSalt) {
        return 'acid-salt';
    }
    else if (hasBase && hasSalt) {
        return 'base-salt';
    }
    
    return null;
}

// Fungsi untuk menambahkan bahan kimia ke gelas kimia
function addChemicalToBeaker(chemical) {
    if (isBeakerFull()) {
        showWarningNotification(
            'Beaker is Full!',
            `Maximum ${MAX_CHEMICALS} chemicals allowed. Reset beaker to continue.`
        );
        return false;
    }
    
    beakerContents.push(chemical);
    updateBeakerDisplay();
    checkReactions();
    showReactionEffect();
    hideChemicalOnShelf(chemical);
    return true;
}

// Fungsi untuk reset gelas kimia
function resetBeaker() {
    const currentChemicals = [...beakerContents];
    
    // Mengosongkan gelas kimia
    beakerContents = [];
    updateBeakerDisplay();
    
    // Mengembalikan bahan kimia ke rak
    currentChemicals.forEach(restoreChemicalToShelf);

    // Membersihkan efek visual
    clearAllVisualEffects();
    const reactionResult = document.getElementById('reaction-result');
    reactionResult.innerHTML = '<p class="text-gray-500">No reaction yet. Try mixing different chemicals!</p>';
    
    // Mengatur ulang event listeners
    setTimeout(setupEventListeners, 100);
}

// Fungsi untuk memeriksa reaksi berdasarkan isi gelas kimia
function checkReactions() {
    const reactionResult = document.getElementById('reaction-result');
    const mixture = document.getElementById('chemical-mixture');
    
    if (beakerContents.length < 2) {
        reactionResult.innerHTML = '<p class="text-gray-500">Add more chemicals to see reactions!</p>';
        return;
    }

    const reactionKey = getReactionKey(beakerContents);
    const reaction = REACTIONS[reactionKey];

    if (reaction) {
        applyReactionEffects(mixture, reaction);
        
        if (!completedReactions.has(reactionKey)) {
            completeReaction(reactionKey, reaction);
        }
        
        reactionResult.innerHTML = `
            <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                <strong>Reaction Detected!</strong><br>
                ${reaction.description}<br>
                <small>Temperature: ${reaction.temperature}°C</small>
            </div>
        `;
    } else {
        reactionResult.innerHTML = `
            <div class="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
                <strong>Mixed Chemicals:</strong><br>
                ${beakerContents.map(c => c.charAt(0).toUpperCase() + c.slice(1)).join(' + ')}
            </div>
        `;
    }
}

// Fungsi untuk mencampur bahan kimia menjadi reaksi dan mengatur pencapaian
function completeReaction(reactionKey, reaction) {
    completedReactions.add(reactionKey);
    updateProgress();
    
    // Membuka bahan kimia baru jika ada
    if (reaction.unlocks) {
        unlockChemical(reaction.unlocks);
    }
    
    // Notifikasi pencapaian
    const achievement = ACHIEVEMENTS[reactionKey];
    if (achievement) {
        showAchievementNotification(achievement.title, achievement.description);
    }
}

// Fungsi untuk membuka bahan kimia baru
function unlockChemical(chemicalType) {
    if (!unlockedChemicals.has(chemicalType)) {
        unlockedChemicals.add(chemicalType);
        updateChemicalAvailability();
        
        const chemicalNames = {
            'sulfuric': 'H₂SO₄ (Sulfuric Acid)',
            'ammonia': 'NH₃ (Ammonia)',
            'copper': 'CuSO₄ (Copper Sulfate)',
            'indicator': 'Litmus (pH Indicator)'
        };
        
        // Notifikasi mendapatkan bahan kimia baru
        showUnlockNotification(
            'New Chemical Unlocked!',
            `You unlocked ${chemicalNames[chemicalType]}!`
        );
    }
}

// Fungsi untuk memperbarui tampilan gelas kimia berdasarkan isinya
function updateBeakerDisplay() {
    const mixture = document.getElementById('chemical-mixture');
    const beakerShape = document.querySelector('.beaker-shape');
    const height = Math.min(beakerContents.length * 25, 100);
    
    mixture.style.height = height + '%';
    
    if (isBeakerEmpty()) {
        mixture.innerHTML = '';
        beakerShape.classList.remove('beaker-full');
    } else if (isBeakerFull()) {
        beakerShape.classList.add('beaker-full');
        mixture.innerHTML = `<p class="mixture-text">Beaker Full!</p>`;
    } else {
        beakerShape.classList.remove('beaker-full');
        mixture.innerHTML = `<p class="mixture-text">${beakerContents.length}/${MAX_CHEMICALS} chemicals</p>`;
    }
}

// Fungsi untuk memperbarui progres pencapaian
function updateProgress() {
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    const progress = (completedReactions.size / TOTAL_REACTIONS) * 100;
    
    progressBar.style.width = progress + '%';
    progressText.textContent = `${completedReactions.size}/${TOTAL_REACTIONS} reactions completed`;
}

// Fungsi untuk memperbarui ketersediaan bahan kimia di rak
function updateChemicalAvailability() {
    const bottles = document.querySelectorAll('.chemical-bottle');
    bottles.forEach(bottle => {
        const chemicalType = bottle.dataset.chemical;
        const isUnlocked = isChemicalUnlocked(chemicalType);
        
        if (isUnlocked) {
            bottle.classList.remove('locked');
            bottle.draggable = true;
            
            const colors = {
                'sulfuric': 'linear-gradient(45deg, #dc2626, #b91c1c)',
                'ammonia': 'linear-gradient(45deg, #0ea5e9, #0284c7)',
                'copper': 'linear-gradient(45deg, #0891b2, #0e7490)',
                'indicator': 'linear-gradient(45deg, #8b5cf6, #7c3aed)'
            };
            
            if (colors[chemicalType]) {
                bottle.style.background = colors[chemicalType];
            }
        } else {
            bottle.classList.add('locked');
            bottle.draggable = false;
        }
    });
    
    setupEventListeners();
}

// Fungsi untuk menangani drag and drop
function handleDragStart(e) {
    const bottle = e.target;
    const chemicalType = bottle.dataset.chemical;
    
    if (!isChemicalUnlocked(chemicalType)) {
        e.preventDefault();
        return;
    }
    
    e.dataTransfer.setData('text/plain', chemicalType);
    bottle.classList.add('dragging');
}

function handleDragEnd(e) {
    e.target.classList.remove('dragging');
}

function handleDragOver(e) {
    e.preventDefault();
    e.target.classList.add('drag-over');
}

function handleDragLeave(e) {
    e.target.classList.remove('drag-over');
}

function handleDrop(e) {
    e.preventDefault();
    e.target.classList.remove('drag-over');
    
    const chemical = e.dataTransfer.getData('text/plain');
    addChemicalToBeaker(chemical);
    
    // Membersihkan status drag
    document.querySelectorAll('.dragging').forEach(el => {
        el.classList.remove('dragging');
    });
}

// Fungsi untuk setup ulang event listeners
function setupEventListeners() {
    // Menghapus listener yang sudah ada dengan kloning elemen
    const bottles = document.querySelectorAll('.chemical-bottle');
    const beakerShape = document.querySelector('.beaker-shape');
    
    bottles.forEach(bottle => {
        const newBottle = bottle.cloneNode(true);
        bottle.parentNode.replaceChild(newBottle, bottle);
    });
    
    const newBeakerShape = beakerShape.cloneNode(true);
    beakerShape.parentNode.replaceChild(newBeakerShape, beakerShape);
    
    // Membuat ulang listener pada elemen yang baru
    const newBottles = document.querySelectorAll('.chemical-bottle');
    const newBeaker = document.querySelector('.beaker-shape');
    
    newBottles.forEach(bottle => {
        if (!bottle.classList.contains('locked')) {
            bottle.addEventListener('dragstart', handleDragStart);
            bottle.addEventListener('dragend', handleDragEnd);
            bottle.draggable = true;
        } else {
            bottle.addEventListener('mouseenter', showUnlockHint);
            bottle.addEventListener('mouseleave', hideUnlockHint);
        }
    });
    
    newBeaker.addEventListener('dragover', handleDragOver);
    newBeaker.addEventListener('dragleave', handleDragLeave);
    newBeaker.addEventListener('drop', handleDrop);

    // Setup buttons
    const resetBtn = document.getElementById('reset-beaker');
    const instructionBtn = document.getElementById('instruction-btn');
    
    if (resetBtn) resetBtn.onclick = resetBeaker;
    if (instructionBtn) instructionBtn.onclick = showInstructionModal;
}

// Fungsi untuk debugging
function debugState() {
    console.log('=== CURRENT STATE ===');
    console.log('Beaker contents:', beakerContents);
    console.log('Completed reactions:', Array.from(completedReactions));
    console.log('Unlocked chemicals:', Array.from(unlockedChemicals));
    console.log('Is beaker full:', isBeakerFull());
    console.log('Is beaker empty:', isBeakerEmpty());
}