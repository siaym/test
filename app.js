// Wait for DOM content to load
document.addEventListener('DOMContentLoaded', () => {
  // Navigation active link highlight on scroll
  const navLinks = document.querySelectorAll('nav a');
  const sections = Array.from(document.querySelectorAll('section'));

  // Intersection Observer for sections
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const id = entry.target.id;
      const navLink = document.querySelector(`nav a[href="index.html${id === 'about' ? '' : '#' + id}"], nav a[href="#${id}"]`);
      if (entry.isIntersecting) {
        // Show section with animation
        entry.target.classList.add('visible');

        // Update nav links active state
        navLinks.forEach((link) => link.classList.remove('active'));
        if (navLink) navLink.classList.add('active');
      }
    });
  }, observerOptions);

  sections.forEach((section) => observer.observe(section));

  // Initialize Typed.js
  new Typed('#typed', {
    strings: [
      'Aspiring Cybersecurity Expert',
      'Real-Time Systems Developer',
      'Web Application Builder',
      'Clean Code Enthusiast',
    ],
    typeSpeed: 60,
    backSpeed: 35,
    backDelay: 1800,
    loop: true,
    showCursor: true,
    cursorChar: '|',
  });

  // GSAP Scroll-trigger fade-in animations (additional fallback)
  gsap.registerPlugin(ScrollTrigger);
  gsap.utils.toArray('section').forEach((section) => {
    gsap.fromTo(
      section,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );
  });
});
