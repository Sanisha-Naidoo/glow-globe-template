
import { useRef, useEffect } from 'react';
import { useSplitTransition } from '../hooks/useSplitTransition';
import { useCinematicScroll } from '../hooks/useCinematicScroll';
import { useHorizontalScroll } from '../hooks/useHorizontalScroll';
import HorizontalScrollIndicator from './HorizontalScrollIndicator';

const WorkSection = () => {
  const sectionRef = useSplitTransition({ direction: 'right', triggerPoint: 0.1 });
  const horizontalScrollRef = useHorizontalScroll({ scrollSpeed: 1.2 });
  const cardsRef = useRef<HTMLDivElement>(null);
  const { subscribeToScroll } = useCinematicScroll();

  const projects = [
    {
      title: "Kinetic Architecture",
      description: "Interactive installation exploring the relationship between physical space and digital consciousness through real-time motion capture.",
      approach: "Creative Technology",
      year: "2024"
    },
    {
      title: "Neural Pathways",
      description: "Data visualization platform that transforms complex neural network behaviors into intuitive, explorable landscapes.",
      approach: "Data Visualization", 
      year: "2024"
    },
    {
      title: "Temporal Narratives",
      description: "Immersive storytelling platform using WebGL and spatial audio to create non-linear narrative experiences.",
      approach: "Interactive Media",
      year: "2023"
    },
    {
      title: "Quantum Interfaces",
      description: "Research project investigating quantum computing concepts through interactive visual metaphors and gestural interfaces.",
      approach: "Research & Development",
      year: "2023"
    },
    {
      title: "Biometric Gardens",
      description: "Living data installation that responds to visitors' heartbeats and breathing patterns, creating unique digital ecosystems.",
      approach: "Bio-Interactive Design",
      year: "2024"
    },
    {
      title: "Sonic Architectures",
      description: "Spatial audio environments that transform architectural spaces into immersive sound sculptures using AI composition.",
      approach: "Audio-Visual",
      year: "2023"
    },
    {
      title: "Memory Fragments",
      description: "AR experience reconstructing personal memories through machine learning interpretation of photographs and objects.",
      approach: "Augmented Reality",
      year: "2024"
    },
    {
      title: "Digital Organisms",
      description: "Self-evolving digital creatures that learn and adapt based on user interactions across multiple installation sites.",
      approach: "Artificial Life",
      year: "2023"
    }
  ];

  useEffect(() => {
    const unsubscribe = subscribeToScroll((progress) => {
      if (cardsRef.current) {
        const cards = cardsRef.current.children;
        Array.from(cards).forEach((card, index) => {
          const element = card as HTMLElement;
          const delay = index * 0.05;
          const cardProgress = Math.max(0, Math.min(1, (progress - 0.3 - delay) * 2));
          
          const translateY = (1 - cardProgress) * 30;
          const opacity = cardProgress;
          
          element.style.transform = `translate3d(0, ${translateY}px, 0)`;
          element.style.opacity = opacity.toString();
        });
      }
    });

    return unsubscribe;
  }, [subscribeToScroll]);

  return (
    <section 
      id="work" 
      ref={sectionRef}
      className="min-h-screen py-32 relative bg-gradient-to-b from-slate-900/30 to-slate-950/50"
      style={{ willChange: 'transform, opacity' }}
    >
      <div className="max-w-7xl mx-auto px-8">
        <div className="mb-16">
          <h2 className="text-7xl md:text-8xl font-extralight text-white mb-12 tracking-[0.05em]">
            Projects
          </h2>
          <div className="w-16 h-px bg-gradient-to-r from-slate-300 to-transparent mb-8"></div>
          <p className="text-xl text-slate-200 max-w-3xl font-extralight leading-[1.8] tracking-wide">
            Selected works that push the boundaries of digital interaction, 
            each crafted with cinematic precision and innovative technology.
          </p>
        </div>

        <div className="relative">
          <div 
            ref={horizontalScrollRef}
            className="flex gap-8 overflow-x-auto scrollbar-hide pb-8 scroll-smooth"
            style={{ 
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitScrollbar: { display: 'none' }
            }}
          >
            <div 
              ref={cardsRef}
              className="flex gap-8 perspective-1000"
            >
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="group relative opacity-0 flex-shrink-0 w-96"
                  style={{ 
                    willChange: 'transform, opacity',
                    transformStyle: 'preserve-3d'
                  }}
                >
                  <div className="relative p-8 h-80 backdrop-blur-3xl bg-gradient-to-br from-slate-800/8 to-slate-600/4 border border-slate-600/15 rounded-sm hover:border-slate-500/25 transition-all duration-1000 ease-out transform hover:scale-[1.02] hover:-translate-y-2">
                    
                    <div className="flex justify-between items-start mb-6">
                      <span className="text-xs font-extralight tracking-[0.3em] text-slate-400 uppercase">
                        {project.approach}
                      </span>
                      <span className="text-xs font-extralight tracking-[0.2em] text-slate-500">
                        {project.year}
                      </span>
                    </div>
                    
                    <div className="space-y-4 mb-8">
                      <h3 className="text-xl font-extralight text-white group-hover:text-slate-100 transition-colors duration-700 tracking-[0.05em]">
                        {project.title}
                      </h3>
                      
                      <p className="text-slate-300 leading-[1.6] font-extralight text-sm tracking-wide">
                        {project.description}
                      </p>
                    </div>
                    
                    <div className="absolute bottom-6 left-8 flex items-center space-x-3 text-slate-400 group-hover:text-slate-200 transition-colors duration-700">
                      <span className="text-xs font-extralight tracking-[0.2em] uppercase">Explore</span>
                      <div className="w-6 h-px bg-gradient-to-r from-slate-400 to-transparent group-hover:w-12 transition-all duration-700"></div>
                    </div>

                    <div className="absolute top-4 right-4 w-1 h-1 bg-slate-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-200/2 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-sm"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <HorizontalScrollIndicator containerRef={horizontalScrollRef} />
          
          {/* Fade edges */}
          <div className="absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-slate-950/50 to-transparent pointer-events-none z-10"></div>
          <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-slate-950/50 to-transparent pointer-events-none z-10"></div>
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
