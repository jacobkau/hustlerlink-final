
const form = document.getElementById("userForm");
const status = document.getElementById("status");
const SHEET_URL = "https://script.google.com/macros/s/AKfycbzt5q5HORvhEW15w4-VCRHaBSepCzm3jc6aXNJCK3WwgPzYKKiNChy9FfL7bkBpVnL7/exec";

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  status.textContent = "Checking for duplicates...";
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  try {
    // Fetch existing records
    const response = await fetch(SHEET_URL);
    const existing = await response.json();

    const phoneKey = data.phone || data.employerPhone;
    const emailKey = data.email || data.employerEmail;

    const isDuplicate = existing.some(row => 
      (row["Phone Number"] === phoneKey && phoneKey) || 
      (row["Email"] === emailKey && emailKey)
    );

    if (isDuplicate) {
      status.textContent = "Duplicate entry detected. You’ve already registered.";
      status.classList.remove("text-success");
      status.classList.add("text-danger");
      return;
    }

    // No duplicate, proceed to submit
    status.textContent = "Submitting your data...";

    await fetch(SHEET_URL, {
      method: "POST",
      body: new FormData(form),
      mode: "no-cors"
    });

    status.textContent = "Successfully registered!";
    status.classList.remove("text-danger");
    status.classList.add("text-success");
    form.reset();

  } catch (err) {
    console.error(err);
    status.textContent = "Error submitting. Please try again later.";
    status.classList.remove("text-success");
    status.classList.add("text-danger");
  }
});
