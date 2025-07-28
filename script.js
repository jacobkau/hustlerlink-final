// Replace this with your deployed Google Apps Script Web App URL
const scriptURL = 'https://script.google.com/macros/s/AKfycbw2AZnFzDM3PiL8CyaAQt1-ZedFMjzrOahgFvW26AxHb21RcYlqUqfPXlqT2A-ahenf/exec';

document.getElementById('userForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const form = e.target;
  const data = new FormData(form);
  const status = document.getElementById('status');

  fetch(scriptURL, { method: 'POST', body: data })
    .then(response => {
      status.textContent = "✅ Successfully submitted!";
      form.reset();
    })
    .catch(error => {
      status.textContent = "❌ Submission failed.";
      console.error('Error!', error.message);
    });
});
