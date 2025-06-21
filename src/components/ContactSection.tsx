
const ContactSection = () => {
  return (
    <section id="contact" className="min-h-screen py-32 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20">
          {/* Contact Info */}
          <div className="space-y-12">
            <div>
              <h2 className="text-6xl md:text-7xl font-extralight text-white mb-8 tracking-wide">
                Contact
              </h2>
              <div className="w-24 h-px bg-gradient-to-r from-teal-400 to-transparent mb-12"></div>
              <p className="text-xl text-slate-300 font-light leading-relaxed">
                Let's discuss your project and explore how we can create 
                something exceptional together.
              </p>
            </div>

            <div className="space-y-8">
              {[
                { label: 'Email', value: 'hello@yourname.com', link: 'mailto:hello@yourname.com' },
                { label: 'LinkedIn', value: 'linkedin.com/in/yourprofile', link: 'https://linkedin.com' },
                { label: 'Dribbble', value: 'dribbble.com/yourprofile', link: 'https://dribbble.com' }
              ].map((contact, index) => (
                <div key={index} className="group">
                  <p className="text-sm font-light tracking-wide text-slate-400 mb-2 uppercase">
                    {contact.label}
                  </p>
                  <a 
                    href={contact.link}
                    className="text-white hover:text-teal-400 transition-colors duration-300 font-light"
                  >
                    {contact.value}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="relative">
            <div className="backdrop-blur-xl bg-gradient-to-br from-slate-800/20 to-slate-700/10 border border-slate-600/20 rounded-lg p-8">
              <form className="space-y-8">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-slate-300 mb-3 text-sm font-light tracking-wide">
                      Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-0 py-3 bg-transparent border-0 border-b border-slate-600/50 text-white placeholder-slate-500 focus:outline-none focus:border-slate-400 transition-colors duration-300 font-light"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-slate-300 mb-3 text-sm font-light tracking-wide">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-0 py-3 bg-transparent border-0 border-b border-slate-600/50 text-white placeholder-slate-500 focus:outline-none focus:border-slate-400 transition-colors duration-300 font-light"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-slate-300 mb-3 text-sm font-light tracking-wide">
                    Project Details
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-0 py-3 bg-transparent border-0 border-b border-slate-600/50 text-white placeholder-slate-500 focus:outline-none focus:border-slate-400 transition-colors duration-300 resize-none font-light"
                    placeholder="Tell me about your project..."
                  />
                </div>
                
                <button
                  type="submit"
                  className="group relative px-8 py-4 border border-slate-600/50 hover:border-teal-400/50 text-white hover:text-teal-400 transition-all duration-300 font-light tracking-wide text-sm"
                >
                  Send Message
                  <div className="absolute inset-0 bg-teal-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-32 pt-12 border-t border-slate-700/30">
          <p className="text-slate-400 font-light text-sm tracking-wide">
            © 2024 — Crafted with attention to detail
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
