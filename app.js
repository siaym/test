document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray('.fade-in, .fade-in-up').forEach((elem) => {
    gsap.from(elem, {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: elem,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
  });
});
