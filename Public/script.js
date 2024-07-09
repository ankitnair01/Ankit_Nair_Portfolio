document.querySelector('#contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    const message = document.querySelector('#message').value;

    fetch('/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, message })
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        document.querySelector('#contactForm').reset();
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.scroll-animate');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.5 }); // Trigger animation when 50% of section is in view

    sections.forEach(section => {
        observer.observe(section);
    });
});
