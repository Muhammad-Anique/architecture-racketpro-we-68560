'use strict';

/**
 * RacketPro Web - Main Interaction Script
 * Handles Mobile Menu, Smooth Scrolling, and Lead Form Submission.
 */

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initSmoothScroll();
    initContactForm();
    initRevealOnScroll();
});

/**
 * Mobile Navigation Toggle
 */
function initMobileMenu() {
    const mobileToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileToggle.classList.toggle('is-active');
            
            // Toggle hamburger animation
            const bars = mobileToggle.querySelectorAll('.bar');
            bars.forEach(bar => bar.classList.toggle('animate'));
        });
    }

    // Close menu when a link is clicked (mobile)
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileToggle.classList.remove('is-active');
        });
    });
}

/**
 * Smooth Scrolling for Anchor Links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Contact Form Logic & Supabase Integration Mock
 */
function initContactForm() {
    const leadForm = document.getElementById('lead-form');
    
    if (leadForm) {
        leadForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Collect Form Data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                interested_sport: document.getElementById('sport').value,
                message: document.getElementById('message').value,
                created_at: new Date().toISOString()
            };

            // Basic Validation
            if (!formData.name || !formData.email || !formData.message) {
                showFormStatus('All required fields must be filled.', 'error');
                return;
            }

            // UI Feedback: Loading
            const submitBtn = leadForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;
            submitBtn.innerText = 'Sending...';
            submitBtn.disabled = true;

            try {
                // In a production Next.js environment, this would call your Supabase Edge Function or Route Handler
                console.log('Pushing lead to Supabase:', formData);
                
                // Simulate network delay
                await new Promise(resolve => setTimeout(resolve, 1500));

                showFormStatus('Success! We will contact you shortly.', 'success');
                leadForm.reset();
            } catch (error) {
                console.error('Submission Error:', error);
                showFormStatus('Something went wrong. Please try again.', 'error');
            } finally {
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
            }
        });
    }
}

/**
 * Form Status Messenger
 */
function showFormStatus(message, type) {
    let statusDiv = document.getElementById('form-status');
    if (!statusDiv) {
        statusDiv = document.createElement('div');
        statusDiv.id = 'form-status';
        document.getElementById('lead-form').appendChild(statusDiv);
    }
    
    statusDiv.className = `status-msg ${type}`;
    statusDiv.innerText = message;
    
    setTimeout(() => {
        statusDiv.innerText = '';
        statusDiv.className = '';
    }, 5000);
}

/**
 * Simple Scroll Reveal for UI Polish
 */
function initRevealOnScroll() {
    const observerOptions