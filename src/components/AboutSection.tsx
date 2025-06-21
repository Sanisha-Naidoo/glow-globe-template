
import { useRef, useEffect } from 'react';
import { useSplitTransition } from '../hooks/useSplitTransition';
import { useCinematicScroll } from '../hooks/useCinematicScroll';

const AboutSection = () => {
  const sectionRef = useSplitTransition({ direction: 'right', triggerPoint: 0.2 });
  const imageRef = useSplitTransition({ direction: 'left', triggerPoint: 0.4 });
  const parallaxRef = useRef<HTMLDivElement>(null);
  const { subscribeToScroll } = useCinematicScroll();

  useEffect(() => {
    const unsubscribe = subscribeToScroll((progress) => {
      if (parallaxRef.current) {
        // Apply subtle parallax effect when About section is in view
        const aboutProgress = Math.max(0, Math.min(1, (progress - 0.15) * 3));
        const translateY = -aboutProgress * 15;
        const scale = 1 - aboutProgress * 0.05;
        
        parallaxRef.current.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`;
      }
    });

    return unsubscribe;
  }, [subscribeToScroll]);

  return (
    <section 
      id="about" 
      ref={parallaxRef}
      className="min-h-screen py-32 relative bg-gradient-to-b from-slate-950/50 to-slate-900/30"
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
              <h2 className="text-7xl md:text-8xl font-extralight text-white mb-12 tracking-[0.05em]">
                Vision
              </h2>
              <div className="w-16 h-px bg-gradient-to-r from-slate-300 to-transparent mb-16"></div>
            </div>
            
            <div className="space-y-12 text-lg text-slate-200 leading-[1.9] font-extralight">
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
                <div key={index} className="space-y-4 border-l border-slate-700/30 pl-8 transform hover:translate-x-2 transition-transform duration-500">
                  <h4 className="text-white font-extralight text-base tracking-[0.1em] uppercase">{skill.label}</h4>
                  <p className="text-slate-300 text-sm font-extralight tracking-wide">{skill.focus}</p>
                  <p className="text-slate-400 text-xs font-extralight leading-relaxed">{skill.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div 
            ref={imageRef}
            className="relative lg:mt-32"
            style={{ willChange: 'transform, opacity' }}
          >
            <div className="relative w-full h-[700px] rounded-sm overflow-hidden group">
              <div className="absolute inset-0 backdrop-blur-3xl bg-gradient-to-br from-slate-800/10 to-slate-600/5 border border-slate-600/20 transition-all duration-700 group-hover:border-slate-500/30"></div>
              
              <div className="absolute inset-12 flex items-center justify-center">
                <div className="relative w-full h-full">
                  <div className="absolute top-1/3 left-1/3 w-24 h-24 border border-slate-400/30 rotate-45 rounded-sm transition-all duration-700 group-hover:rotate-[60deg] group-hover:scale-110"></div>
                  <div className="absolute bottom-1/2 right-1/4 w-16 h-16 bg-gradient-to-br from-slate-300/15 to-transparent rounded-full transition-all duration-700 group-hover:scale-125"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-px bg-gradient-to-r from-transparent via-slate-200/50 to-transparent"></div>
                  <div className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2 w-px h-24 bg-gradient-to-b from-slate-200/50 to-transparent"></div>
                </div>
              </div>
              
              <div className="absolute -top-12 -right-12 w-24 h-24 bg-slate-300/10 rounded-full blur-3xl transition-all duration-700 group-hover:scale-150"></div>
              <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-slate-200/8 rounded-full blur-3xl transition-all duration-700 group-hover:scale-125"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
