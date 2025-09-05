// Contact page functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeContactPage();
});

function initializeContactPage() {
    initializeContactForm();
    initializeFAQ();
}

function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        window.BlogUtils.handleFormSubmission(contactForm, () => {
            contactForm.reset();
            window.BlogUtils.showNotification('Thank you for your message! We\'ll get back to you within 24 hours.', 'success');
        });
    }
}

function initializeFAQ() {
    // FAQ items are handled by toggleFaq function defined globally
}

function toggleFaq(index) {
    const faqItems = document.querySelectorAll('.faq-item');
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

// Export for global use
window.ContactPage = {
    toggleFaq
};
