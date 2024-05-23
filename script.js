let fields = [
    null,
    'circle',
    null,
    'cross',
    'cross',
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
        let index = i * 3 + j;
        let content = '';
        if (fields[index] === 'circle') {
          content = generateAnimatedCircleSVG(); // SVG-Kreis für einen Kreis
        } else if (fields[index] === 'cross') {
          content = generateAnimatedCross(); // X für ein Kreuz
        }
        tableHTML += `<td>${content}</td>`;
      }
      tableHTML += '</tr>';
    }
  
    tableHTML += '</table>';
  
    // Den generierten HTML-Code in den div-Container einfügen
    document.getElementById('content').innerHTML = tableHTML;
  
    // Animationen starten
    document.querySelectorAll('circle').forEach(circle => {
      let animation = circle.querySelector('animate');
      animation.beginElement();
    });
  }
  
  
  function generateAnimatedCircleSVG() {
    return `
      <svg width="70" height="70" viewBox="0 0 70 70">
        <circle cx="35" cy="35" r="30" fill="none" stroke="lightblue" stroke-width="4"
                stroke-dasharray="188.4" stroke-dashoffset="188.4">
          <animate attributeName="stroke-dashoffset" from="188.4" to="0" dur="2s" fill="freeze" />
        </circle>
      </svg>
    `;
  }

  function generateAnimatedCross() {
    // SVG-Element als String erstellen
    return `
      <svg width="70" height="70">
        <line x1="15" y1="15" x2="55" y2="55" stroke="orange" stroke-width="5">
          <animate attributeName="x2" from="15" to="55" dur="0.5s" fill="freeze" />
          <animate attributeName="y2" from="15" to="55" dur="0.5s" fill="freeze" />
        </line>
        <line x1="55" y1="15" x2="15" y2="55" stroke="orange" stroke-width="5">
          <animate attributeName="x2" from="55" to="15" dur="0.5s" fill="freeze" />
          <animate attributeName="y2" from="15" to="55" dur="0.5s" fill="freeze" />
        </line>
      </svg>
    `;
  }
  
  