
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const WorkSection = () => {
  const sectionRef = useScrollAnimation();

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
      title: "Liminal Spaces",
      description: "Virtual reality experience exploring the boundaries between physical and digital presence in architectural contexts.",
      approach: "Spatial Computing",
      year: "2023"
    },
    {
      title: "Resonance Fields",
      description: "Generative audio-visual installation responding to environmental data through machine learning and procedural generation.",
      approach: "Generative Art",
      year: "2022"
    }
  ];

  return (
    <section 
      id="work" 
      ref={sectionRef}
      className="min-h-screen py-32 relative opacity-0 translate-y-8 transition-all duration-[1500ms] ease-out"
    >
      <div className="max-w-7xl mx-auto px-8">
        <div className="mb-32">
          <h2 className="text-7xl md:text-8xl font-extralight text-white mb-12 tracking-[0.05em]">
            Projects
          </h2>
          <div className="w-16 h-px bg-gradient-to-r from-slate-300 to-transparent mb-16"></div>
          <p className="text-xl text-slate-200 max-w-3xl font-extralight leading-[1.8] tracking-wide">
            Selected works that explore the boundaries between technology and human experience, 
            each project a meditation on possibility and craft.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative"
            >
              {/* Card container with refined glassmorphism */}
              <div className="relative p-12 h-full backdrop-blur-3xl bg-gradient-to-br from-slate-800/5 to-slate-600/5 border border-slate-600/10 rounded-sm hover:border-slate-500/20 transition-all duration-1000 ease-out">
                
                {/* Year and approach */}
                <div className="flex justify-between items-start mb-8">
                  <span className="text-xs font-extralight tracking-[0.3em] text-slate-400 uppercase">
                    {project.approach}
                  </span>
                  <span className="text-xs font-extralight tracking-[0.2em] text-slate-500">
                    {project.year}
                  </span>
                </div>
                
                {/* Content */}
                <div className="space-y-6 mb-12">
                  <h3 className="text-2xl font-extralight text-white group-hover:text-slate-100 transition-colors duration-700 tracking-[0.05em]">
                    {project.title}
                  </h3>
                  
                  <p className="text-slate-300 leading-[1.8] font-extralight text-base tracking-wide">
                    {project.description}
                  </p>
                </div>
                
                {/* Explore indicator */}
                <div className="flex items-center space-x-3 text-slate-400 group-hover:text-slate-200 transition-colors duration-700">
                  <span className="text-xs font-extralight tracking-[0.2em] uppercase">Explore</span>
                  <div className="w-8 h-px bg-gradient-to-r from-slate-400 to-transparent group-hover:w-12 transition-all duration-700"></div>
                </div>

                {/* Subtle hover indicator */}
                <div className="absolute top-6 right-6 w-1 h-1 bg-slate-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
