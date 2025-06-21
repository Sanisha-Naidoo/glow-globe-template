
import { useRef, useEffect } from 'react';
import { ArrowUp, ArrowLeft, ArrowRight } from 'lucide-react';

interface HorizontalWorkSectionProps {
  horizontalProgress: number;
  onReturnToTop: () => void;
}

const HorizontalWorkSection = ({ horizontalProgress, onReturnToTop }: HorizontalWorkSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const currentScreenRef = useRef(0);

  const workScreens = [
    {
      title: "Featured Projects",
      subtitle: "Selected Works",
      content: "Explore our most impactful digital experiences crafted with cinematic precision and innovative technology.",
      projects: ["Kinetic Architecture", "Neural Pathways", "Temporal Narratives"]
    },
    {
      title: "Creative Process",
      subtitle: "Our Approach",
      content: "From concept to execution, we blend artistic vision with technical mastery to create unforgettable experiences.",
      projects: ["Research & Discovery", "Concept Development", "Technical Implementation"]
    },
    {
      title: "Case Studies",
      subtitle: "Deep Dive",
      content: "Detailed exploration of our most challenging and rewarding projects, showcasing problem-solving and innovation.",
      projects: ["Quantum Interfaces", "Biometric Gardens", "Sonic Architectures"]
    },
    {
      title: "Results & Impact",
      subtitle: "Outcomes",
      content: "Measuring success through user engagement, industry recognition, and transformative digital experiences.",
      projects: ["Memory Fragments", "Digital Organisms", "Interactive Installations"]
    }
  ];

  useEffect(() => {
    if (containerRef.current) {
      // Transform the container horizontally with smooth animation
      const translateX = -horizontalProgress * 100;
      containerRef.current.style.transform = `translate3d(${translateX}%, 0, 0)`;
      
      // Update current screen based on progress
      currentScreenRef.current = Math.floor(horizontalProgress * workScreens.length);
    }
  }, [horizontalProgress, workScreens.length]);

  return (
    <section 
      className="w-full h-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 overflow-hidden relative"
      style={{ willChange: 'transform' }}
    >
      {/* Return to Top Button */}
      <button
        onClick={onReturnToTop}
        className="fixed top-8 left-8 z-30 p-3 backdrop-blur-2xl bg-slate-800/20 border border-slate-600/30 rounded-full text-slate-300 hover:text-white hover:border-slate-500/50 transition-all duration-300 group"
        title="Return to top (or press ESC)"
      >
        <ArrowUp size={20} className="group-hover:-translate-y-1 transition-transform duration-300" />
      </button>

      {/* Navigation Instructions */}
      <div className="fixed top-8 right-8 z-30 text-right">
        <div className="backdrop-blur-2xl bg-slate-800/10 border border-slate-600/20 rounded-lg p-4 text-slate-400 text-xs">
          <div className="flex items-center gap-2 mb-2">
            <ArrowUp size={14} />
            <span>Scroll up or press ESC to return</span>
          </div>
          <div className="flex items-center gap-2">
            <ArrowLeft size={14} />
            <ArrowRight size={14} />
            <span>Scroll to navigate sections</span>
          </div>
        </div>
      </div>

      <div 
        ref={containerRef}
        className="flex h-full w-[400%] transition-transform duration-100 ease-out"
        style={{ willChange: 'transform' }}
      >
        {workScreens.map((screen, index) => (
          <div
            key={index}
            className="w-1/4 h-full flex items-center justify-center relative px-16"
          >
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-8">
                <span className="text-xs font-extralight tracking-[0.3em] text-slate-400 uppercase block mb-4">
                  {screen.subtitle}
                </span>
                <h2 className="text-6xl md:text-8xl font-extralight text-white mb-8 tracking-[0.05em]">
                  {screen.title}
                </h2>
                <div className="w-16 h-px bg-gradient-to-r from-slate-300 to-transparent mx-auto mb-8"></div>
              </div>

              <p className="text-xl text-slate-200 mb-16 font-extralight leading-[1.8] tracking-wide max-w-3xl mx-auto">
                {screen.content}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {screen.projects.map((project, projectIndex) => (
                  <div
                    key={projectIndex}
                    className="group relative p-8 backdrop-blur-3xl bg-gradient-to-br from-slate-800/8 to-slate-600/4 border border-slate-600/15 rounded-sm hover:border-slate-500/25 transition-all duration-1000 ease-out transform hover:scale-[1.02] hover:-translate-y-2"
                  >
                    <h3 className="text-lg font-extralight text-white group-hover:text-slate-100 transition-colors duration-700 tracking-[0.05em] mb-4">
                      {project}
                    </h3>
                    
                    <div className="flex items-center space-x-3 text-slate-400 group-hover:text-slate-200 transition-colors duration-700">
                      <span className="text-xs font-extralight tracking-[0.2em] uppercase">Explore</span>
                      <div className="w-6 h-px bg-gradient-to-r from-slate-400 to-transparent group-hover:w-12 transition-all duration-700"></div>
                    </div>

                    <div className="absolute top-4 right-4 w-1 h-1 bg-slate-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-200/2 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-sm"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Screen indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
              <div className="flex space-x-2">
                {workScreens.map((_, dotIndex) => (
                  <div
                    key={dotIndex}
                    className={`w-1 h-1 rounded-full transition-all duration-500 ${
                      dotIndex === index ? 'bg-white w-8' : 'bg-slate-600'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced Progress indicator */}
      <div className="absolute top-1/2 right-8 transform -translate-y-1/2 z-20">
        <div className="flex flex-col items-center space-y-3 text-slate-400">
          <span className="text-xs font-extralight tracking-[0.3em] uppercase writing-mode-vertical">Progress</span>
          <div className="w-px h-32 bg-slate-600 relative">
            <div 
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-slate-300 to-slate-500 transition-all duration-300"
              style={{ height: `${(currentScreenRef.current + 1) * 25}%` }}
            />
          </div>
          <span className="text-xs text-slate-500">{currentScreenRef.current + 1}/4</span>
        </div>
      </div>
    </section>
  );
};

export default HorizontalWorkSection;
