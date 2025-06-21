
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useCinematicScroll } from '../hooks/useCinematicScroll';

const ParticleAnimation = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    particles: THREE.Points;
    material: THREE.ShaderMaterial;
    morphProgress: number;
    scrollProgress: number;
    cleanup: () => void;
  } | null>(null);
  
  const { subscribeToScroll } = useCinematicScroll();

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup with enhanced performance
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance"
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Enhanced particle system for cinematic effect
    const particleCount = 2500;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const heartPositions = new Float32Array(particleCount * 3);
    const globePositions = new Float32Array(particleCount * 3);

    // Enhanced heart shape with more definition
    const createHeartShape = (index: number) => {
      const t = (index / particleCount) * Math.PI * 4;
      const x = 16 * Math.pow(Math.sin(t), 3);
      const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
      const z = Math.sin(t * 1.5) * 3;
      
      // Add some randomness for organic feel
      const noise = (Math.random() - 0.5) * 0.5;
      return { 
        x: (x + noise) * 0.04, 
        y: (y + noise) * 0.04, 
        z: (z + noise) * 0.04 
      };
    };

    // Enhanced globe with fibonacci distribution
    const createGlobeShape = (index: number) => {
      const phi = Math.acos(1 - 2 * (index / particleCount));
      const theta = Math.PI * (1 + Math.sqrt(5)) * index;
      const radius = 2.2;
      
      return {
        x: radius * Math.sin(phi) * Math.cos(theta),
        y: radius * Math.sin(phi) * Math.sin(theta),
        z: radius * Math.cos(phi)
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

      // Enhanced color palette for cinematic feel
      const t = i / particleCount;
      colors[i3] = 0.9 + t * 0.1;     // Warm to cool
      colors[i3 + 1] = 0.4 + t * 0.3; // Subtle variation
      colors[i3 + 2] = 0.5 + t * 0.5; // Blue accent

      sizes[i] = Math.random() * 1.5 + 0.5;
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particles.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    // Cinematic shader material
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        morphProgress: { value: 0 },
        scrollProgress: { value: 0 },
        cameraOffset: { value: new THREE.Vector3(0, 0, 0) }
      },
      vertexShader: `
        attribute float size;
        varying vec3 vColor;
        varying float vAlpha;
        uniform float time;
        uniform float morphProgress;
        uniform float scrollProgress;
        uniform vec3 cameraOffset;
        
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          
          // Cinematic camera movement based on scroll
          mvPosition.xyz += cameraOffset;
          
          // Floating motion with scroll influence
          mvPosition.x += sin(time * 0.3 + position.y * 0.3) * 0.03 * (1.0 - scrollProgress);
          mvPosition.y += cos(time * 0.25 + position.x * 0.3) * 0.03 * (1.0 - scrollProgress);
          
          // Distance-based alpha with scroll fade
          float distance = length(position.xy);
          vAlpha = (1.0 - distance * 0.1) * (1.0 - scrollProgress * 0.8);
          vAlpha = clamp(vAlpha, 0.1, 1.0);
          
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
          
          // Enhanced glow effect
          vec3 finalColor = vColor + vec3(0.2, 0.25, 0.3) * (1.0 - alpha);
          gl_FragColor = vec4(finalColor, alpha * 0.9);
        }
      `,
      blending: THREE.AdditiveBlending,
      depthTest: false,
      transparent: true,
      vertexColors: true
    });

    const particleSystem = new THREE.Points(particles, material);
    scene.add(particleSystem);
    camera.position.z = 5;

    // Store scene reference
    sceneRef.current = {
      scene,
      camera,
      renderer,
      particles: particleSystem,
      material,
      morphProgress: 0,
      scrollProgress: 0,
      cleanup: () => {
        if (mountRef.current && renderer.domElement) {
          mountRef.current.removeChild(renderer.domElement);
        }
        renderer.dispose();
        particles.dispose();
        material.dispose();
      }
    };

    // Animation loop with cinematic timing
    let time = 0;
    const animate = () => {
      if (!sceneRef.current) return;
      
      time += 0.004;
      
      // Update material uniforms
      sceneRef.current.material.uniforms.time.value = time;
      sceneRef.current.material.uniforms.morphProgress.value = sceneRef.current.morphProgress;
      sceneRef.current.material.uniforms.scrollProgress.value = sceneRef.current.scrollProgress;
      
      // Cinematic camera offset based on scroll
      const offsetX = sceneRef.current.scrollProgress * -2;
      const offsetY = sceneRef.current.scrollProgress * 0.5;
      sceneRef.current.material.uniforms.cameraOffset.value.set(offsetX, offsetY, 0);

      // Morphing animation with scroll control
      const positionAttribute = sceneRef.current.particles.geometry.getAttribute('position') as THREE.BufferAttribute;
      const positions = positionAttribute.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const t = THREE.MathUtils.smoothstep(sceneRef.current.morphProgress, 0, 1);
        
        positions[i3] = THREE.MathUtils.lerp(heartPositions[i3], globePositions[i3], t);
        positions[i3 + 1] = THREE.MathUtils.lerp(heartPositions[i3 + 1], globePositions[i3 + 1], t);
        positions[i3 + 2] = THREE.MathUtils.lerp(heartPositions[i3 + 2], globePositions[i3 + 2], t);
      }
      positionAttribute.needsUpdate = true;

      // Globe rotation in later phase
      if (sceneRef.current.morphProgress > 0.7) {
        sceneRef.current.particles.rotation.y += 0.002;
      }

      sceneRef.current.renderer.render(sceneRef.current.scene, sceneRef.current.camera);
      requestAnimationFrame(animate);
    };
    animate();

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
      sceneRef.current?.cleanup();
    };
  }, []);

  // Subscribe to cinematic scroll
  useEffect(() => {
    const unsubscribe = subscribeToScroll((progress, velocity) => {
      if (sceneRef.current) {
        // Heart morphs to globe over first 40% of scroll
        sceneRef.current.morphProgress = Math.min(progress * 2.5, 1);
        
        // Overall scene fades and shifts over scroll
        sceneRef.current.scrollProgress = progress;
      }
    });

    return unsubscribe;
  }, [subscribeToScroll]);

  return <div ref={mountRef} className="fixed inset-0 z-0" />;
};

export default ParticleAnimation;
