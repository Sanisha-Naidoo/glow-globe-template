
import { useRef, useEffect } from 'react';
import { useSplitTransition } from '../hooks/useSplitTransition';
import { useCinematicScroll } from '../hooks/useCinematicScroll';

const WorkSection = () => {
  const sectionRef = useSplitTransition({ direction: 'right', triggerPoint: 0.1 });
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
    }
  ];

  useEffect(() => {
    const unsubscribe = subscribeToScroll((progress) => {
      if (cardsRef.current) {
        const cards = cardsRef.current.children;
        Array.from(cards).forEach((card, index) => {
          const element = card as HTMLElement;
          const delay = index * 0.1;
          const cardProgress = Math.max(0, Math.min(1, (progress - 0.3 - delay) * 2));
          
          const translateX = (1 - cardProgress) * 50;
          const rotateY = (1 - cardProgress) * 15;
          const opacity = cardProgress;
          
          element.style.transform = `translate3d(-${translateX}px, 0, 0) rotateY(${rotateY}deg)`;
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
        <div className="mb-32">
          <h2 className="text-7xl md:text-8xl font-extralight text-white mb-12 tracking-[0.05em]">
            Projects
          </h2>
          <div className="w-16 h-px bg-gradient-to-r from-slate-300 to-transparent mb-16"></div>
          <p className="text-xl text-slate-200 max-w-3xl font-extralight leading-[1.8] tracking-wide">
            Selected works that push the boundaries of digital interaction, 
            each crafted with cinematic precision and innovative technology.
          </p>
        </div>

        <div 
          ref={cardsRef}
          className="grid lg:grid-cols-2 gap-8 perspective-1000"
        >
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative opacity-0"
              style={{ 
                willChange: 'transform, opacity',
                transformStyle: 'preserve-3d'
              }}
            >
              <div className="relative p-12 h-full backdrop-blur-3xl bg-gradient-to-br from-slate-800/8 to-slate-600/4 border border-slate-600/15 rounded-sm hover:border-slate-500/25 transition-all duration-1000 ease-out transform hover:scale-[1.02] hover:-translate-y-2">
                
                <div className="flex justify-between items-start mb-8">
                  <span className="text-xs font-extralight tracking-[0.3em] text-slate-400 uppercase">
                    {project.approach}
                  </span>
                  <span className="text-xs font-extralight tracking-[0.2em] text-slate-500">
                    {project.year}
                  </span>
                </div>
                
                <div className="space-y-6 mb-12">
                  <h3 className="text-2xl font-extralight text-white group-hover:text-slate-100 transition-colors duration-700 tracking-[0.05em]">
                    {project.title}
                  </h3>
                  
                  <p className="text-slate-300 leading-[1.8] font-extralight text-base tracking-wide">
                    {project.description}
                  </p>
                </div>
                
                <div className="flex items-center space-x-3 text-slate-400 group-hover:text-slate-200 transition-colors duration-700">
                  <span className="text-xs font-extralight tracking-[0.2em] uppercase">Explore</span>
                  <div className="w-8 h-px bg-gradient-to-r from-slate-400 to-transparent group-hover:w-16 transition-all duration-700"></div>
                </div>

                <div className="absolute top-6 right-6 w-1 h-1 bg-slate-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                
                {/* 3D hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-200/2 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-sm"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
