// --- Start of app.js ---

console.log("✅ app.js file has been loaded and is running!");

// Function to handle the animation of content entering the page
function contentAnimation() {
    console.log("▶️ contentAnimation() function was called.");
    
    const tl = gsap.timeline();
    
    // Animate all elements with the class 'content-animate'
    tl.to('.content-animate', {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        ease: 'power3.out',
        duration: 0.8,
        onComplete: () => {
            console.log("✅ GSAP animation timeline completed!");
        }
    });
}

// Function to handle the page transition animation
function pageTransition() {
    console.log("▶️ pageTransition() function was called.");

    const tl = gsap.timeline();

    tl.to('.transition-screen', {
        duration: 0.6,
        y: '0%',
        ease: 'power2.inOut'
    });
    
    tl.to('.transition-screen', {
        duration: 0.6,
        y: '-100%',
        delay: 0.3,
        ease: 'power2.inOut'
    });
}


// --- Barba.js Initialization ---
console.log("Checking for Barba and GSAP libraries...");

if (window.barba && window.gsap) {
    console.log("✅ Barba and GSAP libraries are loaded successfully.");
    
    console.log("Initializing Barba...");
    barba.init({
        sync: true,
        transitions: [{
            // HOOK: before leaving the current page
            async leave(data) {
                console.log("Barba 'leave' hook triggered.");
                const done = this.async();
                pageTransition();
                await new Promise(resolve => setTimeout(resolve, 800));
                done();
            },
            // HOOK: after entering the new page
            enter(data) {
                console.log("Barba 'enter' hook triggered.");
                contentAnimation(); // Animate the new content in
            },
            // This hook runs once, when the very first page is loaded
            once(data) {
                console.log("Barba 'once' hook triggered for initial page load.");
                contentAnimation();
            }
        }]
    });
    console.log("✅ Barba has been initialized.");

} else {
    console.error("❌ Error: Barba.js or GSAP library is missing!");
}

// --- End of app.js ---