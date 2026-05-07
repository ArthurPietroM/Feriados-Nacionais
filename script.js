const API = 'https://brasilapi.com.br/api/feriados/v1';

async function buscarFeriados() {
  const ano = document.getElementById('anoInput').value.trim();
  const results = document.getElementById('results');

  if (!ano || ano < 1900 || ano > 2199) {
    results.innerHTML = '<p style="color:red; font-weight:bold; text-align:center">Informe um ano válido entre 1900 e 2199.</p>';
    return;
  }

  results.innerHTML = '<p>Buscando...</p>';

  try {
    const res = await fetch(`${API}/${ano}`);
    if (!res.ok) throw new Error(`Erro HTTP ${res.status}`);

    const feriados = await res.json();
    if (!Array.isArray(feriados) || feriados.length === 0) throw new Error('Nenhum feriado encontrado.');

    results.innerHTML = feriados.map(({ date, name, weekday }) => {
      const [a, m, d] = date.split('-');
      return `
        <div class="holiday-card">
          <h3>${name}</h3>
          <p>${d}/${m}/${a}</p>
          <p>${weekday ?? ''}</p>
        </div>`;
    }).join('');

  } catch (err) {
    results.innerHTML = `<p style="color:red; font-weight:bold; text-align:center">${err.message}</p>`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('anoInput').value = new Date().getFullYear();
  document.getElementById('anoInput')
    .addEventListener('keydown', e => e.key === 'Enter' && buscarFeriados());
});