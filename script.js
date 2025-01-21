// Navbar Hover Effect
const navLinks = document.querySelectorAll(".nav-link");
const headingDisplay = document.getElementById("heading");

navLinks.forEach((link) => {
    link.addEventListener("mouseover", () => {
        const heading = link.getAttribute("data-heading");
        headingDisplay.textContent = heading;
    });

    link.addEventListener("mouseout", () => {
        headingDisplay.textContent = "Hover over an icon";
    });
});

// Quotes and setup
const quotes = [
"|| हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे ||",
"|| हरे राम हरे राम राम राम हरे हरे ॥",
"|| ऊँ कृष्णाय वासुदेवाय हरये परमात्मने ||",
"|| प्रणतः क्लेशनाशाय गोविंदाय नमो नमः ||" 

];

let currentQuoteIndex = 0;
const quoteElement = document.querySelector('#motivational-text');

function changeQuote() {
    // Clear any previous animation
    quoteElement.style.animation = 'none';
    // Trigger reflow (this forces the browser to reset the animation)
    void quoteElement.offsetWidth;
    // Apply animation
    quoteElement.style.animation = 'slideUp 3s ease-out forwards';

    // Update quote text
    quoteElement.textContent = quotes[currentQuoteIndex];

    // Cycle to next quote
    currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
}

// Change quote every 5 seconds
setInterval(changeQuote, 5000);

// Initialize with the first quote
changeQuote();

// for login 
  // Function to toggle visibility of the popup
  function showPopup() {
    const popup = document.getElementById('loginPopup');
    if (popup.style.display === 'none' || popup.style.display === '') {
        popup.style.display = 'flex'; // Show the popup
    } else {
        popup.style.display = 'none'; // Hide the popup
    }
}

// Login function to handle the login logic (optional for now)
function nopopup() {
  const popup = document.getElementById('loginPopup');
    
popup.style.display='none';
  
}

// for contact page 
document.querySelector('iframe').addEventListener('click', function () {
    alert('Map clicked!');
});
        function showSection(value) {
            document.getElementById('donationSection').classList.add('hidden');
            document.getElementById('eventSection').classList.add('hidden');
            document.getElementById('volunteerSection').classList.add('hidden');
            document.getElementById('financialSection').classList.add('hidden');

            if (value === "donation") {
                document.getElementById('donationSection').classList.remove('hidden');
            } else if (value === "event") {
                document.getElementById('eventSection').classList.remove('hidden');
            } else if (value === "volunteer") {
                document.getElementById('volunteerSection').classList.remove('hidden');
            }
        }

        function showCauseDetails(cause) {
            document.getElementById('financialSection').classList.add('hidden');

            if (cause === "financial") {
                document.getElementById('financialSection').classList.remove('hidden');
            }
        }

        function handleSubmit(event) {
            event.preventDefault();
            const overlay = document.getElementById('overlay');
            overlay.classList.add('visible');
        }

        function closePopup() {
            const overlay = document.getElementById('overlay');
            overlay.classList.remove('visible');
            location.reload(); // Refresh the page
        }
