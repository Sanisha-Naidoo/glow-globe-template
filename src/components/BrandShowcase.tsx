import { useScrollAnimation } from '../hooks/useScrollAnimation';
import globalhourLogo from '../assets/logos/globalhour.png';
import trusteeLogo from '../assets/logos/trustee.png';
import prelovedLogo from '../assets/logos/preloved.png';
import familytreeLogo from '../assets/logos/familytree.png';
import spilltheTeeLogo from '../assets/logos/spillthetee.png';

const BrandShowcase = () => {
  const sectionRef = useScrollAnimation();

  const logos = [
    { src: globalhourLogo, name: 'Global Hour' },
    { src: trusteeLogo, name: 'Trustee' },
    { src: prelovedLogo, name: 'PreLoved' },
    { src: familytreeLogo, name: 'Family Tree' },
    { src: spilltheTeeLogo, name: 'Spill the Tee' },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-24 relative bg-dark-bg opacity-0 translate-y-8 transition-all duration-1000 ease-out border-t border-foreground/5"
    >
      <div className="max-w-7xl mx-auto px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] text-pink-accent uppercase mb-4">Design System</p>
          <h2 className="text-3xl lg:text-4xl text-text-light font-bold tracking-tight mb-4">
            Unified by Design
          </h2>
          <p className="text-text-light/60 max-w-xl mx-auto text-sm">
            A consistent visual language across all projects — diverse in purpose, unified in aesthetic.
          </p>
        </div>

        {/* Logo Strip */}
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {logos.map((logo, index) => (
            <div
              key={index}
              className="group flex flex-col items-center gap-3"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden bg-foreground/5 p-2 transition-all duration-300 group-hover:bg-foreground/10 group-hover:scale-110">
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="w-full h-full object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                />
              </div>
              <span className="text-xs text-text-light/40 group-hover:text-text-light/70 transition-colors tracking-wider uppercase">
                {logo.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandShowcase;
