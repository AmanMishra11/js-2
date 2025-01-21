document.addEventListener('DOMContentLoaded', () => {
    const feedbackPanel = document.getElementById('feedback-panel');
    const thankYouPanel = document.getElementById('thank-you-panel');
    const sendButton = document.getElementById('send');
    const rateAgainButton = document.getElementById('rate-again');
    const feedbackOptions = document.querySelectorAll('.feedback-option');
    const selectedRatingDisplay = document.querySelector('.selected-rating');

    let selectedRating = '';

    // Function to update selected rating
    function updateSelectedRating(option) {
        // Remove selected class from all options
        feedbackOptions.forEach(opt => opt.classList.remove('selected'));
        
        // Add selected class to clicked option
        option.classList.add('selected');
        
        // Update selected rating
        selectedRating = option.getAttribute('data-rating');
        
        // Enable send button
        sendButton.disabled = false;
    }

    // Add click event listeners to feedback options
    feedbackOptions.forEach(option => {
        option.addEventListener('click', () => {
            updateSelectedRating(option);
            
            // Add bounce animation
            option.querySelector('.emoji').style.animation = 'none';
            setTimeout(() => {
                option.querySelector('.emoji').style.animation = 'bounce 0.5s';
            }, 10);
        });
    });

    // Send button click handler
    sendButton.addEventListener('click', () => {
        if (selectedRating) {
            // Update thank you message with selected rating
            selectedRatingDisplay.textContent = `You selected: ${selectedRating.replace('-', ' ')}`;
            
            // Hide feedback panel and show thank you panel
            feedbackPanel.classList.add('hidden');
            setTimeout(() => {
                thankYouPanel.classList.remove('hidden');
            }, 300);
        }
    });

    // Rate again button click handler
    rateAgainButton.addEventListener('click', () => {
        // Reset selection
        selectedRating = '';
        feedbackOptions.forEach(opt => opt.classList.remove('selected'));
        sendButton.disabled = true;
        
        // Hide thank you panel and show feedback panel
        thankYouPanel.classList.add('hidden');
        setTimeout(() => {
            feedbackPanel.classList.remove('hidden');
        }, 300);
    });

    // Add hover effect for emojis
    feedbackOptions.forEach(option => {
        option.addEventListener('mouseover', () => {
            const emoji = option.querySelector('.emoji');
            emoji.style.transform = 'scale(1.2)';
        });

        option.addEventListener('mouseout', () => {
            const emoji = option.querySelector('.emoji');
            emoji.style.transform = 'scale(1)';
        });
    });

    // Add keydown event for accessibility
    feedbackOptions.forEach(option => {
        option.setAttribute('tabindex', '0');
        option.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                updateSelectedRating(option);
            }
        });
    });

    
});