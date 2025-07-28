const scriptURL = 'https://script.google.com/macros/s/AKfycbywRcIxjn8drmUHYOBcGHAZ7eyoYhZ22BXbLQbpjHl8n4sUx3uH8eN9yBnuofRnDL5c/exec';

document.getElementById('userForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const form = e.target;
  const data = new FormData(form);
  const status = document.getElementById('status');
  const submitBtn = document.getElementById('submitBtn');

  // Disable submit button during submission
  submitBtn.disabled = true;
  submitBtn.textContent = "Submitting...";

  fetch(scriptURL, { method: 'POST', body: data })
    .then(response => {
      status.innerHTML = `
        <div class="alert-message alert-success">
          <strong>Success!</strong> Your registration has been submitted successfully.
        </div>
      `;
      form.reset();
      // Hide all form sections after submission
      document.getElementById("jobSeekerFields").classList.add("hidden");
      document.getElementById("employerFields").classList.add("hidden");
      document.getElementById("realEstateFields").classList.add("hidden");
      
      // Scroll to show success message
      status.scrollIntoView({ behavior: 'smooth' });
    })
    .catch(error => {
      status.innerHTML = `
        <div class="alert-message alert-error">
          <strong>Error!</strong> Submission failed. Please try again.
        </div>
      `;
      console.error('Error!', error.message);
    })
    .finally(() => {
      // Re-enable submit button
      submitBtn.disabled = false;
      submitBtn.textContent = "Submit";
    });
});

// Show/hide form sections based on user type selection
document.getElementById('userType').addEventListener('change', function() {
  const type = this.value;
  document.getElementById("jobSeekerFields").classList.toggle("hidden", type !== "Job Seeker");
  document.getElementById("employerFields").classList.toggle("hidden", type !== "Employer");
  document.getElementById("realEstateFields").classList.toggle("hidden", type !== "Real Estate");
});
