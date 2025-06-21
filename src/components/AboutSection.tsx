
const AboutSection = () => {
  return (
    <section id="about" className="min-h-screen py-20 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-5xl md:text-6xl font-light bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              About Me
            </h2>
            
            <div className="space-y-6 text-lg text-white/80 leading-relaxed">
              <p>
                I'm a passionate developer and designer who believes in the power of 
                digital experiences to connect, inspire, and transform. With a keen eye 
                for detail and a love for clean, minimalist aesthetics.
              </p>
              
              <p>
                My work spans across web development, UI/UX design, and creative coding. 
                I specialize in creating immersive experiences that blend cutting-edge 
                technology with thoughtful design principles.
              </p>
              
              <p>
                When I'm not coding, you'll find me exploring new design trends, 
                experimenting with 3D graphics, or seeking inspiration in the world around me.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              {['React', 'Three.js', 'TypeScript', 'WebGL', 'UI/UX', 'Creative Coding'].map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 hover:bg-white/20 transition-colors duration-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="relative w-full h-96 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 to-pink-600/30 backdrop-blur-sm border border-white/20"></div>
              <div className="absolute inset-4 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center">
                <div className="text-6xl">👨‍💻</div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-20 blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full opacity-20 blur-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
