let fields = [
    null, // 0
    null, // 1
    null, // 2
    null, // 3
    null, // 4
    null, // 5
    null, // 6
    null, // 7
    null, // 8
];

// Definition der Symbole
const circle = 'circle';
const cross = 'cross';
let currentPlayer = circle; // Beginnt mit 'circle'

// Funktion zur Initialisierung des Spiels
function init() {
    render();
}

// Die Render-Funktion
function render() {
    const contentDiv = document.getElementById('content');
    let tableHTML = '<table>';

    for (let row = 0; row < 3; row++) {
        tableHTML += '<tr>';
        for (let col = 0; col < 3; col++) {
            const index = row * 3 + col;
            const cellValue = fields[index];
            let symbol = '';

            // Einfache if-Abfragen zur Darstellung der Symbole
            if (cellValue === circle) {
                symbol = generateCircleSVG();
            } else if (cellValue === cross) {
                symbol = generateCrossSVG();
            } else {
                // Für leere Felder, fügen wir ein onclick-Attribut hinzu
                symbol = `<div onclick="handleCellClick(${index})" style="width: 70px; height: 70px;"></div>`;
            }

            tableHTML += `<td id="cell-${index}">${symbol}</td>`; // Füge id hinzu für das spezifische <td>
        }
        tableHTML += '</tr>';
    }

    tableHTML += '</table>';
    contentDiv.innerHTML = tableHTML;
}

// Funktion zum Handhaben des Klicks auf ein <td>-Element
function handleCellClick(index) {
    if (fields[index] === null) { // Überprüfen, ob das Feld leer ist
        fields[index] = currentPlayer; // Setze den aktuellen Spieler

        // Aktualisiere nur das angeklickte Feld anstatt die ganze Tabelle
        const cell = document.getElementById(`cell-${index}`);
        if (currentPlayer === circle) {
            cell.innerHTML = generateCircleSVG();
        } else {
            cell.innerHTML = generateCrossSVG();
        }

        // Entferne das onclick-Attribut, damit es nicht erneut geklickt werden kann
        cell.onclick = null;

        // Wechsle den Spieler
        currentPlayer = currentPlayer === circle ? cross : circle;
    }
}


function generateCircleSVG() {
    const svg = `
    <svg width="70" height="70" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
        <circle cx="35" cy="35" r="30" stroke="#00B0EF" stroke-width="5" fill="none" 
            stroke-dasharray="188.4" stroke-dashoffset="188.4">
            <animate 
                attributeName="stroke-dashoffset"
                from="188.4"
                to="0"
                dur="100ms"
                fill="freeze"
            />
        </circle>
    </svg>
    `;
    return svg;
}


function generateCrossSVG() {
    return `
    <svg width="70px" height="70px" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
        <!-- Erste Linie des Kreuzes (von oben links nach unten rechts) -->
        <line x1="10" y1="10" x2="60" y2="60" stroke="#FEC000" stroke-width="5"
              stroke-dasharray="70" stroke-dashoffset="70">
            <animate 
                attributeName="stroke-dashoffset" 
                from="70" 
                to="0" 
                dur="1s" 
                fill="freeze" />
        </line>
        <!-- Zweite Linie des Kreuzes (von oben rechts nach unten links) -->
        <line x1="60" y1="10" x2="10" y2="60" stroke="#FEC000" stroke-width="5"
              stroke-dasharray="70" stroke-dashoffset="70">
            <animate 
                attributeName="stroke-dashoffset" 
                from="70" 
                to="0" 
                dur="1s" 
                fill="freeze" />
        </line>
    </svg>
    `;
}



