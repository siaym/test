document.addEventListener('DOMContentLoaded', () => {

    // --- Setup ---
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, SplitText);
    const mainContainer = document.getElementById('main-container');

    // --- Custom Cursor ---
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    gsap.set(follower, { xPercent: -50, yPercent: -50 });

    window.addEventListener('mousemove', e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        gsap.to(cursor, 0.2, { x: mouseX, y: mouseY });
    });
    
    gsap.ticker.add(() => {
        followerX += (mouseX - followerX) * 0.2;
        followerY += (mouseY - followerY) * 0.2;
        gsap.set(follower, { x: followerX, y: followerY });
    });
    
    document.querySelectorAll('.magneto').forEach(el => {
        el.addEventListener('mouseenter', () => follower.classList.add('active'));
        el.addEventListener('mouseleave', () => follower.classList.remove('active'));
    });

    // --- WebGL Image Distortion ---
    try {
        const imageContainer = document.querySelector('.profile-image-container');
        const image = document.querySelector('.profile-img');
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        camera.position.z = 1;
        const renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(imageContainer.clientWidth, imageContainer.clientHeight);
        imageContainer.appendChild(renderer.domElement);

        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load(image.src);
        image.style.display = 'none'; // Hide original image

        const geometry = new THREE.PlaneBufferGeometry(1.5, 1.5, 32, 32);
        const material = new THREE.ShaderMaterial({
            uniforms: {
                uTexture: { value: texture },
                uTime: { value: 0 },
                uMouse: { value: new THREE.Vector2(0, 0) },
                uIntensity: { value: 0 },
            },
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform sampler2D uTexture;
                uniform float uTime;
                uniform vec2 uMouse;
                uniform float uIntensity;
                varying vec2 vUv;

                void main() {
                    vec2 uv = vUv;
                    float distance = length(uv - uMouse);
                    float wave = sin(distance * 20.0 - uTime * 5.0) * 0.02 * uIntensity;
                    uv += wave;
                    gl_FragColor = texture2D(uTexture, uv);
                }
            `
        });
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        function animate() {
            requestAnimationFrame(animate);
            material.uniforms.uTime.value += 0.01;
            renderer.render(scene, camera);
        }
        animate();
        
        imageContainer.addEventListener('mousemove', (e) => {
            const rect = imageContainer.getBoundingClientRect();
            material.uniforms.uMouse.value.x = (e.clientX - rect.left) / rect.width;
            material.uniforms.uMouse.value.y = 1.0 - ((e.clientY - rect.top) / rect.height);
        });

        imageContainer.addEventListener('mouseenter', () => {
            gsap.to(material.uniforms.uIntensity, { value: 1.0, duration: 0.5 });
        });
        imageContainer.addEventListener('mouseleave', () => {
            gsap.to(material.uniforms.uIntensity, { value: 0.0, duration: 0.5 });
        });