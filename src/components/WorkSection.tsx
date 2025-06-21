
import { useRef, useEffect } from 'react';
import { useSplitTransition } from '../hooks/useSplitTransition';
import { useCinematicScroll } from '../hooks/useCinematicScroll';
import { useHorizontalScroll } from '../hooks/useHorizontalScroll';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import HorizontalScrollIndicator from './HorizontalScrollIndicator';

interface WorkSectionProps {
  onEnterGallery: () => void;
}

const WorkSection = ({ onEnterGallery }: WorkSectionProps) => {
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
      className="min-h-screen py-32 relative bg-gradient-to-b from-slate-900 via-slate-950 to-slate-800"
      style={{ willChange: 'transform, opacity' }}
    >
      <div className="max-w-7xl mx-auto px-8">
        <div className="mb-16">
          <h2 className="text-7xl md:text-8xl font-normal text-white mb-12 tracking-wide leading-tight">
            Projects
          </h2>
          <div className="w-20 h-px bg-gradient-to-r from-white to-transparent mb-8"></div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <p className="text-xl text-gray-100 max-w-3xl font-normal leading-relaxed tracking-wide">
              Selected works that push the boundaries of digital interaction, 
              each crafted with cinematic precision and innovative technology.
            </p>
            <Button
              onClick={onEnterGallery}
              className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white border-2 border-blue-400/70 backdrop-blur-sm transition-all duration-500 group flex-shrink-0 text-base font-medium px-8 py-4"
              size="lg"
            >
              <span className="font-normal tracking-wide">Explore Gallery</span>
              <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </div>
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
                  <div className="relative p-8 h-80 backdrop-blur-3xl bg-gradient-to-br from-slate-700/40 to-slate-600/30 border-2 border-slate-400/50 rounded-sm hover:border-blue-400/70 transition-all duration-1000 ease-out transform hover:scale-[1.02] hover:-translate-y-2 cursor-pointer">
                    
                    <div className="flex justify-between items-start mb-6">
                      <span className="text-sm font-normal tracking-widest text-blue-200 uppercase">
                        {project.approach}
                      </span>
                      <span className="text-sm font-normal tracking-wider text-gray-100">
                        {project.year}
                      </span>
                    </div>
                    
                    <div className="space-y-4 mb-8">
                      <h3 className="text-xl font-medium text-white group-hover:text-white transition-colors duration-700 tracking-wide">
                        {project.title}
                      </h3>
                      
                      <p className="text-gray-100 leading-relaxed font-normal text-base tracking-wide">
                        {project.description}
                      </p>
                    </div>
                    
                    <div className="absolute bottom-6 left-8 flex items-center space-x-3 text-white group-hover:text-gray-100 transition-colors duration-700">
                      <span className="text-sm font-normal tracking-wider uppercase">Explore</span>
                      <div className="w-8 h-px bg-gradient-to-r from-blue-300 to-transparent group-hover:w-16 transition-all duration-700"></div>
                    </div>

                    <div className="absolute top-4 right-4 w-2 h-2 bg-blue-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-100/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-sm"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <HorizontalScrollIndicator containerRef={horizontalScrollRef} />
          
          {/* Fade edges */}
          <div className="absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-slate-800 to-transparent pointer-events-none z-10"></div>
          <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-slate-800 to-transparent pointer-events-none z-10"></div>
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
