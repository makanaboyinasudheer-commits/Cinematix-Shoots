document.addEventListener('DOMContentLoaded', () => {
    
    // --- Navbar Scroll Effect ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- WhatsApp Booking Form Logic ---
    const bookingForm = document.getElementById('bookingForm');
    const phoneNumber = "917416907487"; // Mobile number for booking

    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value.trim();
        const packageSelected = document.getElementById('package').value;
        const date = document.getElementById('date').value;
        const scope = document.getElementById('scope').value.trim();

        // Construct the message
        let message = `Hello, my name is *${name}*.\n\n`;
        message += `I'm interested in booking the *${packageSelected}* package.\n`;
        if (date) {
            message += `Preferred Date: ${date}\n`;
        }
        message += `\n*Project Details & Scope:*\n${scope}\n\n`;
        message += `Looking forward to hearing from you!`;

        // Encode message for URL
        const encodedMessage = encodeURIComponent(message);

        // Construct WhatsApp URL
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

        // Open in new tab
        window.open(whatsappUrl, '_blank');
        
        // Reset form after sending
        bookingForm.reset();
    });

    // --- Video Modal Logic ---
    const modal = document.getElementById('videoModal');
    const closeBtn = document.querySelector('.close-modal');
    const youtubePlayer = document.getElementById('youtubePlayer');
    const videoCards = document.querySelectorAll('.video-card');

    // Open modal
    videoCards.forEach(card => {
        card.addEventListener('click', () => {
            const videoUrl = card.getAttribute('data-video');
            if(videoUrl) {
                // Add autoplay to youtube embed
                youtubePlayer.src = `${videoUrl}?autoplay=1`;
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            }
        });
    });

    // Close modal function
    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restore scrolling
        // Stop video playback by removing src
        setTimeout(() => {
            youtubePlayer.src = '';
        }, 300); // Wait for transition
    };

    // Close on X click
    closeBtn.addEventListener('click', closeModal);

    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
});
