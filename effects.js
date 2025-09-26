// Skrip untuk efek visual dan notifikasi

// Fungsi untuk menerapkan efek visual berdasarkan reaksi
function applyReactionEffects(mixture, reaction) {
    mixture.style.backgroundColor = reaction.color;
    applyTemperatureEffect(mixture, reaction.effect, reaction.temperature);
    
    if (reaction.gasProduction) {
        createGasBubbles(mixture);
    }
    
    if (reaction.precipitation) {
        createPrecipitation(mixture);
    }
    
    showTemperature(mixture, reaction.temperature);
}

// Fungsi untuk perubahan suhu pada campuran
function applyTemperatureEffect(mixture, effect, temperature) {
    mixture.classList.remove('heating', 'cooling');
    
    if (effect === 'heating') {
        mixture.classList.add('heating');
    } else if (effect === 'cooling') {
        mixture.classList.add('cooling');
    } else if (effect === 'complex') {
        mixture.classList.add('heating');
        setTimeout(() => {
            mixture.classList.remove('heating');
            mixture.classList.add('cooling');
        }, 2000);
    }
}

// Fungsi untuk membuat gelembung gas
function createGasBubbles(mixture) {
    const gasContainer = document.createElement('div');
    gasContainer.className = 'gas-bubbles';
    mixture.appendChild(gasContainer);
    
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const bubble = document.createElement('div');
            bubble.className = 'bubble';
            bubble.style.left = Math.random() * 80 + 10 + '%';
            bubble.style.width = Math.random() * 10 + 5 + 'px';
            bubble.style.height = bubble.style.width;
            bubble.style.animationDelay = Math.random() * 2 + 's';
            
            gasContainer.appendChild(bubble);
            
            setTimeout(() => {
                if (bubble.parentNode) {
                    bubble.parentNode.removeChild(bubble);
                }
            }, 2000);
        }, i * 400);
    }
    
    setTimeout(() => {
        if (gasContainer.parentNode) {
            gasContainer.parentNode.removeChild(gasContainer);
        }
    }, 6000);
}

// Fungsi untuk membuat presipitasi
function createPrecipitation(mixture) {
    const precipitation = document.createElement('div');
    precipitation.className = 'precipitation';
    mixture.appendChild(precipitation);
    
    setTimeout(() => {
        if (precipitation.parentNode) {
            precipitation.parentNode.removeChild(precipitation);
        }
    }, 3000);
}

// Fungsi untuk menampilkan suhu setelah terjadi reaksi
function showTemperature(mixture, temperature) {
    const existingTemp = mixture.querySelector('.temperature-display');
    if (existingTemp) {
        existingTemp.remove();
    }
    
    const tempDisplay = document.createElement('div');
    tempDisplay.className = 'temperature-display';
    tempDisplay.textContent = `${temperature}°C`;
    mixture.appendChild(tempDisplay);
    
    setTimeout(() => {
        if (tempDisplay.parentNode) {
            tempDisplay.parentNode.removeChild(tempDisplay);
        }
    }, 5000);
}

// Fungsi untuk menampilkan efek reaksi pada gelas kimia
function showReactionEffect() {
    const beakerShape = document.querySelector('.beaker-shape');
    beakerShape.classList.add('reaction-animation');
    
    setTimeout(() => {
        beakerShape.classList.remove('reaction-animation');
    }, 500);
}

// Fungsi untuk mereset semua efek visual pada campuran
function clearAllVisualEffects() {
    const mixture = document.getElementById('chemical-mixture');
    const beakerShape = document.querySelector('.beaker-shape');
    
    // Menghilangkan tampilan campuran
    mixture.style.backgroundColor = '';
    mixture.style.height = '0%';
    mixture.classList.remove('heating', 'cooling');
    mixture.innerHTML = '';
    
    // Menghilangkan campuran pada gelas kimia
    beakerShape.classList.remove('beaker-full', 'drag-over');
    
    // Menghilangkan semua efek
    const effects = ['gas-bubbles', 'precipitation', 'temperature-display'];
    effects.forEach(effectClass => {
        const element = mixture.querySelector(`.${effectClass}`);
        if (element) element.remove();
    });
}

// Fungsi notifikasi untuk pencapaian
function showAchievementNotification(title, description) {
    showNotification(title, description, 'achievement');
}

// Fungsi notifikasi untuk membuka bahan kimia baru
function showUnlockNotification(title, description) {
    showNotification(title, description, 'unlock');
}

// Fungsi notifikasi untuk peringatan
function showWarningNotification(title, description) {
    showNotification(title, description, 'warning');
}

