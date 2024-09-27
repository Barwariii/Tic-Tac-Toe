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
let gameOver = false; // Variable, um zu prüfen, ob das Spiel vorbei ist

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
    if (!gameOver && fields[index] === null) { // Überprüfen, ob das Feld leer ist und das Spiel nicht vorbei ist
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

        // Prüfen, ob das Spiel vorbei ist
        const result = checkWin();
        if (result.winner) {
            gameOver = true;
            drawWinningLine(result.combination); // Zeichnet die Gewinnlinie
            // alert(`${result.winner === circle ? 'Circle' : 'Cross'} wins!`);
        } else {
            currentPlayer = currentPlayer === circle ? cross : circle; // Wechselt den Spieler
        }
    }
}

// Funktion zur Überprüfung auf Sieg
function checkWin() {
    const winningCombinations = [
        [0, 1, 2], // Erste Reihe
        [3, 4, 5], // Zweite Reihe
        [6, 7, 8], // Dritte Reihe
        [0, 3, 6], // Erste Spalte
        [1, 4, 7], // Zweite Spalte
        [2, 5, 8], // Dritte Spalte
        [0, 4, 8], // Diagonale von oben links nach unten rechts
        [2, 4, 6]  // Diagonale von oben rechts nach unten links
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
            return { winner: fields[a], combination }; // Gibt den Gewinner und die Kombination zurück
        }
    }
    return { winner: null, combination: null }; // Kein Gewinner
}


// Funktion zum Zeichnen der Gewinnlinie
function drawWinningLine(combination) {
    const winningCombinations = {
        '012': { x1: 15, y1: 50, x2: 285, y2: 50 },   // Erste Reihe
        '345': { x1: 15, y1: 150, x2: 285, y2: 150 }, // Zweite Reihe
        '678': { x1: 15, y1: 250, x2: 285, y2: 250 }, // Dritte Reihe
        '036': { x1: 50, y1: 15, x2: 50, y2: 285 },   // Erste Spalte
        '147': { x1: 150, y1: 15, x2: 150, y2: 285 }, // Zweite Spalte
        '258': { x1: 250, y1: 15, x2: 250, y2: 285 }, // Dritte Spalte
        '048': { x1: 15, y1: 15, x2: 285, y2: 285 },  // Diagonale von oben links nach unten rechts
        '246': { x1: 285, y1: 15, x2: 15, y2: 285 }   // Diagonale von oben rechts nach unten links
    };

    const key = combination.join(''); // Kombination als Schlüssel
    const line = winningCombinations[key];

    if (line) {
        const svgLine = `
        <svg width="300" height="300" style="position: absolute; top: 0; left: 0;">
            <line x1="${line.x1}" y1="${line.y1}" x2="${line.x2}" y2="${line.y2}" stroke="white" stroke-width="5" />
        </svg>
        `;
        document.getElementById('content').insertAdjacentHTML('beforeend', svgLine);
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