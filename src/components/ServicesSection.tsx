
import { useSplitTransition } from '../hooks/useSplitTransition';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const ServicesSection = () => {
  const sectionRef = useSplitTransition({ direction: 'right', triggerPoint: 0.15 });
  const cardsRef = useScrollAnimation({ threshold: 0.2 });

  const services = [
    {
      title: "Motion Design",
      description: "Crafting fluid animations that breathe life into digital interfaces with cinematic precision and technical artistry.",
      features: ["GPU Acceleration", "WebGL Shaders", "Performance Optimization"]
    },
    {
      title: "Interaction Design",
      description: "Designing intuitive experiences that respond naturally to human touch and gesture with seamless fluidity.",
      features: ["Gesture Recognition", "Scroll Choreography", "Micro-interactions"]
    },
    {
      title: "Creative Technology",
      description: "Pushing the boundaries of what's possible in the browser through innovative technical solutions.",
      features: ["Three.js", "Custom Frameworks", "Real-time Rendering"]
    },
    {
      title: "Visual Storytelling",
      description: "Creating immersive narratives that captivate audiences through sophisticated visual communication.",
      features: ["Cinematic Transitions", "Editorial Layout", "Brand Identity"]
    }
  ];

  return (
    <section 
      id="services" 
      ref={sectionRef}
      className="min-h-screen py-32 relative bg-gradient-to-b from-stone-50 to-neutral-100"
      style={{ willChange: 'transform, opacity' }}
    >
      <div className="max-w-7xl mx-auto px-8">
        <div className="mb-24">
          <h2 className="text-6xl md:text-7xl font-extralight text-stone-800 mb-8 tracking-[0.03em]">
            Services
          </h2>
          <div className="w-20 h-px bg-gradient-to-r from-stone-400 to-transparent mb-12"></div>
          <p className="text-xl text-stone-600 max-w-3xl font-light leading-[1.8] tracking-wide">
            Comprehensive creative and technical solutions for exceptional digital experiences
          </p>
        </div>

        <div 
          ref={cardsRef}
          className="grid lg:grid-cols-2 gap-12 opacity-0 translate-y-8"
        >
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-white/40 backdrop-blur-sm border border-stone-200/60 rounded-2xl p-12 hover:bg-white/60 hover:border-stone-300/80 hover:shadow-2xl hover:-translate-y-4 transition-all duration-700 ease-out"
            >
              <div className="space-y-8">
                <h3 className="text-2xl font-light text-stone-800 group-hover:text-stone-900 transition-colors duration-500 tracking-wide">
                  {service.title}
                </h3>
                
                <p className="text-stone-600 leading-[1.9] font-light text-base tracking-wide">
                  {service.description}
                </p>
                
                <div className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <div className="w-1 h-1 bg-stone-400 rounded-full group-hover:bg-stone-600 transition-colors duration-500"></div>
                      <span className="text-sm text-stone-500 font-light tracking-wide">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="absolute top-8 right-8 w-2 h-2 bg-stone-300/50 rounded-full group-hover:bg-stone-400 group-hover:scale-150 transition-all duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
