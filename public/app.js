const form = document.getElementById("card-form");
const cardInput = document.getElementById("card-number");
const button = document.getElementById("validate-button");
const result = document.getElementById("result");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  button.disabled = true;
  result.textContent = "Checking...";

  try {
    // Let the API do the validation instead of repeating the rules here.
    const response = await fetch("/api/cards/validate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cardNumber: cardInput.value }),
    });
    const data = await response.json();

    if (!response.ok) {
      result.textContent = data.error || "Something went wrong. Please try again.";
    } else if (data.valid) {
      result.textContent = "This number passes the validation checks.";
    } else {
      result.textContent = "This number doesn't pass the validation checks.";
    }
  } catch {
    result.textContent = "Couldn't reach the API. Please try again in a moment.";
  } finally {
    button.disabled = false;
  }
});
