
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
        <div className="max-w-4xl mx-auto">
          {/* Feedback Form */}
          <div className="mb-32">
            <div className="backdrop-blur-3xl bg-white/5 border border-white/10 rounded-xl p-12 shadow-2xl">
              <div className="mb-12">
                <h3 className="text-h2 text-bright mb-6 tracking-tight text-heading-crisp font-semibold">
                  Share Your Thoughts
                </h3>
                <p className="text-body text-crisp font-medium leading-relaxed text-body-crisp">
                  What do you think about the projects above? Your feedback helps shape the creative direction.
                </p>
              </div>
              
              <form className="space-y-12">
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <label className="block text-bright mb-4 text-body font-semibold tracking-wider uppercase text-heading-crisp">
                      Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-0 py-4 bg-transparent border-0 border-b border-white/20 text-crisp placeholder-white/50 focus:outline-none focus:border-pink-accent transition-colors duration-700 font-medium tracking-wide text-body text-body-crisp"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-bright mb-4 text-body font-semibold tracking-wider uppercase text-heading-crisp">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-0 py-4 bg-transparent border-0 border-b border-white/20 text-crisp placeholder-white/50 focus:outline-none focus:border-pink-accent transition-colors duration-700 font-medium tracking-wide text-body text-body-crisp"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-bright mb-4 text-body font-semibold tracking-wider uppercase text-heading-crisp">
                    Feedback
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-0 py-4 bg-transparent border-0 border-b border-white/20 text-crisp placeholder-white/50 focus:outline-none focus:border-pink-accent transition-colors duration-700 resize-none font-medium tracking-wide leading-relaxed text-body text-body-crisp"
                    placeholder="What are your thoughts on these projects?"
                  />
                </div>
                
                <button
                  type="submit"
                  className="group relative px-12 py-6 bg-gradient-to-r from-pink-accent/20 to-pink-accent/20 border border-pink-accent/50 hover:border-pink-accent/70 text-bright hover:text-bright transition-all duration-700 font-semibold tracking-wider text-body uppercase backdrop-blur-sm rounded-lg text-heading-crisp"
                >
                  Send Feedback
                  <div className="absolute inset-0 bg-pink-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-lg"></div>
                  <div className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-pink-accent to-transparent group-hover:w-full transition-all duration-1000 ease-out"></div>
                </button>
              </form>
            </div>
          </div>

          {/* Connect Section */}
          <div className="grid lg:grid-cols-2 gap-32 mb-32">
            {/* Contact Info */}
            <div className="space-y-16">
              <div>
                <h2 className="text-h2 text-bright mb-12 tracking-tight text-heading-crisp font-semibold">
                  Connect
                </h2>
                <div className="w-20 h-px bg-gradient-to-r from-pink-accent to-transparent mb-16"></div>
                <p className="text-body-large text-crisp font-medium leading-relaxed tracking-wide text-body-crisp">
                  Let's explore the possibilities of creating something extraordinary together.
                </p>
              </div>

              <div className="space-y-12">
                {[
                  { label: 'Email', value: 'create@yourname.com', link: 'mailto:create@yourname.com' },
                  { label: 'LinkedIn', value: 'linkedin.com/in/yourprofile', link: 'https://linkedin.com' },
                  { label: 'Behance', value: 'behance.net/yourprofile', link: 'https://behance.net' }
                ].map((contact, index) => (
                  <div key={index} className="group border-l-2 border-pink-accent pl-8 hover:border-pink-accent/80 transition-colors duration-700 bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:bg-white/10 hover:border-white/20">
                    <p className="text-body font-semibold tracking-widest text-pink-accent/90 mb-3 uppercase">
                      {contact.label}
                    </p>
                    <a 
                      href={contact.link}
                      className="text-crisp hover:text-pink-accent transition-colors duration-500 font-medium text-body tracking-wide text-body-crisp"
                    >
                      {contact.value}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer with Quote */}
          <div className="text-center pt-16 border-t border-white/20">
            <p className="text-body-large text-crisp font-medium leading-relaxed mb-6 text-body-crisp italic">
              "Where there is love, there is always time and nothing is too much trouble"
            </p>
            <p className="text-body text-pink-accent/80 font-semibold tracking-wide mb-8">
              — Abdu'l‑Baha
            </p>
            <p className="text-crisp font-medium text-body tracking-widest uppercase text-body-crisp">
              © 2024 — Crafted with intention and care
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
