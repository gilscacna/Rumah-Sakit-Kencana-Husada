(function() {
  "use strict";

  AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true
  });

  document.addEventListener('DOMContentLoaded', () => {

    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
      menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        menuToggle.classList.toggle('active');
        document.body.classList.toggle('mobile-nav-open');
      });
    }
    
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        if (navLinks.classList.contains('nav-active')) {
          navLinks.classList.remove('nav-active');
          menuToggle.classList.remove('active');
          document.body.classList.remove('mobile-nav-open');
        }
      });
    });

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const display = document.getElementById('form-message-display');
        if (!validateForm(contactForm, display)) {
          return;
        }
        showMessage(display, 'Terima kasih! Pesan Anda telah terkirim.', 'success');
        contactForm.reset();
      });
    }

    const appointmentForm = document.getElementById('appointment-form-futuristic');
    if (appointmentForm) {
      appointmentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const display = document.getElementById('form-message-display');
        if (!validateForm(appointmentForm, display)) {
          return;
        }
        showMessage(display, 'Terima kasih! Permintaan janji temu Anda telah terkirim.', 'success');
        appointmentForm.reset();
      });
    }

    function validateForm(form, display) {
      let isValid = true;
      const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
      
      for (const input of inputs) {
        if (input.value.trim() === '' || (input.tagName === 'SELECT' && input.value === '')) {
          showMessage(display, 'Mohon lengkapi semua kolom yang wajib diisi.', 'error');
          isValid = false;
          break;
        }
        if (input.type === 'email' && !validateEmail(input.value)) {
          showMessage(display, 'Silakan masukkan alamat email yang valid.', 'error');
          isValid = false;
          break;
        }
      }
      return isValid;
    }

    function showMessage(displayElement, message, type) {
      displayElement.textContent = message;
      displayElement.className = 'form-message';
      displayElement.classList.add(type);
    }

    function validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(String(email).toLowerCase());
    }

    const counters = document.querySelectorAll('.stat-counter');
    const speed = 200;

    const animateCounter = (counter) => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText;
      const inc = Math.max(1, Math.floor(target / speed));

      if (count < target) {
        counter.innerText = Math.min(count + inc, target);
        setTimeout(() => animateCounter(counter), 1);
      } else {
        counter.innerText = target;
      }
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          animateCounter(counter);
          observer.unobserve(counter);
        }
      });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
      observer.observe(counter);
    });

  });

})();
