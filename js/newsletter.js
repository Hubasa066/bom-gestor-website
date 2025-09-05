// Newsletter page functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeNewsletterPage();
});

function initializeNewsletterPage() {
    initializeNewsletterForm();
    initializeNewsletterFAQ();
    initializeScrollToNewsletter();
}

function initializeNewsletterForm() {
    const newsletterForm = document.getElementById('newsletter-form');
    
    if (newsletterForm) {
        window.BlogUtils.handleFormSubmission(newsletterForm, () => {
            newsletterForm.reset();
            showSuccessMessage();
        });
    }
}

function showSuccessMessage() {
    const formContainer = document.querySelector('.newsletter-form-hero');
    const successMessage = document.createElement('div');
    successMessage.className = 'newsletter-success';
    successMessage.innerHTML = `
        <div class="success-content">
            <i class="fas fa-check-circle"></i>
            <h3>Welcome to Our Community!</h3>
            <p>Thank you for subscribing! You'll receive your first newsletter within the next few days.</p>
            <p>In the meantime, check out our <a href="articles.html">latest articles</a>.</p>
        </div>
    `;
    
    // Replace form with success message
    formContainer.innerHTML = '';
    formContainer.appendChild(successMessage);
    
    // Add animation
    setTimeout(() => {
        successMessage.classList.add('fade-in-up');
    }, 100);
}

function initializeNewsletterFAQ() {
    // FAQ functionality is handled by toggleNewsletterFaq function
}

function toggleNewsletterFaq(index) {
    const faqItems = document.querySelectorAll('.newsletter-faq .faq-item');
    const faqItem = faqItems[index];
    
    if (!faqItem) return;
    
    const question = faqItem.querySelector('.faq-question');
    const answer = faqItem.querySelector('.faq-answer');
    const icon = question.querySelector('i');
    
    // Close all other FAQ items
    faqItems.forEach((item, i) => {
        if (i !== index) {
            const otherAnswer = item.querySelector('.faq-answer');
            const otherIcon = item.querySelector('.faq-question i');
            
            otherAnswer.style.maxHeight = '0';
            otherAnswer.style.padding = '0 0';
            otherIcon.style.transform = 'rotate(0deg)';
            item.classList.remove('active');
        }
    });
    
    // Toggle current item
    const isActive = faqItem.classList.contains('active');
    
    if (isActive) {
        answer.style.maxHeight = '0';
        answer.style.padding = '0 0';
        icon.style.transform = 'rotate(0deg)';
        faqItem.classList.remove('active');
    } else {
        answer.style.maxHeight = answer.scrollHeight + 'px';
        answer.style.padding = '1rem 0';
        icon.style.transform = 'rotate(180deg)';
        faqItem.classList.add('active');
    }
}

function initializeScrollToNewsletter() {
    // Function is defined globally as scrollToNewsletter
}

function scrollToNewsletter() {
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        const offsetTop = newsletterForm.offsetTop - 100; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Export for global use
window.NewsletterPage = {
    toggleNewsletterFaq: toggleNewsletterFaq,
    scrollToNewsletter
};
