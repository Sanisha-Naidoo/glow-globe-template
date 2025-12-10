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
      tools: ['React', 'TypeScript', 'Supabase', 'Tailwind'],
      motivation: 'A platform designed to facilitate global collaboration by bridging time zone gaps and fostering international connections.'
    }
  ];

  return (
    <section id="building" ref={parallaxRef} className="min-h-screen py-24 relative bg-dark-bg" style={{ willChange: 'transform' }}>
      <div className="max-w-7xl mx-auto px-8">
        {/* Section Header */}
        <div className="mb-16">
          <p className="text-xs tracking-[0.3em] text-pink-accent uppercase mb-4">Currently Building</p>
          <h2 className="text-4xl lg:text-5xl text-text-light font-bold tracking-tight mb-6">
            Building in Public
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-pink-accent to-transparent" />
        </div>

        {/* Featured Project */}
        {currentProjects.map((project, index) => (
          <div key={index} className="mb-16">
            {/* Project Info Card */}
            <div className="grid lg:grid-cols-3 gap-8 mb-8">
              <div className="lg:col-span-1 space-y-6">
                <div className="w-20 h-20 rounded-2xl overflow-hidden bg-foreground/5 p-2">
                  <img src={project.logo} alt={project.name} className="w-full h-full object-contain" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-text-light mb-2">{project.name}</h3>
                  <p className="text-text-light/60 font-light">{project.tagline}</p>
                </div>
                <p className="text-text-light/70 text-sm leading-relaxed">{project.motivation}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((tool) => (
                    <span key={tool} className="px-3 py-1 text-xs tracking-wider uppercase bg-foreground/5 text-text-light/80 rounded-full border border-foreground/10">
                      {tool}
                    </span>
                  ))}
                </div>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-pink-accent hover:text-pink-accent/80 transition-colors text-sm font-medium"
                >
                  <ExternalLink className="w-4 h-4" />
                  Visit Live App
                </a>
              </div>

              {/* Live Preview */}
              <div className="lg:col-span-2">
                <div
                  ref={projectBoxRef}
                  className="w-full h-[60vh] rounded-2xl overflow-hidden bg-foreground/5 backdrop-blur-xl shadow-2xl relative"
                  style={{ transformOrigin: 'center center' }}
                >
                  <div className="absolute top-0 left-0 right-0 h-12 bg-foreground/10 backdrop-blur-md border-b border-foreground/10 flex items-center justify-between px-6 z-10">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/60" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                      <div className="w-3 h-3 rounded-full bg-green-500/60" />
                    </div>
                    <span className="text-text-light/50 text-xs">{project.url}</span>
                  </div>
                  <iframe
                    src={project.url}
                    className="w-full h-full pt-12 border-none"
                    title={project.name}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-pointer-lock allow-top-navigation-by-user-activation"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BuildingInPublicSection;
