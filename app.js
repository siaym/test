document.addEventListener('DOMContentLoaded', () => {
  // Typed.js typed text animation
  new Typed('#typed', {
    strings: [
      'Aspiring Cybersecurity Expert',
      'Real-Time Systems Developer',
      'Web Application Builder',
      'Clean Code Enthusiast'
    ],
    typeSpeed: 60,
    backSpeed: 35,
    backDelay: 1800,
    loop: true,
    showCursor: true,
    cursorChar: '|',
  });

  // Fade in sections on scroll
  const sections = document.querySelectorAll('section.section');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(section => observer.observe(section));
});
