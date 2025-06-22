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

    console.log('🚀 Initializing Dynamic ParticleAnimation...');

    try {
      // Scene setup with enhanced error handling
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      
      // Enhanced renderer setup with better performance
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('webgl2') || canvas.getContext('webgl');
      
      if (!context) {
        console.warn('❌ WebGL not supported, particle animation disabled');
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
      // Cap pixel ratio for better performance on high-DPI displays
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      mountRef.current.appendChild(renderer.domElement);

      console.log('✅ WebGL renderer initialized successfully');

      // Increased particle count for better definition
      const particleCount = 6000;
      console.log(`🔵 Creating ${particleCount} particles for dynamic globe...`);
      
      const particles = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      const sizes = new Float32Array(particleCount);
      const heartPositions = new Float32Array(particleCount * 3);
      const globePositions = new Float32Array(particleCount * 3);

      // Enhanced heart shape with tighter clustering
      const createHeartShape = (index: number) => {
        const t = (index / particleCount) * Math.PI * 4;
        const x = 16 * Math.pow(Math.sin(t), 3);
        const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
        const z = Math.sin(t * 1.5) * 3;
        
        // Reduced noise for sharper edges
        const noise = (Math.random() - 0.5) * 0.1;
        return { 
          x: (x + noise) * 0.04, 
          y: (y + noise) * 0.04, 
          z: (z + noise) * 0.04 
        };
      };

      // Perfect Fibonacci sphere with minimal scatter for sharp definition
      const createGlobeShape = (index: number) => {
        const goldenAngle = Math.PI * (3 - Math.sqrt(5));
        const y = 1 - (index / (particleCount - 1)) * 2;
        const radius = Math.sqrt(1 - y * y);
        const theta = goldenAngle * index;
        
        const x = Math.cos(theta) * radius;
        const z = Math.sin(theta) * radius;
        
        const sphereRadius = 1.5;
        
        // Minimal scatter for sharp, precise sphere
        const scatter = 0.02;
        
        return {
          x: (x * sphereRadius) + (Math.random() - 0.5) * scatter,
          y: (y * sphereRadius) + (Math.random() - 0.5) * scatter,
          z: (z * sphereRadius) + (Math.random() - 0.5) * scatter
        };
      };

      // Initialize particle data with enhanced clarity
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

        // Sharp, vibrant color palette
        const t = i / particleCount;
        const colorVariant = Math.floor(t * 4);
        
        switch (colorVariant) {
          case 0: // Electric blue/cyan
            colors[i3] = 0.1 + t * 0.2;
            colors[i3 + 1] = 0.9 + t * 0.1;
            colors[i3 + 2] = 1.0;
            break;
          case 1: // Hot pink/magenta
            colors[i3] = 1.0;
            colors[i3 + 1] = 0.1 + t * 0.2;
            colors[i3 + 2] = 0.9 + t * 0.1;
            break;
          case 2: // Bright green/lime
            colors[i3] = 0.2 + t * 0.3;
            colors[i3 + 1] = 1.0;
            colors[i3 + 2] = 0.1 + t * 0.2;
            break;
          default: // Purple/violet
            colors[i3] = 0.9 + t * 0.1;
            colors[i3 + 1] = 0.1 + t * 0.2;
            colors[i3 + 2] = 1.0;
            break;
        }

        // Size variation based on latitude for realistic globe appearance
        const latitude = Math.abs(globePos.y / 1.5);
        const baseSize = 0.6 + Math.random() * 0.2;
        sizes[i] = baseSize * (1 + latitude * 0.3); // Slightly larger at poles
      }

      particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      particles.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

      console.log('🎨 Dynamic particle attributes set successfully');

      // Enhanced shader material with dynamic motion and glow
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
          varying float vDepth;
          varying float vGlow;
          uniform float time;
          uniform float morphProgress;
          uniform float visibility;
          
          void main() {
            vColor = color;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            
            // Enhanced floating motion for dynamic movement
            mvPosition.x += sin(time * 0.8 + position.y * 2.0) * 0.02;
            mvPosition.y += cos(time * 0.6 + position.x * 2.0) * 0.02;
            mvPosition.z += sin(time * 0.4 + position.z * 1.5) * 0.015;
            
            // Add wave-like motion across the globe surface
            float wave1 = sin(time * 1.2 + position.x * 3.0 + position.y * 2.0) * 0.01;
            float wave2 = cos(time * 0.9 + position.z * 2.5 + position.y * 1.8) * 0.01;
            mvPosition.xyz += normalize(position) * (wave1 + wave2);
            
            vDepth = -mvPosition.z;
            
            // Enhanced glow with breathing effect
            float breathe = sin(time * 0.7) * 0.2 + 1.0;
            float colorGlow = dot(color, vec3(0.299, 0.587, 0.114)); // Luminance
            vGlow = (1.0 + sin(time * 1.8 + position.x * 4.0) * 0.4) * breathe * (0.8 + colorGlow * 0.4);
            
            // Sharp alpha calculation with dynamic variation
            float distance = length(position.xy);
            float pulseAlpha = 0.9 + sin(time * 2.0 + distance * 5.0) * 0.1;
            vAlpha = (1.0 - distance * 0.03) * visibility * pulseAlpha;
            vAlpha = clamp(vAlpha, 0.0, 1.0);
            
            // Dynamic particle sizing with subtle pulsing
            float sizePulse = 1.0 + sin(time * 1.5 + position.y * 3.0) * 0.15;
            gl_PointSize = size * (60.0 / -mvPosition.z) * vGlow * sizePulse;
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          varying vec3 vColor;
          varying float vAlpha;
          varying float vDepth;
          varying float vGlow;
          
          void main() {
            float r = distance(gl_PointCoord, vec2(0.5, 0.5));
            if (r > 0.5) discard;
            
            // Sharp core with enhanced glow edge
            float coreSize = 0.25;
            float alpha;
            
            if (r < coreSize) {
              // Bright inner core
              alpha = vAlpha * 1.2;
            } else {
              // Glowing outer edge
              float edgeAlpha = (0.5 - r) / (0.5 - coreSize);
              alpha = pow(edgeAlpha, 0.6) * vAlpha * 1.1;
            }
            
            // Enhanced depth-based brightness for 3D clarity
            float depthFactor = clamp(vDepth * 0.12, 0.0, 1.0);
            float brightness = 1.3 + depthFactor * 0.4;
            
            // Dynamic color shifting with enhanced glow
            vec3 glowColor = vColor * brightness * vGlow;
            
            // Add subtle color temperature variation
            float warmth = sin(vDepth * 0.1) * 0.1 + 1.0;
            glowColor.r *= warmth;
            glowColor.b *= (2.0 - warmth);
            
            gl_FragColor = vec4(glowColor, alpha);
          }
        `,
        blending: THREE.AdditiveBlending, // Changed back to additive for better glow
        depthTest: true,
        transparent: true,
        vertexColors: true
      });

      const gl = renderer.getContext();
      if (gl.getError() !== gl.NO_ERROR) {
        console.warn('⚠️ WebGL error during shader compilation');
      } else {
        console.log('✅ Dynamic shaders compiled successfully');
      }

      const particleSystem = new THREE.Points(particles, material);
      scene.add(particleSystem);
      camera.position.z = 5;

      console.log(`🎯 Dynamic particle system created with ${particleCount} particles`);

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

      // Enhanced animation loop with dynamic motion
      let time = 0;
      let frameCount = 0;
      let lastFpsTime = performance.now();
      let isAnimating = true;
      
      const animate = () => {
        if (!sceneRef.current || !isAnimating) return;
        
        time += 0.008; // Increased from 0.002 for faster animations
        frameCount++;
        
        // Performance monitoring every 120 frames
        if (frameCount % 120 === 0) {
          const now = performance.now();
          const fps = 120000 / (now - lastFpsTime);
          if (fps < 45) {
            console.warn(`⚡ Performance warning: ${fps.toFixed(1)} FPS`);
          }
          lastFpsTime = now;
        }
        
        // Update material uniforms
        sceneRef.current.material.uniforms.time.value = time;
        sceneRef.current.material.uniforms.morphProgress.value = sceneRef.current.morphProgress;

        // Optimized morphing animation - only update when morphing
        if (sceneRef.current.morphProgress > 0 && sceneRef.current.morphProgress < 1) {
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
        }

        // Enhanced globe rotation when fully morphed
        if (sceneRef.current.morphProgress >= 1.0) {
          // Increased rotation speed for noticeable spinning
          sceneRef.current.particles.rotation.y += 0.003;
          sceneRef.current.particles.rotation.x += 0.001;
          
          // Add subtle wobble for more dynamic movement
          const wobbleX = Math.sin(time * 0.3) * 0.0005;
          const wobbleY = Math.cos(time * 0.25) * 0.0003;
          sceneRef.current.particles.rotation.x += wobbleX;
          sceneRef.current.particles.rotation.z += wobbleY;
        }

        sceneRef.current.renderer.render(sceneRef.current.scene, sceneRef.current.camera);
        sceneRef.current.animationId = requestAnimationFrame(animate);
      };
      
      animate();
      console.log('🎬 Dynamic animation loop started');

      // Handle resize with performance optimization
      const handleResize = () => {
        if (!sceneRef.current) return;
        sceneRef.current.camera.aspect = window.innerWidth / window.innerHeight;
        sceneRef.current.camera.updateProjectionMatrix();
        sceneRef.current.renderer.setSize(window.innerWidth, window.innerHeight);
        console.log('📱 Viewport resized and updated');
      };
      window.addEventListener('resize', handleResize);

      return () => {
        console.log('🧹 Cleaning up Dynamic ParticleAnimation...');
        isAnimating = false;
        window.removeEventListener('resize', handleResize);
        if (sceneRef.current?.animationId) {
          cancelAnimationFrame(sceneRef.current.animationId);
        }
        sceneRef.current?.cleanup();
      };

    } catch (error) {
      console.error('💥 Failed to initialize Dynamic ParticleAnimation:', error);
    }
  }, []);

  // Enhanced scroll-based control with performance optimization
  useEffect(() => {
    let lastMorphProgress = -1;
    
    const handleScroll = () => {
      if (!sceneRef.current) return;

      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Smooth morphing over first 25% of scroll
      const rawProgress = Math.min(scrollY / (windowHeight * 0.25), 1);
      const easedProgress = rawProgress < 0.5 
        ? 2 * rawProgress * rawProgress 
        : 1 - Math.pow(-2 * rawProgress + 2, 3) / 2;
      
      // Only update if progress changed significantly (performance optimization)
      if (Math.abs(easedProgress - lastMorphProgress) > 0.01) {
        sceneRef.current.morphProgress = easedProgress;
        lastMorphProgress = easedProgress;
      }
      
      // Visibility control
      const heroBottom = windowHeight;
      const isVisible = scrollY < heroBottom;
      const targetVisibility = isVisible ? 1.0 : 0.0;
      
      const currentVisibility = sceneRef.current.material.uniforms.visibility.value;
      const newVisibility = THREE.MathUtils.lerp(currentVisibility, targetVisibility, 0.08);
      sceneRef.current.material.uniforms.visibility.value = newVisibility;
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
