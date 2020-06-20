main();

function main() {
  fetchAndDisplay();
}

function fetchAndDisplay() {
  fetch('/api/messages')
    .then(result => result.json())
    .then(data => display(data));
}

function display(messages) {
  const messagesEl = document.getElementById('messages');
  messagesEl.innerHTML =
    messages
      .map(({timestamp, author, body}) => `
        <hr>
        <p><strong>${author}</strong> ${timestamp}</p>
        <p>${body}</p>
      `)
      .join('');
}

function sendMessage() {
  const authorEl = document.getElementById('author');
  const composeEl = document.getElementById('compose');
  const sendBtn = document.getElementById('send');

  const author = authorEl.value;
  const messageBody = composeEl.value;

  const requestBody = JSON.stringify({
    author,
    body: messageBody,
  });

  sendBtn.disabled = true;
  fetch('/api/messages', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: requestBody,
  })
    .then(() => fetchAndDisplay())
    .finally(() => { sendBtn.disabled = false; });
}
