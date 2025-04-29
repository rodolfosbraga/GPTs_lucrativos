// Registra o Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js')
      .then(() => console.log('Service Worker registrado'))
      .catch(err => console.error('Erro SW:', err));
  });
}

// Busca dinâmica no catálogo
function filterList() {
  const filter = document.getElementById('search').value.toLowerCase();
  document.querySelectorAll('.category-block').forEach(block => {
    let anyVisible = false;
    block.querySelectorAll('details').forEach(detail => {
      const txt = detail.querySelector('summary').textContent.toLowerCase();
      if (txt.includes(filter)) {
        detail.style.display = '';
        anyVisible = true;
      } else {
        detail.style.display = 'none';
      }
    });
    block.style.display = anyVisible ? '' : 'none';
  });
}

// Handle do form de sugestão
async function handleSuggestion(e) {
  e.preventDefault();                             // evita o envio padrão
  const form = e.target;                         // o próprio <form>
  const data = new URLSearchParams(new FormData(form));

  try {
    // envia ao Apps Script
    await fetch(form.action, {
      method: 'POST',
      body: data
    });
    // redireciona para thankyou.html
    window.location.href = 'thankyou.html';
  } catch (err) {
    alert('Falha ao enviar, tente novamente.');
    console.error(err);
  }

  return false;
}

// Substitui o listener antigo pelo onsubmit
const form = document.getElementById('suggestionForm');
if (form) {
  // remove listener anterior, se houver
  form.removeEventListener('submit', () => {});
  // passa a usar nosso handleSuggestion
  form.onsubmit = handleSuggestion;
}
