
const WorkSection = () => {
  const projects = [
    {
      title: "Interactive Portfolio",
      description: "A modern portfolio website with 3D particle animations and smooth transitions.",
      tech: ["React", "Three.js", "WebGL"],
      image: "🎨"
    },
    {
      title: "E-commerce Platform",
      description: "Full-stack e-commerce solution with modern UI and seamless user experience.",
      tech: ["Next.js", "Node.js", "PostgreSQL"],
      image: "🛒"
    },
    {
      title: "Data Visualization Tool",
      description: "Interactive dashboard for complex data analysis with beautiful charts and graphs.",
      tech: ["D3.js", "React", "Python"],
      image: "📊"
    },
    {
      title: "Mobile App Design",
      description: "Clean and intuitive mobile app design focusing on user experience and accessibility.",
      tech: ["Figma", "UI/UX", "Prototyping"],
      image: "📱"
    },
    {
      title: "Creative Coding Project",
      description: "Experimental project exploring generative art and interactive installations.",
      tech: ["p5.js", "WebGL", "Creative Coding"],
      image: "🎭"
    },
    {
      title: "Brand Identity System",
      description: "Complete brand identity design including logo, colors, and visual guidelines.",
      tech: ["Branding", "Graphic Design", "Typography"],
      image: "✨"
    }
  ];

  return (
    <section id="work" className="min-h-screen py-20 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-light mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            My Work
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            A selection of projects that showcase my passion for creating beautiful, functional digital experiences.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500 hover:transform hover:scale-105"
            >
              {/* Background Glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-600/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Content */}
              <div className="relative z-10">
                <div className="text-4xl mb-4">{project.image}</div>
                
                <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-purple-200 transition-colors duration-300">
                  {project.title}
                </h3>
                
                <p className="text-white/70 mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-sm rounded-full bg-white/10 text-white/80 border border-white/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute top-2 right-2 w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
