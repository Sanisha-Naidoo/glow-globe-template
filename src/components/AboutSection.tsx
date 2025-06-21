
import { useSplitTransition } from '../hooks/useSplitTransition';

const AboutSection = () => {
  const sectionRef = useSplitTransition({ direction: 'right', triggerPoint: 0.2 });
  const imageRef = useSplitTransition({ direction: 'left', triggerPoint: 0.4 });

  return (
    <section 
      id="about" 
      className="min-h-screen py-32 relative bg-gradient-to-b from-stone-200 to-neutral-100"
      style={{ willChange: 'transform' }}
    >
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid lg:grid-cols-2 gap-32 items-start">
          <div 
            ref={sectionRef}
            className="space-y-16"
            style={{ willChange: 'transform, opacity' }}
          >
            <div>
              <h2 className="text-6xl md:text-7xl font-extralight text-stone-800 mb-12 tracking-[0.03em]">
                Vision
              </h2>
              <div className="w-20 h-px bg-gradient-to-r from-stone-400 to-transparent mb-16"></div>
            </div>
            
            <div className="space-y-12 text-lg text-stone-600 leading-[1.9] font-light">
              <p>
                I craft digital experiences that move beyond the ordinary — where every interaction 
                feels cinematic, every transition tells a story, and every moment captivates.
              </p>
              
              <p>
                My work exists at the intersection of motion design and human psychology, 
                creating interfaces that don't just function, but inspire and delight through 
                carefully orchestrated movement and timing.
              </p>
              
              <p>
                Collaborating with visionary brands and individuals who understand that 
                exceptional digital experiences require both technical mastery and artistic vision.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-12 pt-12">
              {[
                { 
                  label: 'Motion Design', 
                  focus: 'GPU-Accelerated Animations, WebGL',
                  description: 'Creating fluid, cinematic interactions that feel alive'
                },
                { 
                  label: 'Interaction Design', 
                  focus: 'Scroll Choreography, Gesture Recognition',
                  description: 'Designing intuitive experiences that respond to human touch'
                },
                { 
                  label: 'Technical Artistry', 
                  focus: 'Three.js, Custom Shaders, Performance',
                  description: 'Pushing the boundaries of what\'s possible in the browser'
                }
              ].map((skill, index) => (
                <div key={index} className="space-y-4 border-l border-stone-300/50 pl-8 transform hover:translate-x-2 hover:border-stone-400/70 transition-all duration-500">
                  <h4 className="text-stone-800 font-light text-base tracking-[0.1em] uppercase">{skill.label}</h4>
                  <p className="text-stone-600 text-sm font-light tracking-wide">{skill.focus}</p>
                  <p className="text-stone-500 text-xs font-light leading-relaxed">{skill.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div 
            ref={imageRef}
            className="relative lg:mt-32"
            style={{ willChange: 'transform, opacity' }}
          >
            <div className="relative w-full h-[700px] rounded-2xl overflow-hidden group">
              <div className="absolute inset-0 backdrop-blur-3xl bg-gradient-to-br from-white/20 to-stone-100/30 border border-stone-200/40 hover:border-stone-300/60 hover:bg-white/30 transition-all duration-700 rounded-2xl"></div>
              
              <div className="absolute inset-12 flex items-center justify-center">
                <div className="relative w-full h-full">
                  <div className="absolute top-1/3 left-1/3 w-24 h-24 border border-stone-300/50 rotate-45 rounded-sm group-hover:rotate-[60deg] group-hover:scale-110 group-hover:border-stone-400/70 transition-all duration-700"></div>
                  <div className="absolute bottom-1/2 right-1/4 w-16 h-16 bg-gradient-to-br from-stone-300/30 to-transparent rounded-full group-hover:scale-125 transition-all duration-700"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-px bg-gradient-to-r from-transparent via-stone-400/60 to-transparent"></div>
                  <div className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2 w-px h-24 bg-gradient-to-b from-stone-400/60 to-transparent"></div>
                </div>
              </div>
              
              <div className="absolute -top-12 -right-12 w-24 h-24 bg-stone-200/20 rounded-full blur-3xl group-hover:scale-150 transition-all duration-700"></div>
              <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-stone-300/15 rounded-full blur-3xl group-hover:scale-125 transition-all duration-700"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
