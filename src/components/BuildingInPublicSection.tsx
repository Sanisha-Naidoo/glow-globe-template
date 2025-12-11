import { useRef, useEffect } from 'react';
import { useCinematicScroll } from '../hooks/useCinematicScroll';
import { useProjectScaleAnimation } from '../hooks/useProjectScaleAnimation';
import { ExternalLink } from 'lucide-react';
import globalhourLogo from '../assets/logos/globalhour.png';

const BuildingInPublicSection = () => {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const { subscribeToScroll } = useCinematicScroll();
  const { projectBoxRef } = useProjectScaleAnimation({
    startTrigger: 0.2,
    endTrigger: 0.7
  });

  useEffect(() => {
    const unsubscribe = subscribeToScroll(progress => {
      if (parallaxRef.current) {
        const sectionProgress = Math.max(0, Math.min(1, (progress - 0.1) * 2));
        const translateY = -sectionProgress * 6;
        parallaxRef.current.style.transform = `translate3d(0, ${translateY}px, 0)`;
      }
    });
    return unsubscribe;
  }, [subscribeToScroll]);

  const currentProjects = [
    {
      name: 'Global Hour',
      tagline: 'Connecting communities across time zones',
      url: 'https://globalhour.lovable.app/',
      logo: globalhourLogo,
      tools: ['React', 'TypeScript', 'Lovable Cloud', 'Tailwind CSS'],
      motivation: 'A platform designed to facilitate global collaboration by bridging time zone gaps and fostering international connections.'
    }
  ];

  return (
    <section id="building" ref={parallaxRef} className="min-h-screen py-16 sm:py-32 relative bg-dark-bg" style={{ willChange: 'transform' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="mb-12 sm:mb-20">
          <p className="text-sm tracking-[0.3em] text-cyan-accent uppercase mb-4 sm:mb-6">Currently Building</p>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl text-text-light font-bold tracking-tight mb-6 sm:mb-8">
            Building in Public
          </h2>
          <div className="w-24 sm:w-32 h-px bg-gradient-to-r from-cyan-accent to-violet-accent" />
        </div>

        {/* Featured Project */}
        {currentProjects.map((project, index) => (
          <div key={index} className="mb-16">
            {/* Project Info Card - Text Left, Preview Right */}
            <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 mb-8">
              {/* Live Preview - Now on Left for desktop */}
              <div className="lg:col-span-3 order-2 lg:order-1">
                <div
                  ref={projectBoxRef}
                  className="w-full h-[40vh] sm:h-[65vh] rounded-xl sm:rounded-2xl overflow-hidden bg-foreground/5 backdrop-blur-xl shadow-2xl relative"
                  style={{ transformOrigin: 'center center' }}
                >
                  <div className="absolute top-0 left-0 right-0 h-14 bg-foreground/10 backdrop-blur-md border-b border-foreground/10 flex items-center justify-between px-6 z-10">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-foreground/20" />
                      <div className="w-3 h-3 rounded-full bg-foreground/20" />
                      <div className="w-3 h-3 rounded-full bg-foreground/20" />
                    </div>
                    <span className="text-text-light/50 text-sm">{project.url}</span>
                  </div>
                  <iframe
                    src={project.url}
                    className="w-full h-full pt-14 border-none"
                    title={project.name}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-pointer-lock allow-top-navigation-by-user-activation"
                  />
                </div>
              </div>

              {/* Text Content - Now on Right for desktop */}
              <div className="lg:col-span-2 space-y-6 sm:space-y-8 order-1 lg:order-2">
                <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-xl sm:rounded-2xl overflow-hidden bg-foreground/5 p-2 sm:p-3">
                  <img src={project.logo} alt={project.name} className="w-full h-full object-contain" />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-text-light mb-2 sm:mb-3">{project.name}</h3>
                  <p className="text-text-light/60 text-base sm:text-lg font-light">{project.tagline}</p>
                </div>
                <p className="text-text-light/70 text-sm sm:text-base leading-relaxed">{project.motivation}</p>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {project.tools.map((tool) => (
                    <span key={tool} className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm tracking-wider uppercase bg-foreground/5 text-text-light/80 rounded-full border border-foreground/10">
                      {tool}
                    </span>
                  ))}
                </div>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-cyan-accent hover:text-violet-accent transition-colors text-base font-medium"
                >
                  <ExternalLink className="w-5 h-5" />
                  Visit Live App
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BuildingInPublicSection;
