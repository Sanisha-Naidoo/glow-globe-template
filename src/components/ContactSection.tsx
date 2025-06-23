
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const ContactSection = () => {
  const sectionRef = useScrollAnimation();

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="min-h-screen py-32 relative opacity-0 translate-y-8 transition-all duration-[1500ms] ease-out bg-gradient-to-b from-dark-bg to-dark-bg"
    >
      <div className="max-w-6xl mx-auto px-8">
        <div className="grid lg:grid-cols-2 gap-32">
          {/* Contact Info */}
          <div className="space-y-16">
            <div>
              <h2 className="text-h2 text-white mb-12 tracking-wide">
                Connect
              </h2>
              <div className="w-20 h-px bg-gradient-to-r from-pink-accent to-transparent mb-16"></div>
              <p className="text-body text-text-light font-normal leading-relaxed tracking-wide">
                Let's explore the possibilities of creating something extraordinary together.
              </p>
            </div>

            <div className="space-y-12">
              {[
                { label: 'Email', value: 'create@yourname.com', link: 'mailto:create@yourname.com' },
                { label: 'LinkedIn', value: 'linkedin.com/in/yourprofile', link: 'https://linkedin.com' },
                { label: 'Behance', value: 'behance.net/yourprofile', link: 'https://behance.net' }
              ].map((contact, index) => (
                <div key={index} className="group border-l-2 border-pink-accent pl-8 hover:border-pink-accent/80 transition-colors duration-700 bg-text-dark/40 backdrop-blur-sm p-6 rounded-sm">
                  <p className="text-sm font-light tracking-widest text-pink-accent/80 mb-3 uppercase">
                    {contact.label}
                  </p>
                  <a 
                    href={contact.link}
                    className="text-text-light hover:text-pink-accent transition-colors duration-500 font-normal text-body tracking-wide"
                  >
                    {contact.value}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="relative">
            <div className="backdrop-blur-3xl bg-gradient-to-br from-text-dark/40 to-text-dark/30 border-2 border-text-light/50 rounded-sm p-12">
              <form className="space-y-12">
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <label className="block text-white mb-4 text-body font-medium tracking-wider uppercase">
                      Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-0 py-4 bg-transparent border-0 border-b-2 border-text-light/70 text-text-light placeholder-text-light/60 focus:outline-none focus:border-pink-accent transition-colors duration-700 font-normal tracking-wide text-body"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white mb-4 text-body font-medium tracking-wider uppercase">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-0 py-4 bg-transparent border-0 border-b-2 border-text-light/70 text-text-light placeholder-text-light/60 focus:outline-none focus:border-pink-accent transition-colors duration-700 font-normal tracking-wide text-body"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-white mb-4 text-body font-medium tracking-wider uppercase">
                    Vision
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-0 py-4 bg-transparent border-0 border-b-2 border-text-light/70 text-text-light placeholder-text-light/60 focus:outline-none focus:border-pink-accent transition-colors duration-700 resize-none font-normal tracking-wide leading-relaxed text-body"
                    placeholder="Tell me about your vision..."
                  />
                </div>
                
                <button
                  type="submit"
                  className="group relative px-12 py-6 bg-gradient-to-r from-pink-accent/40 to-pink-accent/40 border-2 border-pink-accent/60 hover:border-pink-accent/80 text-white hover:text-text-light transition-all duration-700 font-medium tracking-wider text-body uppercase backdrop-blur-sm"
                >
                  Send Message
                  <div className="absolute inset-0 bg-pink-accent/15 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <div className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-pink-accent to-transparent group-hover:w-full transition-all duration-1000 ease-out"></div>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-48 pt-16 border-t border-text-light/40">
          <p className="text-text-light font-light text-sm tracking-widest uppercase">
            © 2024 — Crafted with intention and care
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
