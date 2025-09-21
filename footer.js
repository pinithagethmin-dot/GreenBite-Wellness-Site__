// ==============================
// Footer Enhancements Script
// ==============================

//  1. Auto-update footer year
// This sets the current year in the footer automatically
const yearEl = document.getElementById('year'); // Get the span with id="year"
if (yearEl) {
  yearEl.textContent = new Date().getFullYear(); // Set it to the current year (e.g., 2025)
}

//  2. Smooth scroll to top
// When user clicks "Back to top", scroll smoothly instead of jumping
document.querySelectorAll('.scroll-top').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent default link behavior
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Smooth scroll to top
  });
});

//  3. Newsletter subscription
// Handles form submission inside the footer
const nsForm = document.querySelector('footer #newsletterForm'); // Get the newsletter form inside the footer

if (nsForm) {
  nsForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Stop the form from refreshing the page

    // Get the email input and message display element
    const emailInput = nsForm.querySelector('#newsletterEmail');
    const msg = nsForm.querySelector('#newsletterMsg');
    const email = emailInput.value.trim(); // Remove extra spaces

    //  Validate email format using a simple pattern
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValidEmail) {
      msg.textContent = 'Please enter a valid email.'; // Show error message
      return; // Stop here if email is invalid
    }

    //  Save the email to localStorage
    const list = JSON.parse(localStorage.getItem('newsletter') || '[]'); // Get existing list or start empty
    if (!list.includes(email)) {
      list.push(email); // Add new email
      localStorage.setItem('newsletter', JSON.stringify(list)); // Save updated list
    }

    //  Show success message and clear the form
    msg.textContent = 'Thanks! You are subscribed.';
    nsForm.reset(); // Clear the input field
  });
}
