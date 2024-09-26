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
            let displayValue = '';

            // Einfache if-Abfragen zur Darstellung der Symbole
            if (cellValue === 'circle') {
                displayValue = 'O';
            } else if (cellValue === 'cross') {
                displayValue = 'X';
            } else {
                displayValue = ''; // Für leere Felder
            }

            tableHTML += `<td>${displayValue}</td>`;
        }
        tableHTML += '</tr>';
    }

    tableHTML += '</table>';
    contentDiv.innerHTML = tableHTML;
}