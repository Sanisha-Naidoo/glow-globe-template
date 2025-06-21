
const WorkSection = () => {
  const projects = [
    {
      title: "Financial Platform",
      description: "Redesigned trading interface with real-time data visualization and intuitive portfolio management.",
      tech: ["React", "D3.js", "WebSocket"],
      category: "Fintech"
    },
    {
      title: "Healthcare Dashboard",
      description: "Clinical workflow optimization through streamlined interface design and data architecture.",
      tech: ["Vue.js", "Python", "PostgreSQL"],
      category: "Healthcare"
    },
    {
      title: "E-commerce Experience",
      description: "Complete platform redesign focusing on conversion optimization and user journey mapping.",
      tech: ["Next.js", "Stripe", "Sanity"],
      category: "E-commerce"
    },
    {
      title: "Brand Identity System",
      description: "Comprehensive visual identity including logo design, color systems, and brand guidelines.",
      tech: ["Figma", "After Effects", "Principle"],
      category: "Branding"
    },
    {
      title: "Data Visualization Tool",
      description: "Interactive dashboard for complex dataset analysis with custom charting components.",
      tech: ["Three.js", "WebGL", "Node.js"],
      category: "Data"
    },
    {
      title: "Mobile Banking App",
      description: "Complete UX redesign focusing on accessibility and simplified financial management.",
      tech: ["React Native", "Figma", "Prototyping"],
      category: "Mobile"
    }
  ];

  return (
    <section id="work" className="min-h-screen py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-24">
          <h2 className="text-6xl md:text-7xl font-extralight text-white mb-8 tracking-wide">
            Work
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-teal-400 to-transparent mb-12"></div>
          <p className="text-xl text-slate-300 max-w-2xl font-light leading-relaxed">
            Selected projects that demonstrate thoughtful problem-solving and 
            attention to craft across various industries and challenges.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative"
            >
              {/* Card container with glassmorphism */}
              <div className="relative p-8 h-full backdrop-blur-xl bg-gradient-to-br from-slate-800/20 to-slate-700/10 border border-slate-600/20 rounded-lg hover:border-slate-500/30 transition-all duration-500">
                
                {/* Category */}
                <div className="mb-6">
                  <span className="text-xs font-light tracking-widest text-teal-400 uppercase">
                    {project.category}
                  </span>
                </div>
                
                {/* Content */}
                <div className="space-y-4 mb-8">
                  <h3 className="text-xl font-light text-white group-hover:text-slate-100 transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <p className="text-slate-300 leading-relaxed font-light text-sm">
                    {project.description}
                  </p>
                </div>
                
                {/* Tech stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-light text-slate-400 border border-slate-600/30 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Hover indicator */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-teal-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
