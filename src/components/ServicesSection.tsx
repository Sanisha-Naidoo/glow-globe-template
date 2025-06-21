import { useRef, useEffect } from 'react';
import { useSplitTransition } from '../hooks/useSplitTransition';
import { useCinematicScroll } from '../hooks/useCinematicScroll';
import { useHorizontalScroll } from '../hooks/useHorizontalScroll';
import HorizontalScrollIndicator from './HorizontalScrollIndicator';

const ServicesSection = () => {
  const sectionRef = useSplitTransition({ direction: 'left', triggerPoint: 0.1 });
  const horizontalScrollRef = useHorizontalScroll({ scrollSpeed: 1 });
  const cardsRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const { subscribeToScroll } = useCinematicScroll();

  const services = [
    {
      title: "Motion Design",
      description: "Crafting fluid, cinematic animations that bring interfaces to life with purposeful movement and timing.",
      capabilities: ["WebGL Shaders", "CSS Animations", "Lottie Integration", "Particle Systems"],
      focus: "Visual Storytelling"
    },
    {
      title: "Interactive Experiences",
      description: "Building immersive digital environments that respond intuitively to user input and behavior.",
      capabilities: ["Gesture Recognition", "Voice Control", "Eye Tracking", "Haptic Feedback"],
      focus: "Human-Computer Interface"
    },
    {
      title: "Data Visualization",
      description: "Transforming complex datasets into beautiful, explorable visual narratives that reveal insights.",
      capabilities: ["D3.js Mastery", "Real-time Charts", "3D Plotting", "Interactive Maps"],
      focus: "Information Design"
    },
    {
      title: "Creative Technology",
      description: "Pushing the boundaries of what's possible with emerging technologies and experimental approaches.",
      capabilities: ["AI Integration", "AR/VR Development", "IoT Connectivity", "Machine Learning"],
      focus: "Innovation Lab"
    },
    {
      title: "Performance Optimization",
      description: "Ensuring every interaction feels instantaneous through advanced optimization and rendering techniques.",
      capabilities: ["GPU Acceleration", "Bundle Optimization", "CDN Strategy", "Core Web Vitals"],
      focus: "Technical Excellence"
    },
    {
      title: "Brand Expression",
      description: "Translating brand identity into cohesive digital experiences that resonate emotionally with users.",
      capabilities: ["Design Systems", "Brand Guidelines", "Accessibility", "Multi-platform"],
      focus: "Strategic Design"
    }
  ];

  useEffect(() => {
    const unsubscribe = subscribeToScroll((progress) => {
      // Enhanced parallax for services section
      if (parallaxRef.current) {
        const servicesProgress = Math.max(0, Math.min(1, (progress - 0.3) * 2));
        const translateY = -servicesProgress * 25;
        const scale = 1 - servicesProgress * 0.03;
        
        parallaxRef.current.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`;
      }

      // Enhanced card animations
      if (cardsRef.current) {
        const cards = cardsRef.current.children;
        Array.from(cards).forEach((card, index) => {
          const element = card as HTMLElement;
          const delay = index * 0.03;
          const cardProgress = Math.max(0, Math.min(1, (progress - 0.4 - delay) * 2));
          
          const scale = 0.95 + (cardProgress * 0.05);
          const opacity = cardProgress;
          const translateY = (1 - cardProgress) * 20;
          
          element.style.transform = `scale(${scale}) translateY(${translateY}px)`;
          element.style.opacity = opacity.toString();
        });
      }
    });

    return unsubscribe;
  }, [subscribeToScroll]);

  return (
    <section 
      id="services"
      ref={parallaxRef}
      className="min-h-screen py-32 relative bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950"
      style={{ willChange: 'transform' }}
    >
      <div className="max-w-7xl mx-auto px-8">
        <div 
          ref={sectionRef}
          className="mb-16"
          style={{ willChange: 'transform, opacity' }}
        >
          <h2 className="text-7xl md:text-8xl font-extralight text-white mb-12 tracking-[0.05em]">
            Services
          </h2>
          <div className="w-16 h-px bg-gradient-to-r from-slate-200 to-transparent mb-8"></div>
          <p className="text-xl text-slate-100 max-w-3xl font-extralight leading-[1.8] tracking-wide">
            Comprehensive digital solutions that blend technical expertise 
            with creative vision to deliver exceptional user experiences.
          </p>
        </div>

        <div className="relative">
          <div 
            ref={horizontalScrollRef}
            className="flex gap-8 overflow-x-auto scrollbar-hide pb-8 scroll-smooth"
            style={{ 
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            <div 
              ref={cardsRef}
              className="flex gap-8"
            >
              {services.map((service, index) => (
                <div
                  key={index}
                  className="group relative opacity-0 flex-shrink-0 w-80"
                  style={{ willChange: 'transform, opacity' }}
                >
                  <div className="relative p-8 h-96 backdrop-blur-2xl bg-gradient-to-br from-slate-700/25 to-slate-600/15 border border-slate-500/30 rounded-sm hover:border-slate-400/50 transition-all duration-700 ease-out">
                    
                    <div className="mb-6">
                      <span className="text-xs font-extralight tracking-[0.3em] text-blue-200 uppercase">
                        {service.focus}
                      </span>
                    </div>
                    
                    <div className="space-y-6 mb-8">
                      <h3 className="text-2xl font-extralight text-white group-hover:text-slate-50 transition-colors duration-500 tracking-[0.05em]">
                        {service.title}
                      </h3>
                      
                      <p className="text-slate-100 leading-[1.7] font-extralight text-sm tracking-wide">
                        {service.description}
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      {service.capabilities.map((capability, capIndex) => (
                        <div key={capIndex} className="flex items-center space-x-3">
                          <div className="w-1 h-1 bg-blue-300 rounded-full"></div>
                          <span className="text-xs text-slate-200 font-extralight tracking-wide">
                            {capability}
                          </span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="absolute bottom-6 left-8 flex items-center space-x-2 text-slate-200 group-hover:text-white transition-colors duration-500">
                      <div className="w-4 h-px bg-gradient-to-r from-blue-300 to-transparent group-hover:w-8 transition-all duration-500"></div>
                    </div>
                    
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-100/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-sm"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <HorizontalScrollIndicator containerRef={horizontalScrollRef} />
          
          <div className="absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-slate-950 to-transparent pointer-events-none z-10"></div>
          <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-slate-950 to-transparent pointer-events-none z-10"></div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
