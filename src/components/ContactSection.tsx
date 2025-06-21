
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const ContactSection = () => {
  const sectionRef = useScrollAnimation();

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="min-h-screen py-32 relative opacity-0 translate-y-8 transition-all duration-[1500ms] ease-out bg-gradient-to-b from-slate-950 to-slate-900"
    >
      <div className="max-w-6xl mx-auto px-8">
        <div className="grid lg:grid-cols-2 gap-32">
          {/* Contact Info */}
          <div className="space-y-16">
            <div>
              <h2 className="text-7xl md:text-8xl font-extralight text-white mb-12 tracking-[0.05em]">
                Connect
              </h2>
              <div className="w-16 h-px bg-gradient-to-r from-slate-200 to-transparent mb-16"></div>
              <p className="text-xl text-slate-100 font-extralight leading-[1.8] tracking-wide">
                Let's explore the possibilities of creating something extraordinary together.
              </p>
            </div>

            <div className="space-y-12">
              {[
                { label: 'Email', value: 'create@yourname.com', link: 'mailto:create@yourname.com' },
                { label: 'LinkedIn', value: 'linkedin.com/in/yourprofile', link: 'https://linkedin.com' },
                { label: 'Behance', value: 'behance.net/yourprofile', link: 'https://behance.net' }
              ].map((contact, index) => (
                <div key={index} className="group border-l border-slate-600 pl-8 hover:border-blue-400/50 transition-colors duration-700">
                  <p className="text-xs font-extralight tracking-[0.3em] text-blue-200 mb-3 uppercase">
                    {contact.label}
                  </p>
                  <a 
                    href={contact.link}
                    className="text-slate-100 hover:text-white transition-colors duration-500 font-extralight text-base tracking-wide"
                  >
                    {contact.value}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="relative">
            <div className="backdrop-blur-3xl bg-gradient-to-br from-slate-700/15 to-slate-600/10 border border-slate-500/30 rounded-sm p-12">
              <form className="space-y-12">
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <label className="block text-slate-100 mb-4 text-sm font-extralight tracking-[0.1em] uppercase">
                      Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-0 py-4 bg-transparent border-0 border-b border-slate-500/50 text-white placeholder-slate-300 focus:outline-none focus:border-blue-300/70 transition-colors duration-700 font-extralight tracking-wide"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-slate-100 mb-4 text-sm font-extralight tracking-[0.1em] uppercase">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-0 py-4 bg-transparent border-0 border-b border-slate-500/50 text-white placeholder-slate-300 focus:outline-none focus:border-blue-300/70 transition-colors duration-700 font-extralight tracking-wide"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-slate-100 mb-4 text-sm font-extralight tracking-[0.1em] uppercase">
                    Vision
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-0 py-4 bg-transparent border-0 border-b border-slate-500/50 text-white placeholder-slate-300 focus:outline-none focus:border-blue-300/70 transition-colors duration-700 resize-none font-extralight tracking-wide leading-relaxed"
                    placeholder="Tell me about your vision..."
                  />
                </div>
                
                <button
                  type="submit"
                  className="group relative px-12 py-6 bg-gradient-to-r from-blue-600/20 to-blue-500/20 border border-blue-400/40 hover:border-blue-300/60 text-slate-100 hover:text-white transition-all duration-700 font-extralight tracking-[0.15em] text-sm uppercase backdrop-blur-sm"
                >
                  Send Message
                  <div className="absolute inset-0 bg-blue-300/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <div className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-blue-300 to-transparent group-hover:w-full transition-all duration-1000 ease-out"></div>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-48 pt-16 border-t border-slate-600/30">
          <p className="text-slate-300 font-extralight text-xs tracking-[0.2em] uppercase">
            © 2024 — Crafted with intention and care
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
