// Get elements
const openBtn = document.getElementById('openBtn');
const popup = document.getElementById('popup');
const okBtn = document.getElementById('okBtn');

// Open the popup when the button is clicked
openBtn.addEventListener('click', () => {
    popup.style.display = 'flex'; // Show the popup
});

// Close the popup and redirect when OK is clicked
okBtn.addEventListener('click', () => {
    window.location.href = 'dashboard.html'; // Redirect to the main page (index.html)
});
