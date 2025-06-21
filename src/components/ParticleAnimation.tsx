
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ParticleAnimation = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    particles: THREE.Points;
    material: THREE.ShaderMaterial;
    morphProgress: number;
    animationId: number | null;
    cleanup: () => void;
  } | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    console.log('Initializing ParticleAnimation...');

    try {
      // Scene setup with error handling
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      
      // Enhanced renderer setup with fallbacks
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('webgl2') || canvas.getContext('webgl');
      
      if (!context) {
        console.warn('WebGL not supported, falling back to CSS background');
        return;
      }

      const renderer = new THREE.WebGLRenderer({ 
        canvas,
        alpha: true, 
        antialias: true,
        powerPreference: "high-performance"
      });
      
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 0);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      mountRef.current.appendChild(renderer.domElement);

      console.log('WebGL renderer initialized successfully');

      // Enhanced particle system
      const particleCount = 2000;
      const particles = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      const sizes = new Float32Array(particleCount);
      const heartPositions = new Float32Array(particleCount * 3);
      const globePositions = new Float32Array(particleCount * 3);

      // Original heart shape
      const createHeartShape = (index: number) => {
        const t = (index / particleCount) * Math.PI * 4;
        const x = 16 * Math.pow(Math.sin(t), 3);
        const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
        const z = Math.sin(t * 1.5) * 3;
        
        const noise = (Math.random() - 0.5) * 0.5;
        return { 
          x: (x + noise) * 0.04, 
          y: (y + noise) * 0.04, 
          z: (z + noise) * 0.04 
        };
      };

      // Original scattered globe shape (restored from beginning)
      const createGlobeShape = (index: number) => {
        const phi = Math.acos(-1 + (2 * index) / particleCount);
        const theta = Math.sqrt(particleCount * Math.PI) * phi;
        
        // Add organic scatter
        const scatter = 0.3;
        const radius = 1.5 + (Math.random() - 0.5) * scatter;
        
        return {
          x: radius * Math.cos(theta) * Math.sin(phi) + (Math.random() - 0.5) * 0.2,
          y: radius * Math.sin(theta) * Math.sin(phi) + (Math.random() - 0.5) * 0.2,
          z: radius * Math.cos(phi) + (Math.random() - 0.5) * 0.2
        };
      };

      // Initialize particle data
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        
        const heartPos = createHeartShape(i);
        heartPositions[i3] = heartPos.x;
        heartPositions[i3 + 1] = heartPos.y;
        heartPositions[i3 + 2] = heartPos.z;

        const globePos = createGlobeShape(i);
        globePositions[i3] = globePos.x;
        globePositions[i3 + 1] = globePos.y;
        globePositions[i3 + 2] = globePos.z;

        // Start with heart positions
        positions[i3] = heartPos.x;
        positions[i3 + 1] = heartPos.y;
        positions[i3 + 2] = heartPos.z;

        // Enhanced color palette
        const t = i / particleCount;
        colors[i3] = 0.8 + t * 0.2;
        colors[i3 + 1] = 0.3 + t * 0.4;
        colors[i3 + 2] = 0.4 + t * 0.6;

        sizes[i] = Math.random() * 1.5 + 0.5;
      }

      particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      particles.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

      // Enhanced shader material with error handling
      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          morphProgress: { value: 0 },
          visibility: { value: 1.0 }
        },
        vertexShader: `
          attribute float size;
          varying vec3 vColor;
          varying float vAlpha;
          uniform float time;
          uniform float morphProgress;
          uniform float visibility;
          
          void main() {
            vColor = color;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            
            // Floating motion
            mvPosition.x += sin(time * 0.3 + position.y * 0.3) * 0.03;
            mvPosition.y += cos(time * 0.25 + position.x * 0.3) * 0.03;
            
            // Distance-based alpha with visibility control
            float distance = length(position.xy);
            vAlpha = (1.0 - distance * 0.1) * visibility;
            vAlpha = clamp(vAlpha, 0.0, 1.0);
            
            gl_PointSize = size * (120.0 / -mvPosition.z) * (1.0 + morphProgress * 0.5);
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
            alpha = pow(alpha, 1.5);
            
            vec3 finalColor = vColor + vec3(0.2, 0.25, 0.3) * (1.0 - alpha);
            gl_FragColor = vec4(finalColor, alpha * 0.9);
          }
        `,
        blending: THREE.AdditiveBlending,
        depthTest: false,
        transparent: true,
        vertexColors: true
      });

      // Check for shader compilation errors
      const gl = renderer.getContext();
      if (gl.getError() !== gl.NO_ERROR) {
        console.warn('WebGL error during shader compilation');
      }

      const particleSystem = new THREE.Points(particles, material);
      scene.add(particleSystem);
      camera.position.z = 5;

      console.log('Particle system created successfully');

      // Store scene reference
      sceneRef.current = {
        scene,
        camera,
        renderer,
        particles: particleSystem,
        material,
        morphProgress: 0,
        animationId: null,
        cleanup: () => {
          if (mountRef.current && renderer.domElement) {
            mountRef.current.removeChild(renderer.domElement);
          }
          renderer.dispose();
          particles.dispose();
          material.dispose();
        }
      };

      // Simplified animation loop - always runs
      let time = 0;
      const animate = () => {
        if (!sceneRef.current) return;
        
        time += 0.004;
        
        // Update material uniforms
        sceneRef.current.material.uniforms.time.value = time;
        sceneRef.current.material.uniforms.morphProgress.value = sceneRef.current.morphProgress;

        // Morphing animation
        const positionAttribute = sceneRef.current.particles.geometry.getAttribute('position') as THREE.BufferAttribute;
        const positions = positionAttribute.array as Float32Array;

        for (let i = 0; i < particleCount; i++) {
          const i3 = i * 3;
          const t = sceneRef.current.morphProgress;
          
          positions[i3] = THREE.MathUtils.lerp(heartPositions[i3], globePositions[i3], t);
          positions[i3 + 1] = THREE.MathUtils.lerp(heartPositions[i3 + 1], globePositions[i3 + 1], t);
          positions[i3 + 2] = THREE.MathUtils.lerp(heartPositions[i3 + 2], globePositions[i3 + 2], t);
        }
        positionAttribute.needsUpdate = true;

        // Globe rotation starts immediately when morphing is complete
        if (sceneRef.current.morphProgress >= 1.0) {
          sceneRef.current.particles.rotation.y += 0.01;
          sceneRef.current.particles.rotation.x += 0.003;
        }

        sceneRef.current.renderer.render(sceneRef.current.scene, sceneRef.current.camera);
        sceneRef.current.animationId = requestAnimationFrame(animate);
      };
      
      animate();
      console.log('Animation loop started');

      // Handle resize
      const handleResize = () => {
        if (!sceneRef.current) return;
        sceneRef.current.camera.aspect = window.innerWidth / window.innerHeight;
        sceneRef.current.camera.updateProjectionMatrix();
        sceneRef.current.renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        if (sceneRef.current?.animationId) {
          cancelAnimationFrame(sceneRef.current.animationId);
        }
        sceneRef.current?.cleanup();
      };

    } catch (error) {
      console.error('Failed to initialize ParticleAnimation:', error);
    }
  }, []);

  // Simplified scroll-based control
  useEffect(() => {
    const handleScroll = () => {
      if (!sceneRef.current) return;

      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Heart morphs to globe over first 25% of scroll
      const morphProgress = Math.min(scrollY / (windowHeight * 0.25), 1);
      sceneRef.current.morphProgress = morphProgress;
      
      // Simple disappearance when scrolled past hero section
      const heroBottom = windowHeight;
      const isVisible = scrollY < heroBottom;
      const targetVisibility = isVisible ? 1.0 : 0.0;
      
      sceneRef.current.material.uniforms.visibility.value = targetVisibility;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="fixed inset-0 z-10"
      style={{
        background: 'radial-gradient(ellipse at center, rgba(30, 41, 59, 0.1) 0%, rgba(15, 23, 42, 0.3) 70%, rgba(2, 6, 23, 0.8) 100%)'
      }}
    />
  );
};

export default ParticleAnimation;
