const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');
let particles = [];
const resizeStars = () => {
  canvas.width = window.innerWidth * window.devicePixelRatio;
  canvas.height = window.innerHeight * window.devicePixelRatio;
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
  particles = Array.from({ length: Math.min(130, Math.floor(window.innerWidth / 9)) }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    r: Math.random() * 1.7 + 0.3,
    vx: (Math.random() - 0.5) * 0.24,
    vy: (Math.random() - 0.5) * 0.24,
    a: Math.random() * 0.6 + 0.2,
  }));
};
const drawStars = () => {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  particles.forEach((p, i) => {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > window.innerWidth) p.vx *= -1;
    if (p.y < 0 || p.y > window.innerHeight) p.vy *= -1;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(205, 241, 255, ${p.a})`;
    ctx.fill();
    for (let j = i + 1; j < particles.length; j++) {
      const q = particles[j];
      const dx = p.x - q.x;
      const dy = p.y - q.y;
      const dist = Math.hypot(dx, dy);
      if (dist < 115) {
        ctx.strokeStyle = `rgba(103, 232, 249, ${(1 - dist / 115) * 0.14})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.stroke();
      }
    }
  });
  requestAnimationFrame(drawStars);
};
resizeStars();
drawStars();
window.addEventListener('resize', resizeStars);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const tiltCard = document.getElementById('tilt-card');
if (tiltCard) {
  tiltCard.addEventListener('mousemove', (event) => {
    const rect = tiltCard.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    tiltCard.style.transform = `rotateX(${y * -7}deg) rotateY(${x * 9}deg)`;
  });
  tiltCard.addEventListener('mouseleave', () => {
    tiltCard.style.transform = 'rotateX(0deg) rotateY(0deg)';
  });
}

async function initThreeScene() {
  const host = document.getElementById('three-scene');
  if (!host) return;
  try {
    const THREE = await import('https://unpkg.com/three@0.168.0/build/three.module.js');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, host.clientWidth / host.clientHeight, 0.1, 100);
    camera.position.z = 5;
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(host.clientWidth, host.clientHeight);
    host.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);
    const geometry = new THREE.IcosahedronGeometry(1.35, 2);
    const material = new THREE.MeshStandardMaterial({
      color: 0x67e8f9,
      roughness: 0.22,
      metalness: 0.42,
      wireframe: true,
      transparent: true,
      opacity: 0.92,
    });
    const core = new THREE.Mesh(geometry, material);
    group.add(core);

    const ringMaterial = new THREE.MeshBasicMaterial({ color: 0xa78bfa, transparent: true, opacity: 0.55 });
    for (let i = 0; i < 3; i++) {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(2.0 + i * 0.32, 0.006, 16, 120), ringMaterial.clone());
      ring.rotation.x = Math.PI / 2 + i * 0.34;
      ring.rotation.y = i * 0.7;
      group.add(ring);
    }

    const smallMaterial = new THREE.MeshStandardMaterial({ color: 0xf472b6, emissive: 0x3a1028, metalness: 0.4, roughness: 0.35 });
    for (let i = 0; i < 34; i++) {
      const node = new THREE.Mesh(new THREE.SphereGeometry(Math.random() * 0.035 + 0.018, 12, 12), smallMaterial);
      const radius = 2.2 + Math.random() * 1.1;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      node.position.set(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi)
      );
      group.add(node);
    }

    scene.add(new THREE.AmbientLight(0xffffff, 1.4));
    const light = new THREE.PointLight(0x67e8f9, 9, 18);
    light.position.set(2, 3, 4);
    scene.add(light);
    const violetLight = new THREE.PointLight(0xa78bfa, 6, 18);
    violetLight.position.set(-3, -2, 3);
    scene.add(violetLight);

    const onResize = () => {
      camera.aspect = host.clientWidth / host.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(host.clientWidth, host.clientHeight);
    };
    window.addEventListener('resize', onResize);

    const animate = () => {
      group.rotation.y += 0.004;
      group.rotation.x += 0.002;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();
  } catch (error) {
    host.innerHTML = '<div class="three-fallback">AI systems • Cloud services • Full-stack products</div>';
  }
}
initThreeScene();
