// File konfigurasi yang berisi semua konstanta, data reaksi, dan data pencapaian

// Batas maksimum bahan kimia yang dapat dicampur
const MAX_CHEMICALS = 4;

// Total reaksi yang dapat ditemukan
const TOTAL_REACTIONS = 11;

// Petunjuk untuk membuka bahan kimia baru
const UNLOCK_HINTS = {
    'sulfuric': 'Mix Acid + Base to unlock Sulfuric Acid',
    'ammonia': 'Mix Base + Water to unlock Ammonia',
    'copper': 'Mix Acid + Salt to unlock Copper Sulfate',
    'indicator': 'Mix Base + Salt to unlock pH Indicator'
};

// Data reaksi kimia
const REACTIONS = {
    'acid-base': {
        description: 'Neutralization Reaction! HCl + NaOH → NaCl + H₂O + Heat',
        color: '#e0e0e0',
        effect: 'heating',
        temperature: 45,
        gasProduction: false,
        precipitation: false,
        unlocks: 'sulfuric'
    },
    'acid-water': {
        description: 'Acid diluted in water (Exothermic reaction)',
        color: '#ff9999',
        effect: 'heating',
        temperature: 35,
        gasProduction: false,
        precipitation: false,
        unlocks: null
    },
    'base-water': {
        description: 'Base dissolved in water (Endothermic reaction)',
        color: '#99ccff',
        effect: 'cooling',
        temperature: 15,
        gasProduction: false,
        precipitation: false,
        unlocks: 'ammonia'
    },
    'salt-water': {
        description: 'Salt solution formed (Slightly endothermic)',
        color: '#ffeb99',
        effect: 'cooling',
        temperature: 18,
        gasProduction: false,
        precipitation: false,
        unlocks: null
    },
    'acid-salt': {
        description: 'Acid-salt mixture with gas production!',
        color: '#ffb366',
        effect: 'gas',
        temperature: 25,
        gasProduction: true,
        precipitation: false,
        unlocks: 'copper'
    },
    'base-salt': {
        description: 'Base-salt mixture with precipitation!',
        color: '#99ff99',
        effect: 'precipitation',
        temperature: 22,
        gasProduction: false,
        precipitation: true,
        unlocks: 'indicator'
    },
    'acid-base-water': {
        description: 'Neutralization in water solution!',
        color: '#d1d5db',
        effect: 'heating',
        temperature: 40,
        gasProduction: false,
        precipitation: false,
        unlocks: null
    },
    'acid-base-salt': {
        description: 'Complex reaction: Heat + Gas + Precipitation!',
        color: '#cc99ff',
        effect: 'complex',
        temperature: 50,
        gasProduction: true,
        precipitation: true,
        unlocks: null
    },
    'acid-salt-water': {
        description: 'Acid-salt solution with gas bubbles!',
        color: '#fbbf24',
        effect: 'gas',
        temperature: 30,
        gasProduction: true,
        precipitation: false,
        unlocks: null
    },
    'base-salt-water': {
        description: 'Base-salt solution with precipitation!',
        color: '#a7f3d0',
        effect: 'precipitation',
        temperature: 20,
        gasProduction: false,
        precipitation: true,
        unlocks: null
    },
    'acid-base-salt-water': {
        description: 'Ultimate chemistry reaction: All effects!',
        color: '#e879f9',
        effect: 'complex',
        temperature: 55,
        gasProduction: true,
        precipitation: true,
        unlocks: null
    }
};

// Data pencapaian
const ACHIEVEMENTS = {
    'acid-base': { title: 'Neutralization Master!', description: 'You discovered acid-base neutralization!' },
    'acid-water': { title: 'Heat Explorer!', description: 'You observed exothermic reactions!' },
    'base-water': { title: 'Cooling Expert!', description: 'You discovered endothermic reactions!' },
    'salt-water': { title: 'Solution Scientist!', description: 'You created a salt solution!' },
    'acid-salt': { title: 'Gas Producer!', description: 'You generated gas from chemicals!' },
    'base-salt': { title: 'Precipitation Pro!', description: 'You observed precipitation!' },
    'acid-base-water': { title: 'Solution Neutralizer!', description: 'You neutralized in water solution!' },
    'acid-base-salt': { title: 'Reaction Master!', description: 'You completed a complex reaction!' },
    'acid-salt-water': { title: 'Bubbling Solution!', description: 'You created a gas-producing solution!' },
    'base-salt-water': { title: 'Precipitating Solution!', description: 'You created a precipitating solution!' },
    'acid-base-salt-water': { title: 'Chemistry Legend!', description: 'You mastered the ultimate reaction!' }
};