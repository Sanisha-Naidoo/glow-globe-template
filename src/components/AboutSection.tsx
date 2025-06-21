
const AboutSection = () => {
  return (
    <section id="about" className="min-h-screen py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-12">
            <div>
              <h2 className="text-6xl md:text-7xl font-extralight text-white mb-8 tracking-wide">
                About
              </h2>
              <div className="w-24 h-px bg-gradient-to-r from-teal-400 to-transparent mb-12"></div>
            </div>
            
            <div className="space-y-8 text-lg text-slate-300 leading-relaxed font-light">
              <p>
                I specialize in creating digital experiences that merge technical precision 
                with thoughtful design. Every project begins with understanding the core 
                challenge and distilling it to its essential elements.
              </p>
              
              <p>
                My approach combines minimalist aesthetics with cutting-edge technology, 
                ensuring that form and function work in perfect harmony. The result is 
                interfaces that feel intuitive and experiences that leave lasting impressions.
              </p>
              
              <p>
                Based in the intersection of design and development, I work with forward-thinking 
                clients who value quality, attention to detail, and innovative solutions.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 pt-8">
              {[
                { label: 'Frontend Development', focus: 'React, TypeScript, WebGL' },
                { label: 'UI/UX Design', focus: 'Figma, Principle, Prototyping' },
                { label: 'Creative Coding', focus: 'Three.js, GSAP, Shaders' },
                { label: 'Strategy', focus: 'User Research, Information Architecture' }
              ].map((skill, index) => (
                <div key={index} className="space-y-2">
                  <h4 className="text-white font-light text-sm tracking-wide">{skill.label}</h4>
                  <p className="text-slate-400 text-xs font-light">{skill.focus}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="relative w-full h-[600px] rounded-lg overflow-hidden">
              {/* Glassmorphism container */}
              <div className="absolute inset-0 backdrop-blur-xl bg-gradient-to-br from-slate-800/20 to-slate-700/10 border border-slate-600/20"></div>
              
              {/* Abstract geometric content */}
              <div className="absolute inset-8 flex items-center justify-center">
                <div className="relative w-full h-full">
                  {/* Geometric shapes */}
                  <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-teal-400/30 rotate-45"></div>
                  <div className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-gradient-to-br from-teal-400/20 to-transparent rounded-full"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
                  <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 w-px h-32 bg-gradient-to-b from-slate-300 to-transparent"></div>
                </div>
              </div>
              
              {/* Subtle glow effects */}
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-teal-400/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-cyan-400/10 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
