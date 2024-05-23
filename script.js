let fields=[
    null,
    null,
    null,
    null,
    'circle',
    'cross',
    null,
    null,
    null,
];

function init(){
    render();
}

function render() {
    let tableHTML = '<table>';
    for (let i = 0; i < 3; i++) {
        tableHTML += '<tr>';
        for (let j = 0; j < 3; j++) {
            const index = i * 3 + j;
            let cellContent = '';
            if (fields[index] === 'circle') {
                cellContent = 'O';
            } else if (fields[index] === 'cross') {
                cellContent = 'X';
            }
            tableHTML += `<td>${cellContent}</td>`;
        }
        tableHTML += '</tr>';
    }
    tableHTML += '</table>';
    document.getElementById('content').innerHTML = tableHTML;
}
