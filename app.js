document.addEventListener('DOMContentLoaded', () => {

    // --- Lenis Smooth Scroll Setup ---
    const lenis = new Lenis();

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // --- Custom Cursor ---
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    gsap.set(follower, { xPercent: -50, yPercent: -50 });

    window.addEventListener('mousemove', e => {
        gsap.to(cursor, 0.1, { x: e.clientX, y: e.clientY });
        gsap.to(follower, 0.6, { x: e.clientX, y: e.clientY, ease: "power3.out" });
    });

    document.querySelectorAll('.magneto').forEach(el => {
        el.addEventListener('mouseenter', () => follower.classList.add('active'));
        el.addEventListener('mouseleave', () => follower.classList.remove('active'));
    });

    // --- Navigation ---
    const navLinks = gsap.utils.toArray('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = e.target.getAttribute('href');
            lenis.scrollTo(target, { offset: -50, duration: 2 });
        });
    });

    gsap.utils.toArray('.panel').forEach(section => {
        ScrollTrigger.create({
            trigger: section,
            start: "top 50%",
            end: "bottom 50%",
            onToggle: self => {
                const link = navLinks.find(link => link.getAttribute('href') === `#${section.id}`);
                if (link) {
                    link.classList.toggle('active', self.isActive);
                }
            }
        });
    });

    // --- Animations ---

    // 1. About Panel
    const aboutTl = gsap.timeline({
        scrollTrigger: { trigger: ".about-panel", start: "top 80%", toggleActions: "play none none reverse" }
    });
    const splitName = new SplitText(".hero-name", { type: "chars" });
    const splitSub = new SplitText(".hero-subtitle", { type: "words" });

    aboutTl.from(splitName.chars, { opacity: 0, y: 60, ease: 'power3.out', stagger: 0.03, duration: 1 })
           .from(splitSub.words, { opacity: 0, y: 30, ease: 'power3.out', stagger: 0.05 }, "-=0.8");
    
    gsap.from(".profile-img", {
        scrollTrigger: { trigger: ".about-panel", start: "top 80%", toggleActions: "play none none reverse" },
        scale: 0.5,
        opacity: 0,
        duration: 1.5,
        ease: 'power3.out'
    });


    // 2. Projects Panel
    gsap.from(".project-card", {
        scrollTrigger: { trigger: ".projects-panel", start: "top 70%", toggleActions: "play none none reverse" },
        y: 100,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: 'power3.out'
    });
    
    // 3. Skills Panel
    gsap.from(".skill-item", {
        scrollTrigger: { trigger: ".skills-panel", start: "top 70%", toggleActions: "play none none reverse" },
        y: 50,
        opacity: 0,
        stagger: 0.05,
        duration: 0.8,
        ease: 'power3.out'
    });

    // 4. Experience Panel
    gsap.from(".experience-item", {
        scrollTrigger: { trigger: ".experience-panel", start: "top 70%", toggleActions: "play none none reverse" },
        x: -50,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out'
    });
    
    // 5. Contact Panel
    gsap.from(".contact-text", {
        scrollTrigger: { trigger: ".contact-panel", start: "top 70%", toggleActions: "play none none reverse" },
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out'
    });
    
    // Animate all section titles
    gsap.utils.toArray('.section-title').forEach(title => {
        const splitTitle = new SplitText(title, { type: "chars, words" });
        gsap.from(splitTitle.chars, {
            scrollTrigger: { trigger: title, start: "top 85%", toggleActions: "play none none reverse" },
            opacity: 0,
            y: 80,
            stagger: 0.02,
            duration: 0.8,
            ease: 'power3.out'
        });
    });
});