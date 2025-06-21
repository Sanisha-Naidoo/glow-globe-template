
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ParticleAnimation = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0 });
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    particles: THREE.Points;
    material: THREE.ShaderMaterial;
    cleanup: () => void;
  } | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Heart-to-Globe particle system
    const particleCount = 1500;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const originalPositions = new Float32Array(particleCount * 3);
    const targetPositions = new Float32Array(particleCount * 3);

    // Create heart shape positions
    const createHeartShape = (index: number) => {
      const t = (index / particleCount) * Math.PI * 2;
      const x = 16 * Math.pow(Math.sin(t), 3);
      const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
      const z = Math.sin(t * 2) * 2;
      return { x: x * 0.05, y: y * 0.05, z: z * 0.05 };
    };

    // Create globe shape positions
    const createGlobeShape = (index: number) => {
      const phi = Math.acos(-1 + (2 * index) / particleCount);
      const theta = Math.sqrt(particleCount * Math.PI) * phi;
      const radius = 2;
      
      return {
        x: radius * Math.cos(theta) * Math.sin(phi),
        y: radius * Math.sin(theta) * Math.sin(phi),
        z: radius * Math.cos(phi)
      };
    };

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Heart positions (starting state)
      const heartPos = createHeartShape(i);
      positions[i3] = heartPos.x;
      positions[i3 + 1] = heartPos.y;
      positions[i3 + 2] = heartPos.z;
      
      originalPositions[i3] = heartPos.x;
      originalPositions[i3 + 1] = heartPos.y;
      originalPositions[i3 + 2] = heartPos.z;

      // Globe positions (target state)
      const globePos = createGlobeShape(i);
      targetPositions[i3] = globePos.x;
      targetPositions[i3 + 1] = globePos.y;
      targetPositions[i3 + 2] = globePos.z;

      // Refined color palette - warm to cool transition
      const t = i / particleCount;
      colors[i3] = 0.8 + t * 0.2;     // R - warm to neutral
      colors[i3 + 1] = 0.3 + t * 0.4; // G - subtle teal
      colors[i3 + 2] = 0.4 + t * 0.6; // B - cool blue

      sizes[i] = Math.random() * 1.2 + 0.3;
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particles.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    // Advanced shader material
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        mouse: { value: new THREE.Vector2() },
        morphProgress: { value: 0 },
        globalOpacity: { value: 1.0 }
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        varying float vAlpha;
        uniform float time;
        uniform vec2 mouse;
        uniform float morphProgress;
        uniform float globalOpacity;
        
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          
          // Subtle mouse parallax
          vec2 mouseEffect = mouse * 0.03;
          float distance = length(position.xy);
          mvPosition.xy += mouseEffect * (1.0 / (1.0 + distance * 0.5));
          
          // Gentle floating motion
          mvPosition.x += sin(time * 0.4 + position.y * 0.2) * 0.05;
          mvPosition.y += cos(time * 0.3 + position.x * 0.2) * 0.05;
          
          // Distance-based alpha for depth
          float depthAlpha = 1.0 - (distance * 0.1);
          vAlpha = clamp(depthAlpha, 0.2, 1.0) * globalOpacity;
          
          gl_PointSize = size * (150.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;
        
        void main() {
          float r = distance(gl_PointCoord, vec2(0.5, 0.5));
          if (r > 0.5) discard;
          
          float alpha = (1.0 - r * 2.0) * vAlpha;
          alpha = pow(alpha, 1.2);
          
          // Soft luminous glow
          vec3 finalColor = vColor + vec3(0.1, 0.15, 0.2) * (1.0 - alpha);
          gl_FragColor = vec4(finalColor, alpha * 0.8);
        }
      `,
      blending: THREE.AdditiveBlending,
      depthTest: false,
      transparent: true,
      vertexColors: true
    });

    const particleSystem = new THREE.Points(particles, material);
    scene.add(particleSystem);

    camera.position.z = 6;

    // Mouse movement tracking
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    document.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    let time = 0;
    let morphProgress = 0;
    const morphDuration = 6000; // 6 seconds for heart to globe transition
    
    const animate = () => {
      time += 0.005;
      morphProgress = Math.min(time * 1000 / morphDuration, 1);
      
      if (material.uniforms) {
        material.uniforms.time.value = time;
        material.uniforms.mouse.value.set(mouseRef.current.x, mouseRef.current.y);
        material.uniforms.morphProgress.value = morphProgress;
      }

      // Smooth morphing between heart and globe
      const positionAttribute = particles.getAttribute('position') as THREE.BufferAttribute;
      const positions = positionAttribute.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const t = THREE.MathUtils.smoothstep(morphProgress, 0, 1);
        
        positions[i3] = THREE.MathUtils.lerp(originalPositions[i3], targetPositions[i3], t);
        positions[i3 + 1] = THREE.MathUtils.lerp(originalPositions[i3 + 1], targetPositions[i3 + 1], t);
        positions[i3 + 2] = THREE.MathUtils.lerp(originalPositions[i3 + 2], targetPositions[i3 + 2], t);
      }

      positionAttribute.needsUpdate = true;
      
      // Gentle camera movement
      camera.position.x = Math.sin(time * 0.1) * 0.02;
      camera.position.y = Math.cos(time * 0.08) * 0.02;

      // Subtle rotation for globe phase
      if (morphProgress > 0.7) {
        particleSystem.rotation.y += 0.001;
      }

      renderer.render(scene, camera);
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);

    // Store scene reference for external control
    sceneRef.current = {
      scene,
      camera,
      renderer,
      particles: particleSystem,
      material,
      cleanup: () => {
        document.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', handleResize);
        if (mountRef.current && renderer.domElement) {
          mountRef.current.removeChild(renderer.domElement);
        }
        renderer.dispose();
        particles.dispose();
        material.dispose();
      }
    };

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      sceneRef.current?.cleanup();
    };
  }, []);

  // Method to fade out particles based on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (sceneRef.current?.material) {
        const scrollY = window.scrollY;
        const fadeStart = window.innerHeight * 0.3;
        const fadeEnd = window.innerHeight * 0.8;
        
        let opacity = 1;
        if (scrollY > fadeStart) {
          opacity = 1 - Math.min((scrollY - fadeStart) / (fadeEnd - fadeStart), 1);
        }
        
        sceneRef.current.material.uniforms.globalOpacity.value = opacity;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return <div ref={mountRef} className="absolute inset-0" />;
};

export default ParticleAnimation;
