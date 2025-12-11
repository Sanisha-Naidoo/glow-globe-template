import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Clock, Sparkles } from 'lucide-react';
import familytreeLogo from '../assets/logos/familytree.png';
import spilltheTeeLogo from '../assets/logos/spillthetee.png';

const ComingSoonSection = () => {
  const sectionRef = useScrollAnimation();

  const upcomingProjects = [
    {
      name: 'Family Tree',
      tagline: 'Map your heritage',
      logo: familytreeLogo,
      concept: 'A visual and interactive way to map family heritage, preserving stories and connections across generations.',
      plannedTools: ['React', 'TypeScript', 'Supabase', 'D3.js'],
      status: 'In Development'
    },
    {
      name: 'Spill the Tee',
      tagline: 'Print on demand t-shirts',
      logo: spilltheTeeLogo,
      concept: 'A print-on-demand t-shirt platform connected to Shopify, enabling creators to design and sell custom apparel.',
      plannedTools: ['React', 'TypeScript', 'Shopify', 'Stripe'],
      status: 'Coming Soon'
    }
  ];

  return (
    <section
      id="coming-soon"
      ref={sectionRef}
      className="min-h-screen py-16 sm:py-32 relative bg-dark-bg opacity-0 translate-y-8 transition-all duration-1000 ease-out"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="mb-12 sm:mb-20">
          <p className="text-sm tracking-[0.3em] text-cyan-accent uppercase mb-4 sm:mb-6">What's Next</p>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl text-text-light font-bold tracking-tight mb-6 sm:mb-8">
            Coming Soon
          </h2>
          <div className="w-24 sm:w-32 h-px bg-gradient-to-r from-cyan-accent to-violet-accent" />
        </div>

        {/* Coming Soon Grid - Larger Cards */}
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-10">
          {upcomingProjects.map((project, index) => (
            <div
              key={index}
              className="relative p-6 sm:p-10 rounded-xl sm:rounded-2xl bg-foreground/5 border border-foreground/10 overflow-hidden"
            >
              {/* Status Badge */}
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
                <span className={`inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm tracking-wider uppercase rounded-full ${
                  project.status === 'In Development' 
                    ? 'bg-cyan-accent/10 text-cyan-accent border border-cyan-accent/20' 
                    : 'bg-violet-accent/10 text-violet-accent border border-violet-accent/20'
                }`}>
                  {project.status === 'In Development' ? <Clock className="w-3 h-3 sm:w-4 sm:h-4" /> : <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />}
                  <span className="hidden sm:inline">{project.status}</span>
                </span>
              </div>

              <div className="flex items-start gap-4 sm:gap-6 mb-5 sm:mb-8 mt-6 sm:mt-0">
                <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-lg sm:rounded-xl overflow-hidden bg-foreground/5 p-1.5 sm:p-2 flex-shrink-0 opacity-80">
                  <img src={project.logo} alt={project.name} className="w-full h-full object-contain" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-text-light mb-1 sm:mb-2">{project.name}</h3>
                  <p className="text-text-light/60 text-sm sm:text-base">{project.tagline}</p>
                </div>
              </div>

              <p className="text-text-light/70 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8">{project.concept}</p>

              <div>
                <h4 className="text-xs sm:text-sm tracking-[0.2em] text-text-light/40 uppercase mb-3 sm:mb-4">Planned Stack</h4>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {project.plannedTools.map((tool) => (
                    <span key={tool} className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm tracking-wider uppercase bg-foreground/5 text-text-light/50 rounded-full border border-foreground/10">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Decorative gradient overlay */}
              <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-dark-bg/50 to-transparent pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComingSoonSection;
