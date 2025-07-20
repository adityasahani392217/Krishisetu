// ===== Mobile Menu Toggle =====
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const nav = document.querySelector('.nav');
    
    mobileMenuBtn.addEventListener('click', function() {
        nav.classList.toggle('active');
        this.querySelector('i').classList.toggle('fa-times');
    });

    // ===== Smooth Scrolling =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                }
            }
        });
    });

    // ===== Language Switcher =====
    const languageSwitcher = document.getElementById('language');
    if (languageSwitcher) {
        languageSwitcher.addEventListener('change', function() {
            // In a real implementation, this would change the page language
            console.log('Language changed to:', this.value);
            // You would typically:
            // 1. Save language preference to localStorage
            // 2. Reload content in the selected language
            // 3. Or redirect to language-specific page
        });
    }

    // ===== Testimonial Slider =====
    const testimonialSlider = document.querySelector('.testimonial-slider');
    if (testimonialSlider) {
        let isDown = false;
        let startX;
        let scrollLeft;

        testimonialSlider.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - testimonialSlider.offsetLeft;
            scrollLeft = testimonialSlider.scrollLeft;
        });

        testimonialSlider.addEventListener('mouseleave', () => {
            isDown = false;
        });

        testimonialSlider.addEventListener('mouseup', () => {
            isDown = false;
        });

        testimonialSlider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - testimonialSlider.offsetLeft;
            const walk = (x - startX) * 2;
            testimonialSlider.scrollLeft = scrollLeft - walk;
        });

        // Touch events for mobile
        testimonialSlider.addEventListener('touchstart', (e) => {
            isDown = true;
            startX = e.touches[0].pageX - testimonialSlider.offsetLeft;
            scrollLeft = testimonialSlider.scrollLeft;
        });

        testimonialSlider.addEventListener('touchend', () => {
            isDown = false;
        });

        testimonialSlider.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            const x = e.touches[0].pageX - testimonialSlider.offsetLeft;
            const walk = (x - startX) * 2;
            testimonialSlider.scrollLeft = scrollLeft - walk;
        });
    }

    // ===== Equipment Booking =====
    document.querySelectorAll('.book-equipment').forEach(button => {
        button.addEventListener('click', function() {
            const equipmentId = this.getAttribute('data-equipment-id');
            bookEquipment(equipmentId);
        });
    });

    // ===== Form Validation =====
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = 'red';
                    const errorMsg = field.nextElementSibling;
                    if (errorMsg && errorMsg.classList.contains('error-message')) {
                        errorMsg.textContent = 'This field is required';
                    }
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                // Scroll to first error
                const firstError = form.querySelector('[required]:invalid');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
    });

    // ===== SMS Gateway =====
    window.sendSMSLink = function() {
        const phoneInput = document.getElementById('smsNumber');
        const phone = phoneInput.value.trim();
        
        // Simple validation
        if (!phone || !/^[0-9]{10}$/.test(phone)) {
            alert('Please enter a valid 10-digit mobile number');
            phoneInput.focus();
            return;
        }
        
        // In a real implementation, this would call your backend API
        console.log('Sending SMS to:', phone);
        
        // Show success message
        alert(`App link will be sent to ${phone}. Please check your SMS.`);
        phoneInput.value = '';
        
        // You would typically:
        // 1. Call your backend API to send SMS
        // 2. Handle success/error responses
        // 3. Update UI accordingly
    };

    // ===== Book Equipment Function =====
    window.bookEquipment = function(type) {
        console.log('Booking equipment:', type);
        // In a real implementation, this would:
        // 1. Redirect to booking page with type parameter
        // 2. Or open a booking modal
        // 3. Or add to cart
        
        // For demo, show alert
        alert(`Redirecting to ${type} booking page...`);
        // window.location.href = `book.html?type=${type}`;
    };

    // ===== Initialize Tooltips =====
    const tooltips = document.querySelectorAll('[data-tooltip]');
    tooltips.forEach(tooltip => {
        tooltip.addEventListener('mouseenter', showTooltip);
        tooltip.addEventListener('mouseleave', hideTooltip);
    });

    function showTooltip(e) {
        const tooltipText = this.getAttribute('data-tooltip');
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = tooltipText;
        document.body.appendChild(tooltip);
        
        const rect = this.getBoundingClientRect();
        tooltip.style.left = `${rect.left + rect.width/2 - tooltip.offsetWidth/2}px`;
        tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
    }

    function hideTooltip() {
        const tooltip = document.querySelector('.tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    }

    // ===== Scroll Animation =====
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animated');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    // Initial check
    animateOnScroll();
});

// ===== Service Worker Registration =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(registration => {
            console.log('ServiceWorker registration successful');
        }).catch(err => {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}