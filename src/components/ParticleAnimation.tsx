
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
    scrollProgress: number;
    cleanup: () => void;
  } | null>(null);
  
  const { subscribeToScroll } = useCinematicScroll();

  useEffect(() => {
    if (!mountRef.current) return;

    // Enhanced scene setup with higher quality
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance"
    });
    
    // Higher pixel ratio for better resolution
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Enhanced particle system with higher resolution
    const particleCount = 5000; // Increased from 2500
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const phases = new Float32Array(particleCount); // For individual particle animation

    // Enhanced high-resolution heart shape with multiple layers
    const createHeartShape = (index: number) => {
      const layerCount = 5;
      const layer = Math.floor(index / (particleCount / layerCount));
      const layerProgress = (index % (particleCount / layerCount)) / (particleCount / layerCount);
      
      // Multiple parametric approaches for denser heart
      const t = layerProgress * Math.PI * 6; // Increased resolution
      
      // Classic heart equation with enhanced precision
      let x, y, z;
      
      if (layer < 3) {
        // Main heart shape layers
        x = 16 * Math.pow(Math.sin(t), 3);
        y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
        z = Math.sin(t * 2) * (3 + layer * 0.5); // Varied depth per layer
      } else {
        // Fill layers for volume
        const r = 0.8 + layer * 0.1;
        const heartX = 16 * Math.pow(Math.sin(t), 3) * r;
        const heartY = (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * r;
        
        x = heartX + (Math.random() - 0.5) * 4;
        y = heartY + (Math.random() - 0.5) * 4;
        z = (Math.random() - 0.5) * 8;
      }
      
      // Scale and add subtle randomness for organic feel
      const scale = 0.035;
      const noise = (Math.random() - 0.5) * 0.3;
      
      return { 
        x: (x + noise) * scale, 
        y: (y + noise) * scale, 
        z: (z + noise) * scale 
      };
    };

    // Initialize particle data with enhanced heart shape
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      const heartPos = createHeartShape(i);
      positions[i3] = heartPos.x;
      positions[i3 + 1] = heartPos.y;
      positions[i3 + 2] = heartPos.z;

      // Enhanced color palette with depth-based variation
      const distanceFromCenter = Math.sqrt(heartPos.x * heartPos.x + heartPos.y * heartPos.y);
      const t = Math.min(distanceFromCenter * 2, 1);
      
      // Romantic red-pink gradient
      colors[i3] = 1.0 - t * 0.3;     // Red channel
      colors[i3 + 1] = 0.2 + t * 0.4; // Green channel  
      colors[i3 + 2] = 0.4 + t * 0.3; // Blue channel

      sizes[i] = Math.random() * 2.0 + 0.8; // Larger particles for better visibility
      phases[i] = Math.random() * Math.PI * 2; // Individual animation phases
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particles.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    particles.setAttribute('phase', new THREE.BufferAttribute(phases, 1));

    // Enhanced shader material for better heart visualization
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        scrollProgress: { value: 0 },
        heartBeat: { value: 0 },
        rotation: { value: 0 }
      },
      vertexShader: `
        attribute float size;
        attribute float phase;
        varying vec3 vColor;
        varying float vAlpha;
        varying float vGlow;
        uniform float time;
        uniform float scrollProgress;
        uniform float heartBeat;
        uniform float rotation;
        
        mat3 rotateY(float angle) {
          float c = cos(angle);
          float s = sin(angle);
          return mat3(
            c, 0.0, s,
            0.0, 1.0, 0.0,
            -s, 0.0, c
          );
        }
        
        void main() {
          vColor = color;
          
          // Apply heart rotation based on scroll
          vec3 rotatedPosition = rotateY(rotation) * position;
          
          // Heart beating effect
          float beat = 1.0 + sin(time * 3.0 + phase) * 0.05 * heartBeat;
          rotatedPosition *= beat;
          
          vec4 mvPosition = modelViewMatrix * vec4(rotatedPosition, 1.0);
          
          // Enhanced floating motion
          mvPosition.x += sin(time * 0.4 + phase + position.y * 0.5) * 0.02;
          mvPosition.y += cos(time * 0.3 + phase + position.x * 0.5) * 0.02;
          mvPosition.z += sin(time * 0.35 + phase) * 0.01;
          
          // Distance-based effects
          float distance = length(rotatedPosition.xy);
          vAlpha = (1.2 - distance * 0.8) * (1.0 - scrollProgress * 0.7);
          vAlpha = clamp(vAlpha, 0.2, 1.0);
          
          // Enhanced glow for heart shape
          vGlow = 1.0 - distance * 0.5;
          
          // Larger, more visible particles
          gl_PointSize = size * (150.0 / -mvPosition.z) * (1.0 + heartBeat * 0.3);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;
        varying float vGlow;
        
        void main() {
          float r = distance(gl_PointCoord, vec2(0.5, 0.5));
          if (r > 0.5) discard;
          
          // Enhanced particle shape with soft edges
          float alpha = (1.0 - r * 2.0) * vAlpha;
          alpha = pow(alpha, 1.2);
          
          // Enhanced glow and romantic colors
          vec3 heartGlow = vec3(1.0, 0.4, 0.6) * vGlow * 0.3;
          vec3 finalColor = vColor + heartGlow;
          
          // Add subtle sparkle effect
          float sparkle = sin(r * 20.0) * 0.1;
          finalColor += vec3(sparkle * 0.5, sparkle * 0.2, sparkle * 0.3);
          
          gl_FragColor = vec4(finalColor, alpha);
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

    // Enhanced animation loop with heart-focused effects
    let time = 0;
    const animate = () => {
      if (!sceneRef.current) return;
      
      time += 0.005;
      
      // Heart rotation based on scroll
      const rotationSpeed = sceneRef.current.scrollProgress * 2;
      
      // Heart beating effect intensity
      const heartBeat = 0.5 + Math.sin(time * 1.5) * 0.3;
      
      // Update material uniforms
      sceneRef.current.material.uniforms.time.value = time;
      sceneRef.current.material.uniforms.scrollProgress.value = sceneRef.current.scrollProgress;
      sceneRef.current.material.uniforms.heartBeat.value = heartBeat;
      sceneRef.current.material.uniforms.rotation.value = rotationSpeed;

      // Gentle camera movement for cinematic feel
      sceneRef.current.camera.position.x = Math.sin(time * 0.1) * 0.2;
      sceneRef.current.camera.position.y = Math.cos(time * 0.08) * 0.1;

      sceneRef.current.renderer.render(sceneRef.current.scene, sceneRef.current.camera);
      requestAnimationFrame(animate);
    };
    animate();

    // Handle resize with improved quality
    const handleResize = () => {
      if (!sceneRef.current) return;
      sceneRef.current.camera.aspect = window.innerWidth / window.innerHeight;
      sceneRef.current.camera.updateProjectionMatrix();
      sceneRef.current.renderer.setSize(window.innerWidth, window.innerHeight);
      sceneRef.current.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      sceneRef.current?.cleanup();
    };
  }, []);

  // Subscribe to cinematic scroll for heart rotation
  useEffect(() => {
    const unsubscribe = subscribeToScroll((progress, velocity) => {
      if (sceneRef.current) {
        sceneRef.current.scrollProgress = progress;
      }
    });

    return unsubscribe;
  }, [subscribeToScroll]);

  return <div ref={mountRef} className="fixed inset-0 z-0" />;
};

export default ParticleAnimation;
