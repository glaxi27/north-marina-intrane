// Remplacez cette URL par l'URL publique de votre service Render
// Exemple: 'https://bot-north-marina-gsly.onrender.com/run-peche'
const API_URL = https://github.com/glaxi27/north-marina-intrane.git/run-peche';

async function fetchData() {
    try {
        const response = await fetch(API_URL);
        
        // Vérifie si la réponse est OK (statut 200)
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Erreur lors du chargement des données de l'API :", error);
        return null;
    }
}

function updateIntranet(data) {
    const runCountElement = document.getElementById('run-count');
    const absencesListElement = document.getElementById('absences-list');

    // --- Mise à jour du nombre de runs ---
    if (runCountElement) {
        if (data && typeof data.run_count === 'number') {
            runCountElement.innerHTML = `
                <div class="metric-value">${data.run_count}</div>
                <div class="metric-label">Runs enregistrés</div>
            `;
        } else {
            runCountElement.textContent = "Donnée non disponible.";
        }
    }

    // --- Mise à jour des absences ---
    if (absencesListElement) {
        if (data && Array.isArray(data.absences) && data.absences.length > 0) {
            absencesListElement.innerHTML = data.absences.map(absence => `
                <div class="list-item">
                    <span class="item-name">${absence.pseudo}</span>
                    <span class="item-dates">Du ${absence.date_debut} au ${absence.date_fin}</span>
                    <span class="item-reason">Raison: ${absence.raison}</span>
                </div>
            `).join('');
        } else if (data) {
            absencesListElement.textContent = "Aucune absence enregistrée actuellement.";
        } else {
            absencesListElement.textContent = "Impossible de charger les absences.";
        }
    }
}

async function init() {
    const data = await fetchData();
    updateIntranet(data);
}

// Initialise le chargement des données au démarrage de la page
init();