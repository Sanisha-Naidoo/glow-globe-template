
import { useRef, useEffect } from 'react';
import { useSplitTransition } from '../hooks/useSplitTransition';
import { useProjectAnimation } from '../hooks/useProjectAnimations';
import { useCinematicScroll } from '../hooks/useCinematicScroll';

const AboutSection = () => {
  const sectionRef = useSplitTransition({ direction: 'right', triggerPoint: 0.1 });
  const parallaxRef = useRef<HTMLDivElement>(null);
  const { subscribeToScroll } = useCinematicScroll();
  
  const projectAlphaRef = useProjectAnimation({ direction: 'diagonal-left', triggerPoint: 0.6 });
  const projectBetaRef = useProjectAnimation({ direction: 'right', triggerPoint: 0.7 });

  useEffect(() => {
    const unsubscribe = subscribeToScroll((progress) => {
      if (parallaxRef.current) {
        // Gentler parallax that works with the heart animation
        const aboutProgress = Math.max(0, Math.min(1, (progress - 0.3) * 2));
        const translateY = -aboutProgress * 8;
        const scale = 1 - aboutProgress * 0.02;
        
        parallaxRef.current.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`;
      }
    });

    return unsubscribe;
  }, [subscribeToScroll]);

  return (
    <section 
      id="about" 
      ref={parallaxRef}
      className="min-h-screen py-16 md:py-20 lg:py-24 relative bg-dark-bg"
      style={{ willChange: 'transform' }}
    >
      <div className="max-w-7xl mx-auto px-8">
        <div className="max-w-4xl mx-auto">
          <div 
            ref={sectionRef}
            className="space-y-12 md:space-y-16 lg:space-y-20 mb-20 md:mb-24 lg:mb-28"
            style={{ willChange: 'transform, opacity' }}
          >
            <div>
              <h2 className="text-5xl md:text-6xl lg:text-7xl text-white font-bold mb-12 md:mb-16 tracking-tight text-shadow-lg">
                Vision
              </h2>
              <div className="w-24 h-px bg-gradient-to-r from-pink-accent to-transparent mb-16 md:mb-20 lg:mb-24"></div>
            </div>
            
            <div className="max-w-3xl">
              <p className="text-2xl md:text-3xl lg:text-4xl text-white leading-relaxed font-light text-shadow-md">
                I craft digital experiences that transcend the ordinary — where every interaction 
                feels cinematic, every transition tells a story, and every moment captivates through 
                the seamless fusion of motion design and human psychology.
              </p>
            </div>
          </div>

          {/* Project Previews */}
          <div className="grid lg:grid-cols-2 gap-12 md:gap-16 lg:gap-20">
            <div ref={projectAlphaRef} className="group opacity-0">
              <div className="relative h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 to-black border border-gray-700 hover:border-pink-accent/50 transition-all duration-500 shadow-2xl">
                <div className="absolute top-6 left-6 flex space-x-3">
                  <div className="w-4 h-4 rounded-full bg-red-500"></div>
                  <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                  <div className="w-4 h-4 rounded-full bg-green-500"></div>
                </div>
                <div className="p-8 pt-20 h-full flex items-center justify-center">
                  <div className="text-center space-y-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-pink-accent/30 to-pink-accent/10 rounded-xl mx-auto flex items-center justify-center shadow-lg">
                      <div className="w-10 h-10 bg-pink-accent/60 rounded-lg"></div>
                    </div>
                    <h3 className="text-2xl text-white font-bold text-shadow-md">Project Alpha</h3>
                    <p className="text-lg text-gray-300 font-medium text-shadow-sm">Interactive motion experience</p>
                  </div>
                </div>
                <div className="absolute inset-x-6 bottom-6 h-10 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg backdrop-blur-sm"></div>
              </div>
            </div>

            <div ref={projectBetaRef} className="group opacity-0">
              <div className="relative h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 to-black border border-gray-700 hover:border-pink-accent/50 transition-all duration-500 shadow-2xl">
                <div className="absolute top-6 left-6 flex space-x-3">
                  <div className="w-4 h-4 rounded-full bg-red-500"></div>
                  <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                  <div className="w-4 h-4 rounded-full bg-green-500"></div>
                </div>
                <div className="p-8 pt-20 h-full flex items-center justify-center">
                  <div className="text-center space-y-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-pink-accent/30 to-pink-accent/10 rounded-xl mx-auto flex items-center justify-center shadow-lg">
                      <div className="w-10 h-10 bg-pink-accent/60 rounded-full"></div>
                    </div>
                    <h3 className="text-2xl text-white font-bold text-shadow-md">Project Beta</h3>
                    <p className="text-lg text-gray-300 font-medium text-shadow-sm">Cinematic interface design</p>
                  </div>
                </div>
                <div className="absolute inset-x-6 bottom-6 h-10 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg backdrop-blur-sm"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
