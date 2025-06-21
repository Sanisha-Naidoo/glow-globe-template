
import { useSplitTransition } from '../hooks/useSplitTransition';

const ProcessSection = () => {
  const sectionRef = useSplitTransition({ direction: 'left', triggerPoint: 0.1 });

  const steps = [
    {
      number: "01",
      title: "Discovery",
      description: "Deep dive into your vision, goals, and creative aspirations to establish the foundation for extraordinary work.",
      duration: "1-2 weeks"
    },
    {
      number: "02", 
      title: "Concept",
      description: "Ideation and creative exploration, developing unique concepts that push creative and technical boundaries.",
      duration: "2-3 weeks"
    },
    {
      number: "03",
      title: "Design",
      description: "Crafting the visual language and interaction patterns that will define the user experience.",
      duration: "3-4 weeks"
    },
    {
      number: "04",
      title: "Development",
      description: "Bringing designs to life with cutting-edge technology and meticulous attention to performance.",
      duration: "4-6 weeks"
    },
    {
      number: "05",
      title: "Refinement",
      description: "Iterative optimization and polish to ensure every detail exceeds expectations.",
      duration: "1-2 weeks"
    }
  ];

  return (
    <section 
      id="process" 
      ref={sectionRef}
      className="min-h-screen py-32 relative bg-gradient-to-b from-neutral-100 to-stone-200"
      style={{ willChange: 'transform, opacity' }}
    >
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid lg:grid-cols-5 gap-16 items-start">
          <div className="lg:col-span-2 space-y-12">
            <div>
              <h2 className="text-6xl md:text-7xl font-extralight text-stone-800 mb-8 tracking-[0.03em]">
                Process
              </h2>
              <div className="w-20 h-px bg-gradient-to-r from-stone-400 to-transparent mb-12"></div>
              <p className="text-xl text-stone-600 font-light leading-[1.8] tracking-wide">
                A methodical approach to creating exceptional digital experiences through collaborative innovation.
              </p>
            </div>
          </div>
          
          <div className="lg:col-span-3 space-y-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="group relative bg-white/30 backdrop-blur-sm border border-stone-200/50 rounded-xl p-8 hover:bg-white/50 hover:border-stone-300/70 hover:shadow-xl hover:scale-[1.02] transition-all duration-600 ease-out"
              >
                <div className="flex items-start space-x-8">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-stone-300/50 to-stone-400/30 rounded-full flex items-center justify-center group-hover:from-stone-400/60 group-hover:to-stone-500/40 transition-all duration-500">
                      <span className="text-sm font-light text-stone-700 tracking-wider">{step.number}</span>
                    </div>
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-light text-stone-800 tracking-wide">{step.title}</h3>
                      <span className="text-xs text-stone-500 font-light tracking-wider uppercase">{step.duration}</span>
                    </div>
                    <p className="text-stone-600 leading-[1.8] font-light tracking-wide">
                      {step.description}
                    </p>
                  </div>
                </div>
                
                {index < steps.length - 1 && (
                  <div className="absolute -bottom-4 left-8 w-px h-8 bg-gradient-to-b from-stone-300/60 to-transparent"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
