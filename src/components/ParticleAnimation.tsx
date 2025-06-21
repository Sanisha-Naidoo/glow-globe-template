
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ParticleAnimation = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Particle system
    const particleCount = 1000;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    // Create heart shape initially
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Heart equation
      const t = (i / particleCount) * Math.PI * 2;
      const x = 16 * Math.sin(t) ** 3;
      const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
      
      positions[i3] = x * 0.02 + (Math.random() - 0.5) * 0.1;
      positions[i3 + 1] = y * 0.02 + (Math.random() - 0.5) * 0.1;
      positions[i3 + 2] = (Math.random() - 0.5) * 2;

      // Colors - gradient from purple to pink
      colors[i3] = 0.8 + Math.random() * 0.2;     // R
      colors[i3 + 1] = 0.2 + Math.random() * 0.3; // G  
      colors[i3 + 2] = 0.8 + Math.random() * 0.2; // B

      sizes[i] = Math.random() * 3 + 1;
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particles.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    // Particle material
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        mouse: { value: new THREE.Vector2() }
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        uniform float time;
        uniform vec2 mouse;
        
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          
          // Mouse interaction
          vec2 mouseEffect = mouse * 0.1;
          mvPosition.xy += mouseEffect * (1.0 - length(position.xy) * 0.1);
          
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        
        void main() {
          float r = distance(gl_PointCoord, vec2(0.5, 0.5));
          if (r > 0.5) discard;
          
          float alpha = 1.0 - r * 2.0;
          alpha = pow(alpha, 2.0);
          
          gl_FragColor = vec4(vColor, alpha * 0.8);
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

    // Animation variables
    let animationPhase = 0; // 0: heart, 1: transition, 2: globe
    let phaseTimer = 0;

    // Mouse movement
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    document.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      phaseTimer += 0.01;
      
      if (material.uniforms) {
        material.uniforms.time.value = phaseTimer;
        material.uniforms.mouse.value.set(mouseRef.current.x, mouseRef.current.y);
      }

      const positionAttribute = particles.getAttribute('position') as THREE.BufferAttribute;
      const positions = positionAttribute.array as Float32Array;

      // Transition from heart to globe after 4 seconds
      if (phaseTimer > 4 && animationPhase === 0) {
        animationPhase = 1;
      }

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        
        if (animationPhase === 1) {
          // Transition to globe
          const transitionProgress = Math.min((phaseTimer - 4) / 2, 1);
          
          // Globe coordinates
          const phi = Math.acos(-1 + (2 * i) / particleCount);
          const theta = Math.sqrt(particleCount * Math.PI) * phi;
          
          const globeX = Math.cos(theta) * Math.sin(phi) * 1.5;
          const globeY = Math.sin(theta) * Math.sin(phi) * 1.5;
          const globeZ = Math.cos(phi) * 1.5;

          // Current heart position
          const t = (i / particleCount) * Math.PI * 2;
          const heartX = 16 * Math.sin(t) ** 3 * 0.02;
          const heartY = (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * 0.02;

          // Interpolate
          positions[i3] = heartX + (globeX - heartX) * transitionProgress;
          positions[i3 + 1] = heartY + (globeY - heartY) * transitionProgress;
          positions[i3 + 2] = positions[i3 + 2] + (globeZ - positions[i3 + 2]) * transitionProgress;

          if (transitionProgress >= 1) {
            animationPhase = 2;
          }
        } else if (animationPhase === 2) {
          // Rotate globe
          const rotationSpeed = phaseTimer * 0.5;
          const radius = 1.5;
          
          const phi = Math.acos(-1 + (2 * i) / particleCount);
          const theta = Math.sqrt(particleCount * Math.PI) * phi + rotationSpeed;
          
          positions[i3] = Math.cos(theta) * Math.sin(phi) * radius;
          positions[i3 + 1] = Math.sin(theta) * Math.sin(phi) * radius;
          positions[i3 + 2] = Math.cos(phi) * radius;
        }
      }

      positionAttribute.needsUpdate = true;
      
      // Gentle camera movement
      camera.position.x = Math.sin(phaseTimer * 0.3) * 0.1;
      camera.position.y = Math.cos(phaseTimer * 0.2) * 0.1;

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

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0" />;
};

export default ParticleAnimation;
