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

    console.log('🚀 Initializing Enhanced ParticleAnimation...');

    try {
      // Scene setup with enhanced error handling
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      
      // Enhanced renderer setup with better fallbacks
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
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      mountRef.current.appendChild(renderer.domElement);

      console.log('✅ WebGL renderer initialized successfully');

      // Optimized particle count for better definition
      const particleCount = 4000; // Reduced from 8000 for better clarity
      console.log(`🔵 Creating ${particleCount} particles...`);
      
      const particles = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      const sizes = new Float32Array(particleCount);
      const heartPositions = new Float32Array(particleCount * 3);
      const globePositions = new Float32Array(particleCount * 3);

      // Enhanced heart shape
      const createHeartShape = (index: number) => {
        const t = (index / particleCount) * Math.PI * 4;
        const x = 16 * Math.pow(Math.sin(t), 3);
        const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
        const z = Math.sin(t * 1.5) * 3;
        
        const noise = (Math.random() - 0.5) * 0.3;
        return { 
          x: (x + noise) * 0.04, 
          y: (y + noise) * 0.04, 
          z: (z + noise) * 0.04 
        };
      };

      // Perfect Fibonacci sphere distribution with better spacing
      const createGlobeShape = (index: number) => {
        // Golden angle in radians
        const goldenAngle = Math.PI * (3 - Math.sqrt(5));
        
        // y goes from 1 to -1
        const y = 1 - (index / (particleCount - 1)) * 2;
        
        // radius at y
        const radius = Math.sqrt(1 - y * y);
        
        // golden angle increment
        const theta = goldenAngle * index;
        
        const x = Math.cos(theta) * radius;
        const z = Math.sin(theta) * radius;
        
        const sphereRadius = 1.5;
        
        // Increased scatter for more organic appearance
        const scatter = 0.12;
        
        return {
          x: (x * sphereRadius) + (Math.random() - 0.5) * scatter,
          y: (y * sphereRadius) + (Math.random() - 0.5) * scatter,
          z: (z * sphereRadius) + (Math.random() - 0.5) * scatter
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

        // Improved color palette with better variation
        const t = i / particleCount;
        colors[i3] = 0.7 + t * 0.2;     // Reduced red intensity
        colors[i3 + 1] = 0.3 + t * 0.3; // Balanced green
        colors[i3 + 2] = 0.4 + t * 0.4; // Balanced blue

        // Smaller, more consistent particle sizes
        sizes[i] = 0.6 + Math.random() * 0.3; // Much smaller particles
      }

      particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      particles.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

      console.log('🎨 Particle attributes set successfully');

      // Improved shader material with better alpha blending
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
          uniform float time;
          uniform float morphProgress;
          uniform float visibility;
          
          void main() {
            vColor = color;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            
            // Subtle floating motion
            mvPosition.x += sin(time * 0.2 + position.y * 0.2) * 0.02;
            mvPosition.y += cos(time * 0.15 + position.x * 0.2) * 0.02;
            
            // Depth for better 3D effect
            vDepth = -mvPosition.z;
            
            // Distance-based alpha with visibility control
            float distance = length(position.xy);
            vAlpha = (1.0 - distance * 0.08) * visibility;
            vAlpha = clamp(vAlpha, 0.0, 1.0);
            
            // Smaller particle sizing without morph multiplier
            gl_PointSize = size * (80.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          varying vec3 vColor;
          varying float vAlpha;
          varying float vDepth;
          
          void main() {
            float r = distance(gl_PointCoord, vec2(0.5, 0.5));
            if (r > 0.5) discard;
            
            // Improved alpha falloff for better particle definition
            float alpha = (1.0 - r * 2.0) * vAlpha;
            alpha = pow(alpha, 2.0); // More aggressive falloff
            
            // Depth-based color variation for better 3D effect
            float depthFactor = clamp(vDepth * 0.1, 0.0, 1.0);
            vec3 finalColor = vColor * (0.8 + depthFactor * 0.2);
            
            // Reduced alpha to prevent over-brightening
            gl_FragColor = vec4(finalColor, alpha * 0.6);
          }
        `,
        blending: THREE.NormalBlending, // Changed from AdditiveBlending
        depthTest: true, // Enable depth testing
        transparent: true,
        vertexColors: true
      });

      // Check for shader compilation errors
      const gl = renderer.getContext();
      if (gl.getError() !== gl.NO_ERROR) {
        console.warn('⚠️ WebGL error during shader compilation');
      } else {
        console.log('✅ Shaders compiled successfully');
      }

      const particleSystem = new THREE.Points(particles, material);
      scene.add(particleSystem);
      camera.position.z = 5;

      console.log(`🎯 Particle system created successfully with ${particleCount} particles`);
      console.log('📊 Performance metrics:', {
        particleCount,
        memoryUsage: `${(particleCount * 32 / 1024).toFixed(2)}KB`,
        devicePixelRatio: window.devicePixelRatio
      });

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

      // Ultra-smooth animation loop with frame rate monitoring
      let time = 0;
      let frameCount = 0;
      let lastFpsTime = performance.now();
      
      const animate = () => {
        if (!sceneRef.current) return;
        
        time += 0.003; // Slightly slower time progression
        frameCount++;
        
        // FPS monitoring every 60 frames
        if (frameCount % 60 === 0) {
          const now = performance.now();
          const fps = 60000 / (now - lastFpsTime);
          if (fps < 30) {
            console.warn(`⚡ Performance warning: ${fps.toFixed(1)} FPS`);
          }
          lastFpsTime = now;
        }
        
        // Update material uniforms
        sceneRef.current.material.uniforms.time.value = time;
        sceneRef.current.material.uniforms.morphProgress.value = sceneRef.current.morphProgress;

        // Enhanced morphing animation
        const positionAttribute = sceneRef.current.particles.geometry.getAttribute('position') as THREE.BufferAttribute;
        const positions = positionAttribute.array as Float32Array;

        for (let i = 0; i < particleCount; i++) {
          const i3 = i * 3;
          const t = sceneRef.current.morphProgress;
          
          // Smooth interpolation between shapes
          positions[i3] = THREE.MathUtils.lerp(heartPositions[i3], globePositions[i3], t);
          positions[i3 + 1] = THREE.MathUtils.lerp(heartPositions[i3 + 1], globePositions[i3 + 1], t);
          positions[i3 + 2] = THREE.MathUtils.lerp(heartPositions[i3 + 2], globePositions[i3 + 2], t);
        }
        positionAttribute.needsUpdate = true;

        // Ultra-cinematic slow globe rotation
        if (sceneRef.current.morphProgress >= 1.0) {
          sceneRef.current.particles.rotation.y += 0.001; // Ultra-slow Y rotation
          sceneRef.current.particles.rotation.x += 0.0005; // Ultra-slow X rotation
        }

        sceneRef.current.renderer.render(sceneRef.current.scene, sceneRef.current.camera);
        sceneRef.current.animationId = requestAnimationFrame(animate);
      };
      
      animate();
      console.log('🎬 Ultra-smooth animation loop started');

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
        console.log('🧹 Cleaning up ParticleAnimation...');
        window.removeEventListener('resize', handleResize);
        if (sceneRef.current?.animationId) {
          cancelAnimationFrame(sceneRef.current.animationId);
        }
        sceneRef.current?.cleanup();
      };

    } catch (error) {
      console.error('💥 Failed to initialize ParticleAnimation:', error);
      console.error('Stack trace:', error instanceof Error ? error.stack : 'No stack trace available');
    }
  }, []);

  // Enhanced scroll-based control with easing
  useEffect(() => {
    const handleScroll = () => {
      if (!sceneRef.current) return;

      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Heart morphs to globe over first 25% of scroll with easing
      const rawProgress = Math.min(scrollY / (windowHeight * 0.25), 1);
      // Apply easing curve for smoother transition
      const easedProgress = rawProgress < 0.5 
        ? 2 * rawProgress * rawProgress 
        : 1 - Math.pow(-2 * rawProgress + 2, 3) / 2;
      
      sceneRef.current.morphProgress = easedProgress;
      
      // Enhanced visibility control
      const heroBottom = windowHeight;
      const isVisible = scrollY < heroBottom;
      const targetVisibility = isVisible ? 1.0 : 0.0;
      
      // Smooth visibility transition
      const currentVisibility = sceneRef.current.material.uniforms.visibility.value;
      const newVisibility = THREE.MathUtils.lerp(currentVisibility, targetVisibility, 0.1);
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
