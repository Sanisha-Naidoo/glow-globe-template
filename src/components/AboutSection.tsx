
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const AboutSection = () => {
  const sectionRef = useScrollAnimation();

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="min-h-screen py-32 relative opacity-0 translate-y-8 transition-all duration-[1500ms] ease-out"
    >
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid lg:grid-cols-2 gap-32 items-start">
          <div className="space-y-16">
            <div>
              <h2 className="text-7xl md:text-8xl font-extralight text-white mb-12 tracking-[0.05em]">
                Vision
              </h2>
              <div className="w-16 h-px bg-gradient-to-r from-slate-300 to-transparent mb-16"></div>
            </div>
            
            <div className="space-y-12 text-lg text-slate-200 leading-[1.9] font-extralight">
              <p>
                I believe in the power of intentional design — where every element serves a purpose, 
                where silence speaks as loudly as content, and where technology becomes invisible 
                in service of human connection.
              </p>
              
              <p>
                My practice centers on creating digital experiences that feel inevitable, as if they 
                couldn't exist any other way. This pursuit requires patience, restraint, and an 
                unwavering commitment to craft over convenience.
              </p>
              
              <p>
                Working at the intersection of strategy, design, and development, I collaborate with 
                visionary clients who understand that exceptional work emerges from the space between 
                ambition and execution.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-12 pt-12">
              {[
                { 
                  label: 'Creative Development', 
                  focus: 'React, Three.js, Advanced Animations',
                  description: 'Building interactive experiences that push boundaries'
                },
                { 
                  label: 'Strategic Design', 
                  focus: 'User Experience, Information Architecture',
                  description: 'Crafting purposeful narratives through design'
                },
                { 
                  label: 'Digital Craft', 
                  focus: 'WebGL, Custom Shaders, Performance',
                  description: 'Technical mastery in service of artistic vision'
                }
              ].map((skill, index) => (
                <div key={index} className="space-y-4 border-l border-slate-700/30 pl-8">
                  <h4 className="text-white font-extralight text-base tracking-[0.1em] uppercase">{skill.label}</h4>
                  <p className="text-slate-300 text-sm font-extralight tracking-wide">{skill.focus}</p>
                  <p className="text-slate-400 text-xs font-extralight leading-relaxed">{skill.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative lg:mt-32">
            <div className="relative w-full h-[700px] rounded-sm overflow-hidden">
              {/* Refined glassmorphism container */}
              <div className="absolute inset-0 backdrop-blur-3xl bg-gradient-to-br from-slate-800/5 to-slate-600/5 border border-slate-600/10"></div>
              
              {/* Minimalist geometric content */}
              <div className="absolute inset-12 flex items-center justify-center">
                <div className="relative w-full h-full">
                  {/* Refined geometric shapes */}
                  <div className="absolute top-1/3 left-1/3 w-24 h-24 border border-slate-400/20 rotate-45 rounded-sm"></div>
                  <div className="absolute bottom-1/2 right-1/4 w-16 h-16 bg-gradient-to-br from-slate-300/10 to-transparent rounded-full"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-px bg-gradient-to-r from-transparent via-slate-200/40 to-transparent"></div>
                  <div className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2 w-px h-24 bg-gradient-to-b from-slate-200/40 to-transparent"></div>
                </div>
              </div>
              
              {/* Subtle glow effects */}
              <div className="absolute -top-12 -right-12 w-24 h-24 bg-slate-300/5 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-slate-200/5 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
