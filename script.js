document.addEventListener('DOMContentLoaded', () => {
    const api_url = 'https://bot-north-marina-gsly.onrender.com/run-peche';

    async function fetchFishingData() {
        try {
            const response = await fetch(api_url);
            const data = await response.json();
            
            // Affiche le nombre de runs
            document.getElementById('run-count-value').textContent = data.run_count;

            displayMembers(data.members, data.absences);
        } catch (error) {
            console.error('Erreur lors de la récupération des données de l\'API:', error);
            document.getElementById('members-table').innerHTML = '<tr><td colspan="3">Impossible de charger les données.</td></tr>';
        }
    }

    function displayMembers(members, absences) {
        const tableBody = document.getElementById('members-table').querySelector('tbody');
        tableBody.innerHTML = ''; // Vide le contenu existant

        if (members.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="3">Aucun membre enregistré.</td></tr>';
            return;
        }

        const absentMembers = absences.map(absent => absent.pseudo.toLowerCase());

        members.forEach(member => {
            const isAbsent = absentMembers.includes(member.pseudo.toLowerCase());
            const statut = isAbsent ? 'Absent' : 'Présent';
            const statutColor = isAbsent ? 'red' : 'green';

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${member.pseudo}</td>
                <td>${member.grade}</td>
                <td style="color:${statutColor};"><strong>${statut}</strong></td>
            `;
            tableBody.appendChild(row);
        });
    }

    fetchFishingData();
});