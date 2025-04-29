/**
 * TechIssue - Contact Form JavaScript
 * Handles validation and submission of the contact form
 */

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contato__form');
    
    if (contactForm) {
        // Form input elements
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('phone');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');
        const termsCheckbox = document.getElementById('terms');
        const submitButton = document.querySelector('.contato__form button[type="submit"]');
        const formSuccess = document.querySelector('.form-success');
        
        // Add input event listeners for real-time validation
        if (nameInput) nameInput.addEventListener('input', () => validateField(nameInput, isNotEmpty));
        if (emailInput) emailInput.addEventListener('input', () => validateField(emailInput, isValidEmail));
        if (phoneInput) phoneInput.addEventListener('input', () => validateField(phoneInput, isValidPhone));
        if (subjectInput) subjectInput.addEventListener('input', () => validateField(subjectInput, isNotEmpty));
        if (messageInput) messageInput.addEventListener('input', () => validateField(messageInput, isNotEmpty));
        
        // Form submission handler
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate all fields on submit
            let isValid = true;
            
            if (nameInput) isValid = validateField(nameInput, isNotEmpty) && isValid;
            if (emailInput) isValid = validateField(emailInput, isValidEmail) && isValid;
            if (phoneInput) isValid = validateField(phoneInput, isValidPhone) && isValid;
            if (subjectInput) isValid = validateField(subjectInput, isNotEmpty) && isValid;
            if (messageInput) isValid = validateField(messageInput, isNotEmpty) && isValid;
            
            // Check terms checkbox
            if (termsCheckbox) {
                const termsGroup = termsCheckbox.closest('.form-group');
                if (!termsCheckbox.checked) {
                    termsGroup.classList.add('error');
                    const errorMessage = termsGroup.querySelector('.error-message');
                    if (errorMessage) errorMessage.textContent = 'Você deve aceitar os termos e condições';
                    isValid = false;
                } else {
                    termsGroup.classList.remove('error');
                }
            }
            
            // If all fields are valid, submit the form
            if (isValid) {
                // Show loading state
                if (submitButton) {
                    submitButton.disabled = true;
                    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
                }
                
                // Simulate form submission (replace with actual form submission)
                setTimeout(() => {
                    // Hide form and show success message
                    contactForm.style.display = 'none';
                    if (formSuccess) {
                        formSuccess.style.display = 'block';
                    }
                    
                    // Reset form
                    contactForm.reset();
                }, 1500);
            }
        });
    }
});

/**
 * Validate a field with a provided validation function
 * @param {HTMLElement} field - The input field to validate
 * @param {Function} validationFn - The validation function
 * @returns {boolean} - Whether the field is valid
 */
function validateField(field, validationFn) {
    const formGroup = field.closest('.form-group');
    const errorMessage = formGroup.querySelector('.error-message');
    const value = field.value.trim();
    const validationResult = validationFn(value);
    
    if (!validationResult.valid) {
        formGroup.classList.add('error');
        if (errorMessage) errorMessage.textContent = validationResult.message;
        return false;
    } else {
        formGroup.classList.remove('error');
        return true;
    }
}

/**
 * Check if a value is not empty
 * @param {string} value - The value to check
 * @returns {Object} - Validation result
 */
function isNotEmpty(value) {
    return {
        valid: value !== '',
        message: 'Este campo é obrigatório'
    };
}

/**
 * Check if an email is valid
 * @param {string} email - The email to validate
 * @returns {Object} - Validation result
 */
function isValidEmail(email) {
    if (email === '') {
        return {
            valid: false,
            message: 'Este campo é obrigatório'
        };
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return {
        valid: emailRegex.test(email),
        message: 'Por favor, insira um email válido'
    };
}

/**
 * Check if a phone number is valid
 * @param {string} phone - The phone number to validate
 * @returns {Object} - Validation result
 */
function isValidPhone(phone) {
    if (phone === '') {
        return {
            valid: false,
            message: 'Este campo é obrigatório'
        };
    }
    
    // Brazilian phone number format
    const phoneRegex = /^\(?([0-9]{2})\)?[-. ]?([0-9]{4,5})[-. ]?([0-9]{4})$/;
    return {
        valid: phoneRegex.test(phone),
        message: 'Por favor, insira um telefone válido (ex: (xx) xxxxx-xxxx)'
    };
}
