
import { useRef, useEffect, useState } from 'react';
import { useSplitTransition } from '../hooks/useSplitTransition';
import { useCinematicScroll } from '../hooks/useCinematicScroll';
import { useHorizontalScroll } from '../hooks/useHorizontalScroll';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import HorizontalScrollIndicator from './HorizontalScrollIndicator';

const WorkSection = () => {
  const sectionRef = useSplitTransition({ direction: 'right', triggerPoint: 0.1 });
  const horizontalScrollRef = useHorizontalScroll({ scrollSpeed: 1.2 });
  const cardsRef = useRef<HTMLDivElement>(null);
  const { subscribeToScroll } = useCinematicScroll();
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const projects = [
    {
      title: "Kinetic Architecture",
      description: "Interactive installation exploring the relationship between physical space and digital consciousness through real-time motion capture.",
      approach: "Creative Technology",
      year: "2024",
      technologies: ["Three.js", "WebGL", "Motion Capture", "Real-time Processing"],
      details: "This groundbreaking installation transforms physical movement into digital art, creating an immersive environment where visitors become co-creators of the experience.",
      challenges: "Achieving real-time motion tracking with sub-10ms latency while maintaining visual fidelity across multiple projection surfaces.",
      results: "Featured at 3 international digital art festivals, 15,000+ visitors engaged, 94% positive feedback rating."
    },
    {
      title: "Neural Pathways",
      description: "Data visualization platform that transforms complex neural network behaviors into intuitive, explorable landscapes.",
      approach: "Data Visualization", 
      year: "2024",
      technologies: ["D3.js", "WebGL", "Machine Learning", "React"],
      details: "A revolutionary approach to understanding AI decision-making through interactive 3D visualizations that make complex neural networks accessible to researchers and educators.",
      challenges: "Rendering millions of data points in real-time while maintaining smooth user interactions and meaningful visual representations.",
      results: "Adopted by 12 research institutions, reduced neural network analysis time by 60%, published in 2 academic journals."
    },
    {
      title: "Temporal Narratives",
      description: "Immersive storytelling platform using WebGL and spatial audio to create non-linear narrative experiences.",
      approach: "Interactive Media",
      year: "2023",
      technologies: ["WebGL", "Spatial Audio", "WebXR", "Node.js"],
      details: "An innovative storytelling medium that allows users to navigate through time and space, experiencing narratives from multiple perspectives simultaneously.",
      challenges: "Synchronizing spatial audio with visual elements across different devices while maintaining narrative coherence in non-linear structures.",
      results: "Winner of 2 design awards, 25,000+ story interactions, featured in The Webby Awards."
    },
    {
      title: "Quantum Interfaces",
      description: "Research project investigating quantum computing concepts through interactive visual metaphors and gestural interfaces.",
      approach: "Research & Development",
      year: "2023",
      technologies: ["WebXR", "Gesture Recognition", "WebAssembly", "Quantum Simulation"],
      details: "Making quantum computing concepts accessible through intuitive hand gestures and visual metaphors, bridging the gap between complex physics and human understanding.",
      challenges: "Translating abstract quantum mechanics principles into tangible, interactive experiences while maintaining scientific accuracy.",
      results: "Collaboration with 3 universities, 5 research papers published, educational tool adopted by quantum physics courses."
    },
    {
      title: "Biometric Gardens",
      description: "Living data installation that responds to visitors' heartbeats and breathing patterns, creating unique digital ecosystems.",
      approach: "Bio-Interactive Design",
      year: "2024",
      technologies: ["Biometric Sensors", "Real-time Data", "Generative Art", "IoT"],
      details: "An installation that creates personalized digital gardens based on visitors' vital signs, where each heartbeat grows virtual flora and breathing patterns influence weather systems.",
      challenges: "Ensuring accurate biometric readings in noisy environments while creating meaningful visual correlations between biological and digital systems.",
      results: "Permanent installation in 2 museums, 8,000+ unique digital gardens created, featured in Wired Magazine."
    },
    {
      title: "Sonic Architectures",
      description: "Spatial audio environments that transform architectural spaces into immersive sound sculptures using AI composition.",
      approach: "Audio-Visual",
      year: "2023",
      technologies: ["AI Composition", "Spatial Audio", "WebAudio API", "Machine Learning"],
      details: "Transforming physical spaces into dynamic sound environments where architecture itself becomes an instrument, with AI composing unique soundscapes based on spatial acoustics.",
      challenges: "Mapping complex architectural acoustics to musical compositions while ensuring harmonious audio experiences for multiple simultaneous listeners.",
      results: "Installed in 4 architectural landmarks, 20+ hours of unique compositions generated daily, Sound Design Award recipient."
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
          const scale = 0.95 + (cardProgress * 0.05);
          
          element.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`;
        });
      }
    });

    return unsubscribe;
  }, [subscribeToScroll]);

  const handleCardToggle = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

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
          <p className="text-xl text-gray-100 max-w-3xl font-normal leading-relaxed tracking-wide">
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
              msOverflowStyle: 'none'
            }}
          >
            <div 
              ref={cardsRef}
              className="flex gap-8 perspective-1000"
            >
              {projects.map((project, index) => (
                <Collapsible
                  key={index}
                  open={expandedCard === index}
                  onOpenChange={() => handleCardToggle(index)}
                >
                  <div
                    className="group relative flex-shrink-0 w-96"
                    style={{ 
                      willChange: 'transform, opacity',
                      transformStyle: 'preserve-3d'
                    }}
                  >
                    <CollapsibleTrigger asChild>
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
                          <span className="text-sm font-normal tracking-wider uppercase">
                            {expandedCard === index ? 'Collapse' : 'Explore'}
                          </span>
                          <div className="flex items-center">
                            {expandedCard === index ? (
                              <ChevronUp size={16} className="transition-transform duration-300" />
                            ) : (
                              <ChevronDown size={16} className="transition-transform duration-300" />
                            )}
                          </div>
                        </div>

                        <div className="absolute top-4 right-4 w-2 h-2 bg-blue-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                        
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-sm"></div>
                      </div>
                    </CollapsibleTrigger>

                    <CollapsibleContent className="mt-4 overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                      <div className="backdrop-blur-3xl bg-gradient-to-br from-slate-700/30 to-slate-600/20 border-2 border-slate-500/30 rounded-sm p-6 space-y-6">
                        <div>
                          <h4 className="text-lg font-medium text-white mb-3 tracking-wide">Technologies</h4>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech, techIndex) => (
                              <span
                                key={techIndex}
                                className="px-3 py-1 text-xs font-normal tracking-wider bg-blue-500/20 border border-blue-400/30 rounded-full text-blue-200 uppercase"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-lg font-medium text-white mb-3 tracking-wide">Project Details</h4>
                          <p className="text-gray-100 leading-relaxed font-normal text-sm tracking-wide">
                            {project.details}
                          </p>
                        </div>

                        <div>
                          <h4 className="text-lg font-medium text-white mb-3 tracking-wide">Key Challenges</h4>
                          <p className="text-gray-100 leading-relaxed font-normal text-sm tracking-wide">
                            {project.challenges}
                          </p>
                        </div>

                        <div>
                          <h4 className="text-lg font-medium text-white mb-3 tracking-wide">Results & Impact</h4>
                          <p className="text-gray-100 leading-relaxed font-normal text-sm tracking-wide">
                            {project.results}
                          </p>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </div>
                </Collapsible>
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
