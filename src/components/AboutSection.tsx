
import { useRef, useEffect } from 'react';
import { useSplitTransition } from '../hooks/useSplitTransition';
import { useCinematicScroll } from '../hooks/useCinematicScroll';

const AboutSection = () => {
  const sectionRef = useSplitTransition({ direction: 'right', triggerPoint: 0.2 });
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
      className="min-h-screen py-32 relative bg-gradient-to-b from-dark-bg via-dark-bg to-dark-bg"
      style={{ willChange: 'transform' }}
    >
      <div className="max-w-7xl mx-auto px-8">
        <div className="max-w-4xl mx-auto">
          <div 
            ref={sectionRef}
            className="space-y-16 mb-24"
            style={{ willChange: 'transform, opacity' }}
          >
            <div>
              <h2 className="text-h2 text-bright font-semibold mb-12 tracking-tight text-heading-crisp">
                Vision
              </h2>
              <div className="w-20 h-px bg-gradient-to-r from-pink-accent to-transparent mb-16"></div>
            </div>
            
            <div className="space-y-8 text-body-large text-crisp leading-relaxed font-medium">
              <p className="text-body-crisp">
                I craft digital experiences that move beyond the ordinary — where every interaction 
                feels cinematic, every transition tells a story, and every moment captivates.
              </p>
              
              <p className="text-body-crisp">
                My work exists at the intersection of motion design and human psychology, 
                creating interfaces that don't just function, but inspire and delight through 
                carefully orchestrated movement and timing.
              </p>
              
              <p className="text-body-crisp">
                Collaborating with visionary brands and individuals who understand that 
                exceptional digital experiences require both technical mastery and artistic vision.
              </p>
            </div>
          </div>

          {/* Project Previews */}
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="group">
              <div className="relative h-80 rounded-xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 hover:border-pink-accent/30 transition-all duration-500">
                <div className="absolute top-4 left-4 flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="p-8 pt-16 h-full flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-pink-accent/20 to-pink-accent/5 rounded-lg mx-auto flex items-center justify-center">
                      <div className="w-8 h-8 bg-pink-accent/40 rounded"></div>
                    </div>
                    <h3 className="text-h3 text-bright font-semibold text-heading-crisp">Project Alpha</h3>
                    <p className="text-body text-crisp font-medium text-body-crisp">Interactive motion experience</p>
                  </div>
                </div>
                <div className="absolute inset-x-4 bottom-4 h-8 bg-gradient-to-r from-white/5 to-white/10 rounded backdrop-blur-sm"></div>
              </div>
            </div>

            <div className="group">
              <div className="relative h-80 rounded-xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 hover:border-pink-accent/30 transition-all duration-500">
                <div className="absolute top-4 left-4 flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="p-8 pt-16 h-full flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-pink-accent/20 to-pink-accent/5 rounded-lg mx-auto flex items-center justify-center">
                      <div className="w-8 h-8 bg-pink-accent/40 rounded-full"></div>
                    </div>
                    <h3 className="text-h3 text-bright font-semibold text-heading-crisp">Project Beta</h3>
                    <p className="text-body text-crisp font-medium text-body-crisp">Cinematic interface design</p>
                  </div>
                </div>
                <div className="absolute inset-x-4 bottom-4 h-8 bg-gradient-to-r from-white/5 to-white/10 rounded backdrop-blur-sm"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
