// Skrip utama aplikasi untuk inisialisasi

// Fungsi inisialisasi lab kimia
function initializeChemistryLab() {
    try {
        // Check if required functions exist
        if (typeof setupEventListeners !== 'function') {
            throw new Error('Chemistry lab functions not loaded properly');
        }
        
        setupEventListeners();
        updateProgress();
        updateChemicalAvailability();
        console.log('Functional Chemistry Lab initialized!');
    } catch (error) {
        console.error('Failed to initialize chemistry lab:', error);
    }
}

// Inisialisasi lab kimia setelah konten DOM dimuat sepenuhnya
document.addEventListener('DOMContentLoaded', initializeChemistryLab);

// Membuat fungsi debugging dapat dicoba manual di console
window.debugState = debugState;