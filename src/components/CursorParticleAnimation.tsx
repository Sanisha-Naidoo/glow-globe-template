import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const CursorParticleAnimation = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    particles: THREE.Points;
    material: THREE.ShaderMaterial;
    animationId: number | null;
    isResting: boolean;
    morphProgress: number;
    targetMorphProgress: number;
    scale: number;
    targetScale: number;
    heartPositions: Float32Array;
    spherePositions: Float32Array;
    cleanup: () => void;
  } | null>(null);
  
  const cursorRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const restTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    try {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
      
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('webgl2') || canvas.getContext('webgl');
      
      if (!context) {
        console.warn('WebGL not supported');
        return;
      }

      const renderer = new THREE.WebGLRenderer({ 
        canvas,
        alpha: true, 
        antialias: true,
        powerPreference: "high-performance"
      });
      
      const baseSize = 60;
      renderer.setSize(baseSize, baseSize);
      renderer.setClearColor(0x000000, 0);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      mountRef.current.appendChild(renderer.domElement);

      const particleCount = 2000;
      const particles = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      const sizes = new Float32Array(particleCount);
      const heartPositions = new Float32Array(particleCount * 3);
      const spherePositions = new Float32Array(particleCount * 3);

      // Create heart shape
      const createHeartShape = (index: number) => {
        const t = (index / particleCount) * Math.PI * 4;
        const x = 16 * Math.pow(Math.sin(t), 3);
        const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
        const z = Math.sin(t * 1.5) * 3;
        const noise = (Math.random() - 0.5) * 0.1;
        return { 
          x: (x + noise) * 0.04, 
          y: (y + noise) * 0.04, 
          z: (z + noise) * 0.04 
        };
      };

      // Create sphere shape using Fibonacci distribution
      const createSphereShape = (index: number) => {
        const goldenAngle = Math.PI * (3 - Math.sqrt(5));
        const y = 1 - (index / (particleCount - 1)) * 2;
        const radius = Math.sqrt(1 - y * y);
        const theta = goldenAngle * index;
        
        const x = Math.cos(theta) * radius;
        const z = Math.sin(theta) * radius;
        
        const sphereRadius = 1.2;
        const scatter = 0.02;
        
        return {
          x: (x * sphereRadius) + (Math.random() - 0.5) * scatter,
          y: (y * sphereRadius) + (Math.random() - 0.5) * scatter,
          z: (z * sphereRadius) + (Math.random() - 0.5) * scatter
        };
      };

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        
        const heartPos = createHeartShape(i);
        heartPositions[i3] = heartPos.x;
        heartPositions[i3 + 1] = heartPos.y;
        heartPositions[i3 + 2] = heartPos.z;

        const spherePos = createSphereShape(i);
        spherePositions[i3] = spherePos.x;
        spherePositions[i3 + 1] = spherePos.y;
        spherePositions[i3 + 2] = spherePos.z;

        // Start with heart positions
        positions[i3] = heartPos.x;
        positions[i3 + 1] = heartPos.y;
        positions[i3 + 2] = heartPos.z;

        // Color palette
        const tNorm = i / particleCount;
        const colorVariant = Math.floor(tNorm * 4);
        
        switch (colorVariant) {
          case 0:
            colors[i3] = 0.1 + tNorm * 0.2;
            colors[i3 + 1] = 0.9 + tNorm * 0.1;
            colors[i3 + 2] = 1.0;
            break;
          case 1:
            colors[i3] = 1.0;
            colors[i3 + 1] = 0.1 + tNorm * 0.2;
            colors[i3 + 2] = 0.9 + tNorm * 0.1;
            break;
          case 2:
            colors[i3] = 0.2 + tNorm * 0.3;
            colors[i3 + 1] = 1.0;
            colors[i3 + 2] = 0.1 + tNorm * 0.2;
            break;
          default:
            colors[i3] = 0.9 + tNorm * 0.1;
            colors[i3 + 1] = 0.1 + tNorm * 0.2;
            colors[i3 + 2] = 1.0;
            break;
        }

        sizes[i] = 0.4 + Math.random() * 0.2;
      }

      particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      particles.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          animationIntensity: { value: 0 }
        },
        vertexShader: `
          attribute float size;
          varying vec3 vColor;
          varying float vAlpha;
          varying float vGlow;
          uniform float time;
          uniform float animationIntensity;
          
          void main() {
            vColor = color;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            
            float motion = animationIntensity;
            mvPosition.x += sin(time * 1.5 + position.y * 3.0) * 0.08 * motion;
            mvPosition.y += cos(time * 1.2 + position.x * 3.0) * 0.08 * motion;
            mvPosition.z += sin(time * 0.8 + position.z * 2.5) * 0.06 * motion;
            
            float wave1 = sin(time * 2.0 + position.x * 4.0) * 0.04 * motion;
            float wave2 = cos(time * 1.5 + position.z * 3.5) * 0.04 * motion;
            mvPosition.xyz += normalize(position) * (wave1 + wave2);
            
            float breathe = sin(time * 1.8) * 0.5 * motion + 1.0;
            float colorGlow = dot(color, vec3(0.299, 0.587, 0.114));
            vGlow = (1.0 + sin(time * 3.0 + position.x * 6.0) * 0.4 * motion) * breathe * (0.8 + colorGlow * 0.4);
            
            float pulseAlpha = 0.9 + sin(time * 3.5) * 0.2 * motion;
            vAlpha = pulseAlpha;
            
            float sizePulse = 1.0 + sin(time * 2.5 + position.y * 5.0) * 0.3 * motion;
            gl_PointSize = size * (50.0 / -mvPosition.z) * vGlow * sizePulse;
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
            
            float coreSize = 0.25;
            float alpha;
            
            if (r < coreSize) {
              alpha = vAlpha * 1.2;
            } else {
              float edgeAlpha = (0.5 - r) / (0.5 - coreSize);
              alpha = pow(edgeAlpha, 0.6) * vAlpha * 1.1;
            }
            
            vec3 glowColor = vColor * 1.2 * vGlow;
            gl_FragColor = vec4(glowColor, alpha);
          }
        `,
        blending: THREE.AdditiveBlending,
        depthTest: true,
        transparent: true,
        vertexColors: true
      });

      const particleSystem = new THREE.Points(particles, material);
      scene.add(particleSystem);
      camera.position.z = 4;

      sceneRef.current = {
        scene,
        camera,
        renderer,
        particles: particleSystem,
        material,
        animationId: null,
        isResting: false,
        morphProgress: 0,
        targetMorphProgress: 0,
        scale: 1,
        targetScale: 1,
        heartPositions,
        spherePositions,
        cleanup: () => {
          if (mountRef.current && renderer.domElement) {
            mountRef.current.removeChild(renderer.domElement);
          }
          renderer.dispose();
          particles.dispose();
          material.dispose();
        }
      };

      let time = 0;
      let currentIntensity = 0;
      
      const animate = () => {
        if (!sceneRef.current) return;
        
        time += 0.015;
        
        // Smoothly transition animation intensity
        const targetIntensity = sceneRef.current.isResting ? 1 : 0;
        currentIntensity += (targetIntensity - currentIntensity) * 0.05;
        
        // Smoothly transition morph progress (heart to sphere)
        sceneRef.current.morphProgress += (sceneRef.current.targetMorphProgress - sceneRef.current.morphProgress) * 0.03;
        
        // Smoothly transition scale
        sceneRef.current.scale += (sceneRef.current.targetScale - sceneRef.current.scale) * 0.05;
        
        sceneRef.current.material.uniforms.time.value = time;
        sceneRef.current.material.uniforms.animationIntensity.value = currentIntensity;

        // Morph between heart and sphere
        const positionAttribute = sceneRef.current.particles.geometry.getAttribute('position') as THREE.BufferAttribute;
        const currentPositions = positionAttribute.array as Float32Array;
        const t = sceneRef.current.morphProgress;

        for (let i = 0; i < particleCount; i++) {
          const i3 = i * 3;
          currentPositions[i3] = THREE.MathUtils.lerp(sceneRef.current.heartPositions[i3], sceneRef.current.spherePositions[i3], t);
          currentPositions[i3 + 1] = THREE.MathUtils.lerp(sceneRef.current.heartPositions[i3 + 1], sceneRef.current.spherePositions[i3 + 1], t);
          currentPositions[i3 + 2] = THREE.MathUtils.lerp(sceneRef.current.heartPositions[i3 + 2], sceneRef.current.spherePositions[i3 + 2], t);
        }
        positionAttribute.needsUpdate = true;

        // Apply scale
        sceneRef.current.particles.scale.setScalar(sceneRef.current.scale);

        // Rotation when resting
        if (sceneRef.current.isResting) {
          sceneRef.current.particles.rotation.y += 0.008 * currentIntensity;
          sceneRef.current.particles.rotation.x += 0.003 * currentIntensity;
          
          const wobbleX = Math.sin(time * 0.6) * 0.002 * currentIntensity;
          const wobbleZ = Math.cos(time * 0.45) * 0.0015 * currentIntensity;
          sceneRef.current.particles.rotation.x += wobbleX;
          sceneRef.current.particles.rotation.z += wobbleZ;
        }

        // Update renderer size based on scale
        const baseSize = 60;
        const scaledSize = baseSize * sceneRef.current.scale;
        sceneRef.current.renderer.setSize(scaledSize, scaledSize);

        sceneRef.current.renderer.render(sceneRef.current.scene, sceneRef.current.camera);
        sceneRef.current.animationId = requestAnimationFrame(animate);
      };
      
      animate();

      return () => {
        if (sceneRef.current?.animationId) {
          cancelAnimationFrame(sceneRef.current.animationId);
        }
        sceneRef.current?.cleanup();
      };

    } catch (error) {
      console.error('Failed to initialize CursorParticleAnimation:', error);
    }
  }, []);

  // Reset to heart on activity
  const resetToHeart = () => {
    if (sceneRef.current) {
      sceneRef.current.isResting = false;
      sceneRef.current.targetMorphProgress = 0;
      sceneRef.current.targetScale = 1;
    }
    
    if (restTimeoutRef.current) {
      clearTimeout(restTimeoutRef.current);
    }
    
    // After 500ms of no activity, morph to sphere and scale up
    restTimeoutRef.current = window.setTimeout(() => {
      if (sceneRef.current) {
        sceneRef.current.isResting = true;
        sceneRef.current.targetMorphProgress = 1;
        sceneRef.current.targetScale = 2.5;
      }
    }, 500);
  };

  // Cursor tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorRef.current.targetX = e.clientX;
      cursorRef.current.targetY = e.clientY;
      resetToHeart();
    };

    const handleScroll = () => {
      resetToHeart();
    };

    // Smooth cursor following
    const updateCursorPosition = () => {
      const lerp = 0.15;
      cursorRef.current.x += (cursorRef.current.targetX - cursorRef.current.x) * lerp;
      cursorRef.current.y += (cursorRef.current.targetY - cursorRef.current.y) * lerp;
      
      if (mountRef.current) {
        mountRef.current.style.left = `${cursorRef.current.x}px`;
        mountRef.current.style.top = `${cursorRef.current.y}px`;
      }
      
      requestAnimationFrame(updateCursorPosition);
    };
    
    updateCursorPosition();
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      if (restTimeoutRef.current) {
        clearTimeout(restTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="fixed pointer-events-none z-[9999]"
      style={{
        width: '60px',
        height: '60px',
        transform: 'translate(-50%, -50%)',
        mixBlendMode: 'screen'
      }}
    />
  );
};

export default CursorParticleAnimation;
