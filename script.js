document.addEventListener('DOMContentLoaded', () => {
  // Redirect button on home page
  const interactiveBtn = document.getElementById('interactiveBtn');
  if (interactiveBtn) {
    interactiveBtn.addEventListener('click', () => {
      interactiveBtn.classList.add('clicked');
      interactiveBtn.textContent = 'Redirecting...';
      setTimeout(() => {
        window.location.href = 'contact.html';
      }, 1000);
    });
  }

  // Contact form validation and submission feedback
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    const submitBtn = document.getElementById('submitBtn');
    if (submitBtn) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        submitBtn.classList.remove('success', 'error');

        if (!name || !email || !message) {
          showError('Please fill in all fields.');
          return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          showError('Please enter a valid email address.');
          return;
        }

        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        setTimeout(() => {
          submitBtn.classList.add('success');
          submitBtn.textContent = 'Message Sent!';
          contactForm.reset();
          setTimeout(() => {
            submitBtn.classList.remove('success');
            submitBtn.textContent = 'Send Message';
            submitBtn.disabled = false;
          }, 3000);
        }, 2000);
      });

      function showError(message) {
        submitBtn.classList.add('error');
        submitBtn.textContent = message;
        setTimeout(() => {
          submitBtn.classList.remove('error');
          submitBtn.textContent = 'Send Message';
        }, 3000);
      }
    }
  }

  // Skill progress bar animations
  const skillsSection = document.querySelector('.skills-container');
  if (skillsSection) {
    const observer = new IntersectionObserver((entries, observerInstance) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const skillFills = entry.target.querySelectorAll('.skill-fill');
        const skillPercents = entry.target.querySelectorAll('.skill-percent');

        skillFills.forEach((fill, index) => {
          const percent = fill.getAttribute('data-percent');
          if (!percent) return;

          setTimeout(() => {
            fill.style.width = percent + '%';
            const percentSpan = skillPercents[index];
            if (percentSpan) {
              animateCounter(percentSpan, 0, parseInt(percent, 10), 1500);
            }
          }, index * 250);
        });

        observerInstance.unobserve(entry.target);
      });
    }, { threshold: 0.3 });

    observer.observe(skillsSection);
  }
});

function animateCounter(element, start, end, duration) {
  const startTime = performance.now();
  const endValue = Number(end);

  function updateCounter(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const currentValue = Math.round(start + (endValue - start) * progress);
    element.textContent = currentValue + '%';

    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    }
  }

  requestAnimationFrame(updateCounter);
}
