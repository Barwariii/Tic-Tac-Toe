let fields = [
    null, // 0
    'circle', // 1
    'cross', // 2
    null, // 3
    null, // 4
    null, // 5
    null, // 6
    null, // 7
    null, // 8
]


// Definition der Symbole
const circle = 'O';
const cross = 'X';


function init() {
    render();
    generateCircleSVG()
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
            if (cellValue === 'circle') {
                symbol = generateCircleSVG();
            } else if (cellValue === 'cross') {
                symbol = generateCrossSVG();
            } else {
                symbol = ''; // Für leere Felder
            }

            tableHTML += `<td>${symbol}</td>`;
        }
        tableHTML += '</tr>';
    }

    tableHTML += '</table>';
    contentDiv.innerHTML = tableHTML;
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



