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
    restingTime: number;
    cleanup: () => void;
  } | null>(null);
  
  const cursorRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const lastMoveRef = useRef(Date.now());
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
      
      const size = 80; // Cursor size
      renderer.setSize(size, size);
      renderer.setClearColor(0x000000, 0);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      mountRef.current.appendChild(renderer.domElement);

      const particleCount = 2000;
      const particles = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      const sizes = new Float32Array(particleCount);

      // Create heart shape
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const t = (i / particleCount) * Math.PI * 4;
        const x = 16 * Math.pow(Math.sin(t), 3);
        const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
        const z = Math.sin(t * 1.5) * 3;
        
        const noise = (Math.random() - 0.5) * 0.1;
        positions[i3] = (x + noise) * 0.06;
        positions[i3 + 1] = (y + noise) * 0.06;
        positions[i3 + 2] = (z + noise) * 0.06;

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
            
            // Animate only when resting (animationIntensity > 0)
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
        restingTime: 0,
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
        
        sceneRef.current.material.uniforms.time.value = time;
        sceneRef.current.material.uniforms.animationIntensity.value = currentIntensity;

        // Rotation when resting
        if (sceneRef.current.isResting) {
          sceneRef.current.particles.rotation.y += 0.008 * currentIntensity;
          sceneRef.current.particles.rotation.x += 0.003 * currentIntensity;
          
          const wobbleX = Math.sin(time * 0.6) * 0.002 * currentIntensity;
          const wobbleZ = Math.cos(time * 0.45) * 0.0015 * currentIntensity;
          sceneRef.current.particles.rotation.x += wobbleX;
          sceneRef.current.particles.rotation.z += wobbleZ;
        }

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

  // Cursor tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorRef.current.targetX = e.clientX;
      cursorRef.current.targetY = e.clientY;
      lastMoveRef.current = Date.now();
      
      // Mark as not resting
      if (sceneRef.current) {
        sceneRef.current.isResting = false;
      }
      
      // Clear existing timeout
      if (restTimeoutRef.current) {
        clearTimeout(restTimeoutRef.current);
      }
      
      // Set new timeout to start animation after 500ms of no movement
      restTimeoutRef.current = window.setTimeout(() => {
        if (sceneRef.current) {
          sceneRef.current.isResting = true;
        }
      }, 500);
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
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
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
        width: '80px',
        height: '80px',
        transform: 'translate(-50%, -50%)',
        mixBlendMode: 'screen'
      }}
    />
  );
};

export default CursorParticleAnimation;
