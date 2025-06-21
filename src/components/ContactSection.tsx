
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const ContactSection = () => {
  const sectionRef = useScrollAnimation();

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="min-h-screen py-32 relative opacity-0 translate-y-8 transition-all duration-[1500ms] ease-out bg-gradient-to-b from-neutral-100 to-stone-200"
    >
      <div className="max-w-6xl mx-auto px-8">
        <div className="grid lg:grid-cols-2 gap-32">
          <div className="space-y-16">
            <div>
              <h2 className="text-6xl md:text-7xl font-extralight text-stone-800 mb-12 tracking-[0.03em]">
                Connect
              </h2>
              <div className="w-20 h-px bg-gradient-to-r from-stone-400 to-transparent mb-16"></div>
              <p className="text-xl text-stone-600 font-light leading-[1.8] tracking-wide">
                Let's explore the possibilities of creating something extraordinary together.
              </p>
            </div>

            <div className="space-y-12">
              {[
                { label: 'Email', value: 'create@yourname.com', link: 'mailto:create@yourname.com' },
                { label: 'LinkedIn', value: 'linkedin.com/in/yourprofile', link: 'https://linkedin.com' },
                { label: 'Behance', value: 'behance.net/yourprofile', link: 'https://behance.net' }
              ].map((contact, index) => (
                <div key={index} className="group border-l border-stone-300/50 pl-8 hover:border-stone-400/70 hover:translate-x-2 transition-all duration-700">
                  <p className="text-xs font-light tracking-[0.3em] text-stone-500 mb-3 uppercase">
                    {contact.label}
                  </p>
                  <a 
                    href={contact.link}
                    className="text-stone-700 hover:text-stone-900 transition-colors duration-500 font-light text-base tracking-wide"
                  >
                    {contact.value}
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="backdrop-blur-3xl bg-white/30 border border-stone-200/50 rounded-2xl p-12 hover:bg-white/40 hover:border-stone-300/70 hover:shadow-xl transition-all duration-700">
              <form className="space-y-12">
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <label className="block text-stone-700 mb-4 text-sm font-light tracking-[0.1em] uppercase">
                      Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-0 py-4 bg-transparent border-0 border-b border-stone-300/50 text-stone-800 placeholder-stone-400 focus:outline-none focus:border-stone-500/70 transition-colors duration-700 font-light tracking-wide"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-stone-700 mb-4 text-sm font-light tracking-[0.1em] uppercase">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-0 py-4 bg-transparent border-0 border-b border-stone-300/50 text-stone-800 placeholder-stone-400 focus:outline-none focus:border-stone-500/70 transition-colors duration-700 font-light tracking-wide"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-stone-700 mb-4 text-sm font-light tracking-[0.1em] uppercase">
                    Vision
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-0 py-4 bg-transparent border-0 border-b border-stone-300/50 text-stone-800 placeholder-stone-400 focus:outline-none focus:border-stone-500/70 transition-colors duration-700 resize-none font-light tracking-wide leading-relaxed"
                    placeholder="Tell me about your vision..."
                  />
                </div>
                
                <button
                  type="submit"
                  className="group relative px-12 py-6 border border-stone-300/50 hover:border-stone-500/70 text-stone-700 hover:text-stone-900 hover:bg-white/20 transition-all duration-700 font-light tracking-[0.15em] text-sm uppercase rounded-lg hover:scale-105 hover:shadow-lg"
                >
                  Send Message
                  <div className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-stone-500 to-transparent group-hover:w-full transition-all duration-1000 ease-out"></div>
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="text-center mt-48 pt-16 border-t border-stone-300/30">
          <p className="text-stone-500 font-light text-xs tracking-[0.2em] uppercase">
            © 2024 — Crafted with intention and care
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