// Fungsi notifikasi umum
function showNotification(title, description, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-title">${title}</div>
        <div class="notification-description">${description}</div>
    `;
    
    document.body.appendChild(notification);
    
    // Notifikasi diposisikan seperti stack
    const existingNotifications = document.querySelectorAll('.notification');
    const notificationIndex = existingNotifications.length - 1;
    const offset = notificationIndex * 100;
    
    notification.style.top = (20 + offset) + 'px';
    
    // Notifikasi hilang setelah 4 detik
    setTimeout(() => {
        if (notification.parentNode) {
            notification.classList.add('fade-out');
            
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                    repositionNotifications();
                }
            }, 300);
        }
    }, 4000);
}

// Fungsi untuk merapikan posisi notifikasi setelah ada yang dihapus
function repositionNotifications() {
    const notifications = document.querySelectorAll('.notification:not(.fade-out)');
    notifications.forEach((notification, index) => {
        const offset = index * 100;
        notification.style.top = (20 + offset) + 'px';
    });
}

// Fungsi untuk menampilkan instruksi pencampuran bahan kimia
function showInstructionModal() {
    const existingModal = document.getElementById('instruction-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    const mixtures = [
        { chemicals: 'Acid + Base', result: 'Neutralization with heat', unlocks: 'Sulfuric Acid', key: 'acid-base' },
        { chemicals: 'Acid + Water', result: 'Diluted acid with heat', unlocks: null, key: 'acid-water' },
        { chemicals: 'Base + Water', result: 'Base solution with cooling', unlocks: 'Ammonia', key: 'base-water' },
        { chemicals: 'Salt + Water', result: 'Salt solution', unlocks: null, key: 'salt-water' },
        { chemicals: 'Acid + Salt', result: 'Gas production', unlocks: 'Copper Sulfate', key: 'acid-salt' },
        { chemicals: 'Base + Salt', result: 'Precipitation', unlocks: 'pH Indicator', key: 'base-salt' },
        { chemicals: 'Acid + Base + Water', result: 'Neutralization in solution', unlocks: null, key: 'acid-base-water' },
        { chemicals: 'Acid + Base + Salt', result: 'Complex reaction with all effects', unlocks: null, key: 'acid-base-salt' },
        { chemicals: 'Acid + Salt + Water', result: 'Gas bubbles in solution', unlocks: null, key: 'acid-salt-water' },
        { chemicals: 'Base + Salt + Water', result: 'Precipitation in solution', unlocks: null, key: 'base-salt-water' },
        { chemicals: 'Acid + Base + Salt + Water', result: 'Ultimate reaction!', unlocks: null, key: 'acid-base-salt-water' }
    ];
    
    let mixtureItems = '';
    mixtures.forEach(mixture => {
        const isCompleted = completedReactions.has(mixture.key);
        const completedClass = isCompleted ? 'completed' : '';
        const statusText = isCompleted ? 'Completed ✓' : 'Not completed';
        const statusClass = isCompleted ? 'completed' : 'not-completed';
        const unlockText = mixture.unlocks ? `Unlocks: ${mixture.unlocks}` : '';
        
        mixtureItems += `
            <div class="mixture-item ${completedClass}">
                <div class="mixture-chemicals">${mixture.chemicals}</div>
                <div class="mixture-result">${mixture.result}</div>
                <div class="mixture-status ${statusClass}">${statusText}</div>
                ${unlockText ? `<div class="mixture-unlock">${unlockText}</div>` : ''}
            </div>
        `;
    });
    
    const modal = document.createElement('div');
    modal.id = 'instruction-modal';
    modal.className = 'instruction-modal';
    modal.innerHTML = `
        <div class="instruction-content">
            <div class="instruction-header">
                <h3 class="instruction-title">Chemical Mixture Guide</h3>
                <button class="close-button" onclick="this.closest('.instruction-modal').remove()">×</button>
            </div>
            <div class="mixture-list">
                ${mixtureItems}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    setTimeout(() => modal.classList.add('show'), 10);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
            setTimeout(() => modal.remove(), 300);
        }
    });
}

// Fungsi untuk menyembunyikan bahan kimia yang diambil dari rak
function hideChemicalOnShelf(chemicalType) {
    const bottle = document.querySelector(`[data-chemical="${chemicalType}"]`);
    if (bottle && !bottle.classList.contains('locked')) {
        bottle.style.opacity = '0.3';
        bottle.style.pointerEvents = 'none';
        bottle.draggable = false;
    }
}

// Fungsi untuk mengembalikan bahan kimia ke rak
function restoreChemicalToShelf(chemicalType) {
    const bottle = document.querySelector(`[data-chemical="${chemicalType}"]`);
    if (bottle && !bottle.classList.contains('locked')) {
        bottle.style.opacity = '1';
        bottle.style.pointerEvents = 'auto';
        bottle.draggable = true;
        bottle.classList.remove('dragging');
    }
}

// Fungsi untuk menampilkan hint membuka bahan kimia baru
function toggleUnlockHint(e, action) {
    const bottle = e.target;
    const chemicalType = bottle.dataset.chemical;
    const existingHint = document.getElementById('unlock-hint-' + chemicalType);
    
    // Menampilkan hint
    if (action === 'show' && !existingHint) {
        const hintText = UNLOCK_HINTS[chemicalType];
        
        if (hintText) {
            const hint = document.createElement('div');
            hint.className = 'unlock-hint';
            hint.textContent = hintText;
            hint.id = 'unlock-hint-' + chemicalType;
            
            document.body.appendChild(hint);
            
            const bottleRect = bottle.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
            
            hint.style.left = (bottleRect.left + scrollLeft + bottleRect.width / 2 - hint.offsetWidth / 2) + 'px';
            hint.style.top = (bottleRect.top + scrollTop - hint.offsetHeight - 10) + 'px';
            
            setTimeout(() => hint.classList.add('show'), 10);
        }
    } 
    
    // Menyembunyikan hint
    else if (action === 'hide' && existingHint) {
        existingHint.classList.remove('show');
        setTimeout(() => {
            if (existingHint.parentNode) {
                existingHint.parentNode.removeChild(existingHint);
            }
        }, 300);
    }
}

function showUnlockHint(e) {
    toggleUnlockHint(e, 'show');
}

function hideUnlockHint(e) {
    toggleUnlockHint(e, 'hide');
}