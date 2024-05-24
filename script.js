let fields = [
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
];

let currentPlayer = 'circle'; // Startspieler

function init() {
  render();
}

function render() {
  let tableHTML = '<table>';

  for (let i = 0; i < 3; i++) {
    tableHTML += '<tr>';
    for (let j = 0; j < 3; j++) {
      let index = i * 3 + j;
      let content = '';
      if (fields[index] === 'circle') {
        content = generateAnimatedCircleSVG(); // SVG-Kreis für einen Kreis
      } else if (fields[index] === 'cross') {
        content = generateAnimatedCrossSVG(); // SVG für ein Kreuz
      }
      tableHTML += `<td onclick="handleClick(${index}, this)">${content}</td>`;
    }
    tableHTML += '</tr>';
  }

  tableHTML += '</table>';

  // Den generierten HTML-Code in den div-Container einfügen
  document.getElementById('content').innerHTML = tableHTML;

  // Animationen starten
  document.querySelectorAll('circle animate').forEach(animation => animation.beginElement());
  document.querySelectorAll('line animate').forEach(animation => animation.beginElement());
}

function handleClick(index, element) {
  if (!fields[index]) { // Nur wenn das Feld noch leer ist
    fields[index] = currentPlayer;
    if (currentPlayer === 'circle') {
      element.innerHTML = generateAnimatedCircleSVG();
      currentPlayer = 'cross';
    } else {
      element.innerHTML = generateAnimatedCrossSVG();
      currentPlayer = 'circle';
    }

    // Animation starten
    const animateElements = element.querySelectorAll('animate');
    animateElements.forEach(animation => animation.beginElement());

    // onclick-Funktion entfernen
    element.onclick = null;

    // Überprüfen, ob das Spiel gewonnen wurde
    const winningLine = checkWin();
    if (winningLine) {
      drawWinningLine(winningLine);
    }
  }
}

function checkWin() {
  const winPatterns = [
    [0, 1, 2], // Zeilen
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // Spalten
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // Diagonalen
    [2, 4, 6]
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
      return pattern;
    }
  }

  return null;
}

function drawWinningLine(pattern) {
  const coordinates = [
    { x: 50, y: 50 },
    { x: 150, y: 50 },
    { x: 250, y: 50 },
    { x: 50, y: 150 },
    { x: 150, y: 150 },
    { x: 250, y: 150 },
    { x: 50, y: 250 },
    { x: 150, y: 250 },
    { x: 250, y: 250 },
  ];

  const [start, , end] = pattern;
  const startCoord = coordinates[start];
  const endCoord = coordinates[end];
debugger
  const svgLine = `
    <svg width="100%" height="100%" style="position:absolute; top:0; left:0;">
      <line x1="${startCoord.x}" y1="${startCoord.y}" x2="${endCoord.x}" y2="${endCoord.y}" stroke="white" stroke-width="5">
        <animate attributeName="x2" from="${startCoord.x}" to="${endCoord.x}" dur="1s" fill="freeze" />
        <animate attributeName="y2" from="${startCoord.y}" to="${endCoord.y}" dur="1s" fill="freeze" />
      </line>
    </svg>
  `;

  document.getElementById('content').insertAdjacentHTML('beforeend', svgLine);
}


function generateAnimatedCircleSVG() {
  return `
    <svg width="70" height="70" viewBox="0 0 70 70">
      <circle cx="35" cy="35" r="30" fill="none" stroke="lightblue" stroke-width="4"
              stroke-dasharray="188.4" stroke-dashoffset="188.4">
        <animate attributeName="stroke-dashoffset" from="188.4" to="0" dur="125ms" fill="freeze" />
      </circle>
    </svg>
  `;
}

function generateAnimatedCrossSVG() {
  return `
    <svg width="70" height="70" viewBox="0 0 70 70">
      <line x1="15" y1="15" x2="55" y2="55" stroke="orange" stroke-width="4">
        <animate attributeName="x2" from="15" to="55" dur="125ms" fill="freeze" />
        <animate attributeName="y2" from="15" to="55" dur="125ms" fill="freeze" />
      </line>
      <line x1="55" y1="15" x2="15" y2="55" stroke="orange" stroke-width="4">
        <animate attributeName="x2" from="55" to="15" dur="125ms" fill="freeze" />
        <animate attributeName="y2" from="15" to="55" dur="125ms" fill="freeze" />
      </line>
    </svg>
  `;
}

function restart() {
  // Felder zurücksetzen
  fields = [
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
  ];

  // Spieler zurücksetzen
  currentPlayer = 'circle';

  // Spiel neu rendern
  render();
}

