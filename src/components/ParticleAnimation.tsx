
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

    // Refined particle system - more sophisticated and subtle
    const particleCount = 2000;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const velocities = new Float32Array(particleCount * 3);

    // Create organic particle distribution
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Organic distribution instead of heart shape
      const radius = Math.random() * 3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);

      // Refined color palette - deep teal to soft blue
      const colorVariation = Math.random();
      colors[i3] = 0.1 + colorVariation * 0.3;     // R - minimal red
      colors[i3 + 1] = 0.4 + colorVariation * 0.4; // G - teal/cyan
      colors[i3 + 2] = 0.7 + colorVariation * 0.3; // B - blue dominant

      sizes[i] = Math.random() * 1.5 + 0.5; // Smaller, more subtle particles
      
      // Gentle velocities for organic movement
      velocities[i3] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.02;
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particles.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    // Sophisticated shader material
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        mouse: { value: new THREE.Vector2() }
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        varying float vAlpha;
        uniform float time;
        uniform vec2 mouse;
        
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          
          // Subtle mouse interaction
          vec2 mouseEffect = mouse * 0.05;
          float distance = length(position.xy);
          mvPosition.xy += mouseEffect * (1.0 / (1.0 + distance));
          
          // Organic floating motion
          mvPosition.x += sin(time * 0.5 + position.y * 0.1) * 0.1;
          mvPosition.y += cos(time * 0.3 + position.x * 0.1) * 0.1;
          
          // Distance-based alpha for depth
          vAlpha = 1.0 - (distance * 0.15);
          vAlpha = clamp(vAlpha, 0.1, 0.8);
          
          gl_PointSize = size * (200.0 / -mvPosition.z);
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
          
          // Soft glow effect
          vec3 finalColor = vColor + vec3(0.1, 0.2, 0.3) * (1.0 - alpha);
          gl_FragColor = vec4(finalColor, alpha * 0.6);
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

    // Mouse movement tracking
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    document.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    let time = 0;
    const animate = () => {
      time += 0.005;
      
      if (material.uniforms) {
        material.uniforms.time.value = time;
        material.uniforms.mouse.value.set(mouseRef.current.x, mouseRef.current.y);
      }

      const positionAttribute = particles.getAttribute('position') as THREE.BufferAttribute;
      const positions = positionAttribute.array as Float32Array;

      // Organic particle movement
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        
        // Subtle drift
        positions[i3] += velocities[i3];
        positions[i3 + 1] += velocities[i3 + 1];
        positions[i3 + 2] += velocities[i3 + 2];
        
        // Boundary wrapping for continuous flow
        if (Math.abs(positions[i3]) > 4) velocities[i3] *= -1;
        if (Math.abs(positions[i3 + 1]) > 4) velocities[i3 + 1] *= -1;
        if (Math.abs(positions[i3 + 2]) > 4) velocities[i3 + 2] *= -1;
      }

      positionAttribute.needsUpdate = true;
      
      // Subtle camera movement
      camera.position.x = Math.sin(time * 0.2) * 0.05;
      camera.position.y = Math.cos(time * 0.15) * 0.05;

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
