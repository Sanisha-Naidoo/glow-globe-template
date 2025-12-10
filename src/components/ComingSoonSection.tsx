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
      className="min-h-screen py-24 relative bg-dark-bg opacity-0 translate-y-8 transition-all duration-1000 ease-out"
    >
      <div className="max-w-7xl mx-auto px-8">
        {/* Section Header */}
        <div className="mb-16">
          <p className="text-xs tracking-[0.3em] text-pink-accent uppercase mb-4">What's Next</p>
          <h2 className="text-4xl lg:text-5xl text-text-light font-bold tracking-tight mb-6">
            Coming Soon
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-pink-accent to-transparent" />
        </div>

        {/* Coming Soon Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {upcomingProjects.map((project, index) => (
            <div
              key={index}
              className="relative p-8 rounded-2xl bg-foreground/5 border border-foreground/10 border-dashed overflow-hidden"
            >
              {/* Status Badge */}
              <div className="absolute top-4 right-4">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs tracking-wider uppercase rounded-full ${
                  project.status === 'In Development' 
                    ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' 
                    : 'bg-pink-accent/10 text-pink-accent border border-pink-accent/20'
                }`}>
                  {project.status === 'In Development' ? <Clock className="w-3 h-3" /> : <Sparkles className="w-3 h-3" />}
                  {project.status}
                </span>
              </div>

              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-foreground/5 p-2 flex-shrink-0 opacity-80">
                  <img src={project.logo} alt={project.name} className="w-full h-full object-contain" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-text-light mb-1">{project.name}</h3>
                  <p className="text-text-light/60 text-sm">{project.tagline}</p>
                </div>
              </div>

              <p className="text-text-light/70 text-sm leading-relaxed mb-6">{project.concept}</p>

              <div>
                <h4 className="text-xs tracking-[0.2em] text-text-light/40 uppercase mb-3">Planned Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {project.plannedTools.map((tool) => (
                    <span key={tool} className="px-3 py-1 text-xs tracking-wider uppercase bg-foreground/5 text-text-light/50 rounded-full border border-foreground/10 border-dashed">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Decorative gradient overlay */}
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-dark-bg/50 to-transparent pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComingSoonSection;
