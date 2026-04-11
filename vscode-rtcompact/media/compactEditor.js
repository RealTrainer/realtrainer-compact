// This script runs inside the custom editor webview.
(function () {
  const fileNameEl = document.getElementById('fileName');
  const cardsEl = document.getElementById('cards');

  window.addEventListener('message', (event) => {
    const message = event.data;
    if (!message || message.type !== 'setDocument') {
      return;
    }

    fileNameEl.textContent = message.fileName || 'Untitled';

    cardsEl.innerHTML = message.previewHtml || '<article class="empty">No content to preview yet.</article>';
  });
}());
