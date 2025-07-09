document.addEventListener('DOMContentLoaded', () => {
  // Typed.js initialization if typed element exists
  if (document.querySelector('#typed')) {
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
  }

  // GSAP fade-in animation for elements with .fade-in class
  if (gsap && ScrollTrigger) {
    const fadeEls = document.querySelectorAll('.fade-in');
    fadeEls.forEach(el => {
      gsap.fromTo(el, {opacity: 0, y: 30}, {
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out"
      });
    });
  }

  // Nav active link highlight based on current page URL
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    if (link.href === window.location.href) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
});
